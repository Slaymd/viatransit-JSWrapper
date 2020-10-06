const properties = [
    {
        kind: 'cycleways',
        properties: ["@id",
            "highway",
            "source",
            "owner_type",
            "owner_name"
        ]
    },
    {
        kind: 'carshare-areas',
        properties: ["@id",
            "amenity",
            "capacity",
            "fee",
            "motorcar",
            "parking",
            "surface",
            "owner_type",
            "owner_name"]
    },
];

Utils = (function() {
    
    return {
        getDatasetsKinds: function() {
            return ['cycleways', 'carshare-areas']; 
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