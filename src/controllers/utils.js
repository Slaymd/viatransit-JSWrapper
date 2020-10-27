const properties = [
    {
        kind: 'cycleways',
        properties: [
            {id: 'highway', require: true, type: 'input', values: 'all'},
            {id: 'source', require: true, type: 'input', values: 'all'},
            {id: 'owner_type', require: true, type: 'input', values: 'all'},
            {id: 'owner_name', require: true, type: 'input', values: 'all'}
        ]
    },
    {
        kind: 'parking',
        properties: [
            {id: 'fee', require: true, type: 'dropdown', values: ['yes', 'no']},
            {id: 'capacity', require: false, type: 'input', values: 'number'},
            {id: 'owner_type', require: true, type: 'input', values: 'all'},
            {id: 'owner_name', require: true, type: 'input', values: 'all'}
        ]
    }
];

Utils = (function() {
    return {
        getDatasetsKinds: function() {
            return ['cycleways', 'parking']; 
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