//events for the mar 26 - 27, using V records
var events = {
        "DSN Allocation Records": [{
            "ant": "GOLDSTONE",
            "user": "25 (0085)",
            "start": "2013-085T18:09:03",
            "end": "2013-086T00:03:47",
            "color": "green"
        }, {
            "ant": "CANBERRA",
            "user": "25 (0085)",
            "start": "2013-085T23:30:00",
            "end": "2013-086T07:00:00",
            "color": "red"
        }, {
            "ant": "MADRID",
            "user": "26 (0087)",
            "start": "2013-085T02:54:04",
            "end": "2013-085T11:20:12",
            "color": "blue"
        }]
    }

function main() {
    var chartSpec = {
        element: document.getElementById('chart'),
        data: {
            events: events['DSN Allocation Records']
        },
        rows: [{
            title: "DSN Coverage",
            layers: [{
                type: 'rect',
                from: 'events',
                mappings: function(d) {
                    return {
                        x: utc(d.start),
                        x2: utc(d.end),
                        y: d.ant,
                        text: d.user,
                        fill: d.color
                    }
                }
            }]
        }]
    }

    var chart = new Timely.Chart(chartSpec);
    var $win = $(window);

    function redraw() {
        chart.setWidth($win.width() - 15)
            .setHeight($win.height() - 15)
            .draw();
    }

    $win.resize(redraw);

    redraw();
};


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
                text: d3.time.format.utc('%H:%M')(utc(d[time])),
                x: utc(d[time])
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
    var parser = d3.time.format.utc('%Y-%jT%H:%M:%S');
    console.log(parser);
    return function(d) {
        return parser.parse(d);
    };
})();

function offsetMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60 * 1000)
}

//yaml markup
//web server to serve file
