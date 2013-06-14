var DEVELOP = true;

if (DEVELOP) {

 //FIXME: cannot trigger

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
