var DEVELOP = true;

if (DEVELOP) {

 //FIXME: cannot trigger

  var barcode = {"text": "1", "cancelled": false, "format": "unknown"};
  window.plugins = { "barcodeScanner": { 
                        "scan": function(success, error) { success(barcode); }
                     }
                   };
}
