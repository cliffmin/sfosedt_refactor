//events for the mar 26 - 27, using V records
var events = {
        "SETUP": {
            "MISSION_NAME": "DAWN",
            "SPACECRAFT_NAME": 203,
            "DATA_SET_ID": "SFOS"
        },
        "EVENTS": [{
                "type": "V",
                "ant": "GOLDSTONE",
                "user": "14 15 24 25 26",
                "start": "2013-085T18:09:03",
                "end": "2013-086T00:03:47",
                "color": "green"
            }, {
                "type": "V",
                "ant": "CANBERRA",
                "user": "45 34 43",
                "start": "2013-085T23:30:00",
                "end": "2013-086T07:00:00",
                "color": "red"
            }, {
                "type": "V",
                "ant": "MADRID",
                "user": "63 65 54 55",
                "start": "2013-085T02:54:04",
                "end": "2013-085T11:20:12",
                "color": "pink"
            }, {
                "type": "D",
                "ant": "CANBERRA",
                "user": "25 (0085)",
                "start": "2013-085T27:30:00",
                "end": "2013-086T07:00:00",
            }, {
                "type": "D",
                "ant": "MADRID",
                "user": "45 (0085)",
                "start": "2013-085T06:00:00",
                "end": "2013-085T10:50:00",
            }, {
                "type": "D",
                "ant": "GOLDSTONE",
                "user": "55 (0085)",
                "start": "2013-085T19:35:00",
                "end": "2013-085T23:40:00",
            }

        ]
    }
    //V 10 0 2013-085T18:09:03 2013-086T07:27:36 0 0 35 1024 8 0 1 0 "14 15 24 25 26" 0
    //V 10 0 2013-085T02:54:04 2013-085T11:20:12 0 0 133 1024 8 0 1 0 "45 34 43" 0
    //V 10 0 2013-085T10:27:18 2013-086T00:03:47 0 0 231 1024 8 0 1 0 "63 65 54 55" 0
    //V 10 0 2013-086T18:06:17 2013-087T07:25:11 0 0 35 1024 8 0 1 0 "14 15 24 25 26 " 0

function main() {
    var chartSpec = {
        element: document.getElementById('chart'),
        data: {
            events: events['EVENTS']
        },
        rows: [{
            title: "DSN Coverage",
            height: 0.2,
            layers: [{
                type: 'rect',
                from: 'events',
                mappings: function(d) {
                    return {
                        x: utc(d.start),
                        x2: utc(d.end),
                        y: d.ant,
                        fill: d.color
                    }
                }
            }, {
                type: 'label',
                from: 'events',
                mappings: function(d) {
                    return {
                        x: utc(d.start),
                        x2: utc(d.end),
                        y: d.ant,
                        text: d.user,
                        fill: d.color
                    }
                },
                adjustments: function(item) {
                    var size = Math.min(18, item.size);
                    return {
                        y: item.y + size * 0.05,
                        size: size * 0.9
                    };
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
