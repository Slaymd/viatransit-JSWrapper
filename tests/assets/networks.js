module.exports = {
    network1: {
        "id": "5cc472bfad0bdb2fd679cac8",
        "name": "TaM",
        "status": "enabled",
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
                "key": "tam",
                "type": "public_transit",
                "name": "TaM",
                "links": [
                    {
                        "network": "5cc472bfad0bdb2fd679cac8",
                        "service": "tam",
                        "type": "public_transit",
                        "attributes": {
                            "lines": ["all"]
                        }
                    },
                ],
                "attributes": {icon: 'tam-mini'}
            },
            {
                "key": "velomagg",
                "type": "bike_share",
                "name": "Velomagg",
                "links": [
                    {
                        "network": "5cc472bfad0bdb2fd679cac8",
                        "service": "velomagg",
                        "type": "bike_share",
                        "attributes": {
                            "lines": ["all"]
                        }
                    },
                ],
                "attributes": null
            }
        ],
        "attributes": {
            "cities": ["Montpellier", "Lattes"],
            "website": "https://tam-voyages.com/"
        }
    },
    network2: {
        "id": "7c3472bfad3bdb2pd679dad3",
        "name": "SNCF",
        "status": "hidden",
        "map": {
            "area": null,
            "center": null
        },
        "services": [
            {
                "key": "sncf",
                "type": "trains",
                "name": "SNCF",
                "links": [
                    {
                        "network": "7c3472bfad3bdb2pd679dad3",
                        "service": "sncf",
                        "type": "trains",
                        "attributes": {
                            "lines": ["all"]
                        }
                    },
                ],
                "attributes": null
            }
        ],
        "attributes": null
    },
};