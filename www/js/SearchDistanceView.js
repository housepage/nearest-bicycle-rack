var SearchDistanceView = function() {

  this.initialize = function() {
      this.$el = $('<div/>');
      this.$el.on('click', '.search-distance-choice', this.setSearchDistance);
  };

  this.render = function() {
      this.$el.html(this.template(this.searchDistanceOptions));
      return this;
  };

  this.setSearchDistance = function(event) {
      event.preventDefault();

      window.localStorage.setItem("search-distance", $(event.target).data("search-distance"));
      window.location = "#";

      return false;
  };

  this.initialize();

}

