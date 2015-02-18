var RackListView = function () {

    var racks;

    this.initialize = function() {
        this.$el = $('<div/>');
        this.render();
    };

    this.setRacks = function(list) {
        racks = list;
        this.render();
    }

    this.render = function() {
        this.$el.html(this.template(racks));
        return this;
    };

    this.initialize();
}

