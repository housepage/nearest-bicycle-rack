var RackService = function() {

    var url;

    this.initialize = function(serviceURL) {
        url = serviceURL ? serviceURL : "https://data.seattle.gov/resource/vncn-umqp.json?$$app_token=7LjOgwD9OR0yZQDaEmrjrpBq0&";
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    }

    this.findWithinMeters = function(loc, meters) {
        var meters = meters ? meters : 100;
        return $.ajax({url: url + "$where=within_circle(rack_location," + loc.latitude + "," + loc.longitude + "," + meters  + ")"});
    }
}

