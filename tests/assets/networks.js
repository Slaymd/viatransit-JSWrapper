module.exports = {
    network1: {
        "key": "tam",
        "name": "TaM",
        "status": "enabled",
        "type": "public_transit",
        "map": {
            "area": {
                "type": "Polygon",
                "coordinates": [[[3.674240112304687, 43.67085166460574], [3.675613403320312, 43.58635949637695], [3.742218017578125, 43.549045783240295], [3.8383483886718746, 43.51220693236043], [3.9262390136718754, 43.5112109754582], [4.06219482421875, 43.54506428956427], [4.0869140625, 43.60078126848975], [4.0656280517578125, 43.670354999132734], [4.003143310546875, 43.72992550936172], [3.9808273315429688, 43.748157139226024], [3.940830230712891, 43.76291201161052], [3.8596343994140625, 43.72297866632312], [3.674240112304687, 43.67085166460574]]]
            },
            "center": {
                "type": "Point",
                "coordinates": [
                    3.880485892295837,
                    43.60499214691949
                ]
            }
        },
        "services": [
            {
                "gtfsId": "1",
                "name": "TaM",
                "status": "enabled",
                "links": [
                    {
                        "network": "tam",
                        "lines": ["all"],
                        "stations": [],
                        "trips": [],
                        "attributes": null
                    },
                ],
                "attributes": {icon: 'tam-mini'}
            },
        ],
        "attributes": {
            "cities": ["Montpellier", "Lattes"],
            "website": "https://tam-voyages.com/"
        }
    },
    network2: {
        "key": "sncf",
        "name": "SNCF",
        "status": "hidden",
        "type": "trains",
        "map": {
            "area": null,
            "center": null
        },
        "services": [
            {
                "gtfsId": "ter",
                "status": "hidden",
                "name": "TER",
                "links": [
                    {
                        "network": "sncf",
                        "lines": ["TER_MARS_CERB", "TER_NARB_CARC"],
                        "stations": [],
                        "trips": [],
                        "attributes": null
                    },
                ],
                "attributes": null
            },
            {
                "gtfsId": "tgv",
                "status": "hidden",
                "name": "TGV INOUÏ",
                "links": [
                    {
                        "network": "sncf",
                        "lines": ["TGV_PERP_PGLY", "TGV_BORD_PMON"],
                        "stations": [],
                        "trips": [],
                        "attributes": null
                    },
                ],
                "attributes": null
            }
        ],
        "attributes": null
    },
};