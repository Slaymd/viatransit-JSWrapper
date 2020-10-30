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
                properties: [
                    {'highway': 'cycleway'},
                    {'bicycle': 'designated'},
                    {'temporary': 'no'}
                ]
            },
            {
                name: 'shared',
                properties: [
                    {'highway': 'cycleway'},
                    {'bicycle': 'shared'},
                    {'temporary': 'no'}
                ]
            },
            {
                name: 'temporary',
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
                properties: [
                    {'fee': 'no'},
                    {'carshare': 'no'},
                    {'type': 'public'},
                ]
            },
            {
                name: 'paid',
                properties: [
                    {'fee': 'yes'},
                    {'carshare': 'no'},
                    {'type': 'public'},
                ]
            },
            {
                name: 'carshare_area',
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
    }
}());


module.exports = { Utils };