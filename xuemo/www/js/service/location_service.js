angular.module("service.location", [])
    .factory('locationService', function($q) {
        var data = {};

        var a = 6378245.0;
        var ee = 0.00669342162296594323;

        function transformFromWGSToGCJ(wgLoc) {
            var mgLoc = {};
            if (outOfChina(wgLoc.lat, wgLoc.lng)) {
                mgLoc = wgLoc;
                return mgLoc;
            }
            var dLat = transformLat(wgLoc.lng - 105.0, wgLoc.lat - 35.0);
            var dLon = transformLon(wgLoc.lng - 105.0, wgLoc.lat - 35.0);
            var radLat = wgLoc.lat / 180.0 * Math.PI;
            var magic = Math.sin(radLat);
            magic = 1 - ee * magic * magic;
            var sqrtMagic = Math.sqrt(magic);
            dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * Math.PI);
            dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * Math.PI);
            mgLoc.lat = wgLoc.lat + dLat;
            mgLoc.lng = wgLoc.lng + dLon;

            return mgLoc;
        }

        function outOfChina(lat, lon) {
            if (lon < 72.004 || lon > 137.8347)
                return true;
            if (lat < 0.8293 || lat > 55.8271)
                return true;
            return false;
        }

        function transformLat(x, y) {
            var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
            ret += (20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0 / 3.0;
            ret += (20.0 * Math.sin(y * Math.PI) + 40.0 * Math.sin(y / 3.0 * Math.PI)) * 2.0 / 3.0;
            ret += (160.0 * Math.sin(y / 12.0 * Math.PI) + 320 * Math.sin(y * Math.PI / 30.0)) * 2.0 / 3.0;
            return ret;
        }

        function transformLon(x, y) {
            var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
            ret += (20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0 / 3.0;
            ret += (20.0 * Math.sin(x * Math.PI) + 40.0 * Math.sin(x / 3.0 * Math.PI)) * 2.0 / 3.0;
            ret += (150.0 * Math.sin(x / 12.0 * Math.PI) + 300.0 * Math.sin(x / 30.0 * Math.PI)) * 2.0 / 3.0;
            return ret;
        }

        return {
            getCurrentLocation: function() {
                var q = $q.defer();
                navigator.geolocation.getCurrentPosition(function(result) {
                    var wgLoc = {};
                    wgLoc.lat = result.coords.latitude;
                    wgLoc.lng = result.coords.longitude;
                    var gcjLoc = transformFromWGSToGCJ(wgLoc);
                    q.resolve(gcjLoc);
                }, function(err) {
                    q.reject(err);
                });
                return q.promise;
            }
        }
    })