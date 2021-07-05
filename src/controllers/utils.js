//Imports
const polyline = require("@mapbox/polyline");

//Globals
const properties = [
    {
        kind: 'cycleways',
        properties: [
            {id: 'highway', require: true, type: 'input', values: 'all'},
            {id: 'bicycle', require: true, type: 'dropdown', values: ['designated', 'shared']},
            {id: 'temporary', require: true, type: 'dropdown', values: ['yes', 'no']},
            {id: 'name', require: false, type: 'input', values: 'all'},
            {id: 'owner_type', require: true, type: 'input', values: 'all'},
            {id: 'owner_name', require: true, type: 'input', values: 'all'}
        ],
        config: [
            {
                name: 'cycleway',
                color: '#27AE60',
                icon: {
                    "type": "svg",
                    "url": "https://viatransit.fr/UI/solid_cycleway.svg",
                    "style": {
                        "width": 20,
                        "height": 6
                    }
                },
                properties: [
                    {'highway': 'cycleway'},
                    {'bicycle': 'designated'},
                    {'temporary': 'no'}
                ],
            },
            {
                name: 'shared',
                color: '#27AE60',
                icon: {
                    "type": "svg",
                    "url": "https://viatransit.fr/UI/dashed_cycleway.svg",
                    "style": {
                        "width": 20,
                        "height": 6
                    }
                },
                properties: [
                    {'highway': 'cycleway'},
                    {'bicycle': 'shared'},
                    {'temporary': 'no'}
                ]
            },
            {
                name: 'temporary',
                color: '#F1C40F',
                icon: {
                    "type": "svg",
                    "url": "https://viatransit.fr/UI/solid_temporary_cycleway.svg",
                    "style": {
                        "width": 20,
                        "height": 6
                    }
                },
                properties: [
                    {'highway': 'cycleway'},
                    {'bicycle': 'shared'},
                    {'temporary': 'yes'}
                ]
            }
        ]
    },
    {
        kind: 'parking',
        properties: [
            {id: 'fee', require: true, type: 'dropdown', values: ['yes', 'no']},
            {id: 'capacity', require: false, type: 'input', values: 'number'},
            {id: 'carshare', require: true, type: 'dropdown', values: ['yes', 'no']},
            {id: 'type', require: true, type: 'dropdown', values: ['private', 'public', 'carshare', 'bike']},
            {id: 'name', require: false, type: 'input', values: 'all'},
            {id: 'description', require: false, type: 'input', values: 'all'},
            {id: 'owner_type', require: true, type: 'input', values: 'all'},
            {id: 'owner_name', require: true, type: 'input', values: 'all'}
        ],
        config: [
            {
                name: 'free',
                color: '#0097E6',
                icon: {
                    "type": "svg",
                    "url": "https://viatransit.fr/UI/free-parking.svg",
                    "style": {
                        "width": 16,
                        "height": 16
                    }
                },
                properties: [
                    {'fee': 'no'},
                    {'carshare': 'no'},
                    {'type': 'public'},
                ]
            },
            {
                name: 'paid',
                color: '#E1B12C',
                icon: {
                    "type": "svg",
                    "url": "https://viatransit.fr/UI/fee-parking.svg",
                    "style": {
                        "width": 16,
                        "height": 16
                    }
                },
                properties: [
                    {'fee': 'yes'},
                    {'carshare': 'no'},
                    {'type': 'public'},
                ]
            },
            {
                name: 'carshare_area',
                color: '#0097E6',
                icon: {
                    "type": "svg",
                    "url": "https://viatransit.fr/UI/carpool-parking.svg",
                    "style": {
                        "width": 16,
                        "height": 16
                    }
                },
                properties: [
                    {'fee': 'no'},
                    {'carshare': 'yes'},
                    {'type': 'carshare'},
                ]
            },
        ]
    }
];

Utils = (function() {
    return {
        getDatasetsKinds: function() {
            const kinds = [];

            for (const el of properties)
                kinds.push(el.kind);
            return kinds; 
        },
        getDatasetsGeometryTypes: function() {
            return ["Point", "Polygon", "LineString"];
        },
        getDatasetsFeatureProperties: function(kind) {
            if (!this.getDatasetsKinds().includes(kind))
                return null;
            return properties.find(o => o.kind === kind).properties;
        },
        getDatasetsFeaturePropertiesConfig: function(kind) {
            if (!this.getDatasetsKinds().includes(kind))
                return null;
            return properties.find(o => o.kind === kind).config;
        },
        encodeLineString: function(/*[[number]]*/lineString) {
            return polyline.encode(lineString);
        },
        decodeLineString: function(/*string*/encodedLineString) {
            return polyline.decode(encodedLineString);
        }
    }
}());


module.exports = { Utils };