// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
    RackListView.prototype.template = Handlebars.compile($("#rack-list-tpl").html());

    SearchDistanceView.prototype.template = Handlebars.compile($("#change-search-distance-tpl").html());
    SearchDistanceView.prototype.searchDistanceOptions = [50,100,150,200,300];

    var slider = new PageSlider($('body'));

    var service = new RackService();
    service.initialize().done(function () {
      router.addRoute('', function() {
          slider.slidePage(new HomeView(service).render().$el);
      });

      router.addRoute('racks/:objectid', function(id) {
          service.findById(parseInt(id)).done(function(rack) {
            slider.slidePage(new RackView(rack).render().$el);
          });
      });

      router.addRoute('change-search-distance', function() {
        slider.slidePage(new SearchDistanceView().render().$el);
      });

      router.start();
    });


    /* --------------------------------- Event Registration -------------------------------- */

    if ('addEventListener' in document) {
      document.addEventListener('deviceready', function () {
        StatusBar.overlaysWebView( false );
        StatusBar.backgroundColorByHexString('#ffffff');
        StatusBar.styleDefault();

        if (navigator.notification) { // Override default HTML alert with native dialog
            window.alert = function (message) {
                navigator.notification.alert(
                    message,    // message
                    null,       // callback
                    "Workshop", // title
                    'OK'        // buttonName
                );
            };
        }
      }, false);
    }

    FastClick.attach(document.body);
}());
