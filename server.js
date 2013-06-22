var express = require('express'),
    app = express(),
    MongoClient = require('mongodb').MongoClient;

// # SETTINGS ##################################################################

// TODO: use app.set and get, enable, disable for settings
var SETTINGS = {
    "development": true,  // TODO: use app.env for "development" and "production"
    "port": 8000,
    "mongo": {
        // docs.mongodb.org/manual/reference/connection-string/ for more settings about URI
        "connection_URI": "mongodb://localhost:27017/asistanDb",
        "options": {
            "db": {
                "native_parser": true
            },
            "server": {
                "auto_reconnect": true
            }
        }
    }
};

// HINT: order of app.use is important
app.use(express.compress());
app.use(express.json());

if (SETTINGS.development) {
    app.use(express.static(__dirname + '/app')); // static files folder
    app.use(express.logger());
}

// TODO: add error handling with app.use

// # END OF SETTINGS ###########################################################

MongoClient.connect(SETTINGS.mongo.connection_URI, SETTINGS.mongo.options, function(err, db) {

    if (err) {
        throw err;
    }
    console.log("Connected to Database");
    
    var branchesCollection = db.collection("branches");
    var productsCollection = db.collection("products");

    // ## HANDLERS #############################################################

    app.post('/product', function(req, res){

      // HINT: req.body is posted json
      var data = {};
      data.productInfo = {
        "imageSrc": "images/main.jpg",
        "name": "ÜLKER ÇİKOLATALI GOFRET 38 GR"
      };

      data.prices = [
        {"chainName": "BİM", "branchName": "Bulgurlu", "price": 0.45, "here": true},
        {"chainName": "A 101", "branchName": "Bulgurlu", "price": 0.45},
        {"chainName": "Şok", "branchName": "Bulgurlu", "price": 0.57}
      ];


      res.send(data);
    });

    // ## END OF HANDLERS ######################################################

    app.listen(SETTINGS.port);
    console.log('Listening on port', SETTINGS.port);
});


