var express = require('express'),
    app = express(),
    MongoClient = require('mongodb').MongoClient;

// # SETTINGS ##################################################################

// TODO: use app.set and get, enable, disable for settings
var SETTINGS = {
    "development": true,  // TODO: use app.env for "development" and "production"
    "port": 8000,
    "radius": 1, // radius of location search in km
    "mongo": {
        // docs.mongodb.org/manual/reference/connection-string/ for more settings about URI
        "connection_URI": "mongodb://localhost:27017/assistantDb",
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
    
    // get collection pointers
    var branchesCollection = db.collection("branches");
    var productsCollection = db.collection("products");

    // ## HANDLERS #############################################################

    app.post('/product', function(req, res){    
      // fake inputs
      // each user send barcode and location in each query
      var location = {
        long: 29.014355,
        lat: 41.022476
      }
      var barcode = "1";
      // TODO: get real inputs
      // HINT: req.body is posted json
      
      
     branchesCollection.find({
      "location": {
        $geoWithin : {
          $centerSphere : [[location.long, location.lat], SETTINGS.radius/6371]
        } //approximate radius of the earth is 6371 km
      }
    }).toArray(function(err, branches) {
        var priceList_ids = [];
        var branchesDict = {};  // FIXME: find good name
        branches.forEach(function(branch) {
            priceList_ids.push(branch.priceList_id);
            branchesDict[branch.priceList_id] = { 'location': branch.location.coordinates,
                                                  'chainName': branch.chainName,
                                                  'branchName': branch.branchName
                                                };
                                                
        });
    }); 
      
      
      
      
      // fake output
      // TODO: use real outputs
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


