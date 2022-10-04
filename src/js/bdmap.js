function Convertor() {
    this.stepCount = 100;
    this.pointCount = [];
    this.Result = [];
    this.NoisIndex = [];
    this.Time = new Date();
    this.M_PI = 3.14159265358979324;
    this.A = 6378245.0;
    this.EE = 0.00669342162296594323;
    this.X_PI = this.M_PI * 3000.0 / 180.0;
}

Convertor.prototype.outofChine = function(p) {
    if (p.lng < 72.004 || p.lng > 137.8347) {
        return true;
    }
    if (p.lat < 0.8293 || p.lat > 55.8271) {
        return true;
    }
    return false;
};

Convertor.prototype.WGS2GCJ_lat = function(x, y) {
    var ret1 = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
    ret1 += (20.0 * Math.sin(6.0 * x * this.M_PI) + 20.0 * Math.sin(2.0 * x * this.M_PI)) * 2.0 / 3.0;
    ret1 += (20.0 * Math.sin(y * this.M_PI) + 40.0 * Math.sin(y / 3.0 * this.M_PI)) * 2.0 / 3.0;
    ret1 += (160.0 * Math.sin(y / 12.0 * this.M_PI) + 320 * Math.sin(y * this.M_PI / 30.0)) * 2.0 / 3.0;
    return ret1;
};

Convertor.prototype.WGS2GCJ_lng = function(x, y) {
    var ret2 = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
    ret2 += (20.0 * Math.sin(6.0 * x * this.M_PI) + 20.0 * Math.sin(2.0 * x * this.M_PI)) * 2.0 / 3.0;
    ret2 += (20.0 * Math.sin(x * this.M_PI) + 40.0 * Math.sin(x / 3.0 * this.M_PI)) * 2.0 / 3.0;
    ret2 += (150.0 * Math.sin(x / 12.0 * this.M_PI) + 300.0 * Math.sin(x / 30.0 * this.M_PI)) * 2.0 / 3.0;
    return ret2;
};

Convertor.prototype.WGS2GCJ = function(poi) {
    if (this.outofChine(poi)) {
        return;
    }
    var gcjPoi = {};
    var dLat = this.WGS2GCJ_lat(poi.lng - 105.0, poi.lat - 35.0);
    var dLon = this.WGS2GCJ_lng(poi.lng - 105.0, poi.lat - 35.0);
    var radLat = poi.lat / 180.0 * this.M_PI;
    var magic = Math.sin(radLat);
    magic = 1 - this.EE * magic * magic;
    var sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / ((this.A * (1 - this.EE)) / (magic * sqrtMagic) * this.M_PI);
    dLon = (dLon * 180.0) / (this.A / sqrtMagic * Math.cos(radLat) * this.M_PI);
    //Number转换是因为我在使用时出现NaN，发现是此步JS不计算，应该是传入类型问题
    gcjPoi .lat = Number(poi.lat) + Number(dLat) ;
    gcjPoi .lng = Number(poi.lng)  + Number(dLon) ;
    return gcjPoi ;
};

Convertor.prototype.GCJ2BD09 = function(poi) {
    var bdo9Poi = {};
    var x = poi.lng
      , y = poi.lat;
    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.X_PI);
    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.X_PI);
    bdo9Poi .lng = z * Math.cos(theta) + 0.0065;
    bdo9Poi .lat = z * Math.sin(theta) + 0.006;
    return bdo9Poi ;
};
/**
* WGS->百度坐标系
*/
Convertor.prototype.WGS2BD09 = function(poi) {
    //WGS->GCJ
    var gcjPoi = this.WGS2GCJ(poi);
    if (typeof gcjPoi === "undefined") {
        return;
    }
    //GCJ->百度坐标系
    return this.GCJ2BD09(gcjPoi );
}

function __WGS2BD09(lng,lat){
    let cvt = new Convertor()
    let por= cvt.WGS2BD09({"lng":lng,"lat":lat})
    return [por.lng,por.lat]
}
