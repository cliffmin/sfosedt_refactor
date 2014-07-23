function main() {
    console.log(document.getElementById('chart'));
    $.getJSON('/scripts/services/chart.json').done(function(dsn) {
        var chart = new Timely.Chart({
            element: $('#chart')[0],
            data: {default: dsn['activities']
                .filter(function(d) {
                    return d.user !== 'DSS';
                })
                .sort(function(a, b) {
                    return utc(a.start) - utc(b.start);
                })},
            rows: [
                _.extend(row('ant', 'user'), {
                    title: 'By Antenna',
                    height: 0.3
                }),
                _.extend(row('user', 'ant'), {
                    title: 'By Mission',
                })
            ]
        });
        var $win = $(window);

        function redraw() {
            chart
                .setWidth($win.width() - 15)
                .setHeight($win.height() - 15)
                .draw();
        }
        $win.resize(redraw);

        redraw();
    });
}

function row(category, label) {
    return {
        scales: {
            y: {
                padding: 0.3
            }
        },
        mappings: function(d) {
            return {
                x: startOfTracking(d),
                x2: endOfTracking(d),
                y: d[category],
                fill: d[label],
                stroke: d[label],
                text: d[label]
            };
        },
        layers: [{
                type: 'rect',
                stroke: 'white',
                mappings: function(d) {
                    return {
                        x: utc(d.start),
                        x2: utc(d.end)
                    };
                }
            }, {
                type: 'whisker'
            }, { // main labels
                type: 'label',
                stroke: 'black'
            },
            timeLabel(startOfTracking, 'right'), // start times
            timeLabel(endOfTracking, 'left') // end times
        ]
    };
}

function timeLabel(time, anchor) {
    return {
        type: 'label',
        anchor: anchor,
        fill: 'none',
        maxItems: 50,
        mappings: function(d) {
            return {
                text: d3.time.format.utc('%H:%M')(time(d)),
                x: time(d)
            };
        },
        adjustments: function(d) {
            return {
                // Slightly shrink the start/end times relative to the main labels
                size: d.size * 0.8,
            };
        }
    };
}

function startOfTracking(d) {
    return offsetMinutes(utc(d.start), d.su);
}

function endOfTracking(d) {
    return offsetMinutes(utc(d.end), -d.td);
}

var utc = (function() {
    var parser = d3.time.format.utc('%Y-%m-%dT%H:%M:%S.%LZ');
    return function(d) {
        return parser.parse(d);
    };
})();

function offsetMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60 * 1000)
}
