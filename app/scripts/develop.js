var DEVELOP = true;

$(document).ready(function() { if (DEVELOP) {



    function load(src) {
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = src;
        $("head").append(s);
    }




    // ################ fake touch ##################### //
    load("components/jqmobi/jq.desktopBrowsers.js");

    // ################cordova ready and barcodescanner# //

    var e = document.createEvent('Events'); 
    e.initEvent("deviceready");
    document.dispatchEvent(e);


    var barcode = {"text": "1", "cancelled": false, "format": "unknown"};
    var cordova = { "require": function() {
                                   return { 
                                     "scan": function(success, error) { 
                                       success(barcode); 
                                     } 
                                   };
                                 } 
                    };


    // ################ http backend mock (fake) #########################//
    
    // TODO: add angular-mocks.js dynamically
    load("components/angular-mocks/angular-mocks.js");

    angular.module('asistanApp', [])
        .config(function($provide) {
            $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
        })
        .run(function($httpBackend) {
            // define responses for requests here as usual
        });


}});
