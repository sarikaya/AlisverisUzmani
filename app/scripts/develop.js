var DEVELOP = true;

if (DEVELOP) {
        
    function load(src) {
        $(document).ready(function() {
            var s = document.createElement("script");
            s.type = "text/javascript";
            s.src = src;
            $("head").append(s);
        });
    }

    // ################ fake touch ##################### //
    load("components/jqmobi/jq.desktopBrowsers.js");

    // ################ barcodescanner ################# //

    var barcode = {"text": "1", "cancelled": false, "format": "unknown"};
    var cordova = { "require": function() {
                                   return { 
                                     "scan": function(success, error) { 
                                       success(barcode); 
                                     } 
                                   };
                                 } 
                    };

}

        /*
        // TODO: using jqMobi instead of jqlite befor angular js
        window.jQuery = jq;
        (function($){
          //AngularJS requires .contents() function of jQuery mimic this with .children() function
          $.fn['contents'] = $.fn['children'];
          // angularjs requires next, after, contents, removeData, replaceWith, toggleClass, triggerHandler, wrap function of jQuery
        })(jq);
        
        */
