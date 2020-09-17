Utils = (function() {
    return {
        getDatasetsKinds: function() {
            return ['cycleways', 'carshare-areas']; 
        },
        getDatasetsGeometryTypes: function() {
            return ["Point", "Polygon", "LineString"];
        },
    }
}());


module.exports = { Utils };