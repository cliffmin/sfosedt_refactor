  var myObj = {
            "start": "2012-07-30T00:00:00.000Z",
            "end": "2012-08-06T00:00:00.000Z",
            "id": "48",
            "version": "6019",
            "activities": [{
                "start": "2012-07-31T12:00:00.000Z",
                "end": "2012-07-31T17:15:00.000Z",
                "offset": 2160,
                "dur": 315,
                "id": "557297",
                "act": "MANEUVER",
                "user": "WIND",
                "su": 60,
                "td": 15,
                "ant": "DSS-65",
                "wct": "1A1",
                "soe": "S",
                "passnum": "0213",
                "cng": "N083",
                "equip": "NMC,RRPA=2,TLPA=2,UPL,RNG,CCP,STXL,SHMT",
                "group": null,
                "groupType": null
            }, {
                "start": "2012-08-05T08:55:00.000Z",
                "end": "2012-08-05T11:40:00.000Z",
                "offset": 9175,
                "dur": 165,
                "id": "557612",
                "act": "SSR DUMP/UNATT",
                "user": "THC",
                "su": 30,
                "td": 15,
                "ant": "DSS-14",
                "wct": "1A1",
                "soe": "R",
                "passnum": "0218",
                "cng": "N030",
                "equip": "NMC,RRPA,TLPA,SHMT",
                "group": null,
                "groupType": null
            }]
        };

var myVar = $.getJSON(myObj);

console.log(myVar);