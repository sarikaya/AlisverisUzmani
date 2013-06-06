'use strict';


    // Call onDeviceReady when Cordova is loaded.
    //
    // At this point, the document has loaded but cordova-2.3.0.js has not.
    // When Cordova is loaded and talking with the native device,
    // it will call the event `deviceready`.
    //


  document.addEventListener("deviceready", onDeviceReady, false);

  function onDeviceReady() {
  angular.element(document).ready(function(){
  angular.bootstrap(document);  
  });
  }


