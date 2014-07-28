var utc = (function() {
    var parser = d3.time.format.utc('%Y-%m-%dT%H:%M:%S.%LZ');
    return function(d) {
        return parser.parse(d);
    };
})();

utc("2012-07-30T00:00:00.000Z");



