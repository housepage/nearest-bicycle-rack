var HomeView = function (service) {
  var rackListView;

  this.initialize = function () {
      // Define a div wrapper for the view (used to attach events)
      this.$el = $('<div/>');
      rackListView = new RackListView();
      this.searchDistance = window.localStorage.getItem("search-distance") ? parseInt(window.localStorage.getItem("search-distance")) : 100;
      this.findCloseToLocation();
      this.render();
  };

  this.render = function() {
    this.$el.html(this.template({searchDistance: this.searchDistance}));
    $('.content', this.$el).html(rackListView.$el);
    return this;
  };

  this.findCloseToLocation = function(evt) {
      if(evt) {
        evt.preventDefault();
      }
      navigator.geolocation.getCurrentPosition(
          function(position) {
              service.findWithinMeters(position.coords, this.searchDistance).done(function(racks) {
                  var currentLatLon = new LatLon(position.coords.latitude, position.coords.longitude);
                  for (index in racks) {
                    var rackLatLon = new LatLon(racks[index].rack_location.latitude, racks[index].rack_location.longitude);
                    racks[index].distanceFromCurrent = currentLatLon.distanceTo(rackLatLon);
                    racks[index].bearingTo = Dms.compassPoint(currentLatLon.finalBearingTo(rackLatLon));
                  }

                  racks.sort(function(a,b) {
                    if(a.distanceFromCurrent < b.distanceFromCurrent){
                      return -1;
                    }

                    if(a.distanceFromCurrent > b.distanceFromCurrent){
                      return 1;
                    }

                    return 0;
                  });

                  rackListView.setRacks(racks);
              });
          }.bind(this),
          function() {
              alert('Error getting location');
          },
          {
              enableHighAccuracy: true
          }
      );
      return false;
  };

  this.initialize();
}
