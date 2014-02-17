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

    app.post('/product', function(req, resp){    
        // TODO: each user must send barcode and location in each query. check it
        // HINT: req.body is posted json from client
        var barcode = req.body.barcode;
        var location = {
            'long': req.body.long,
            'lat': req.body.lat
        }
        // TODO: use location for near locations with different chainName
        // TODO: use aggeration framework for generating branchesDict
        // find braches within within SETTINGS.radius km
        branchesCollection.find({
          "location": {
            $geoWithin : {
              $centerSphere : [[location.long, location.lat], SETTINGS.radius/6371]
            } //approximate radius of the earth is 6371 km
          }
        }).toArray(function(err, branches) {
            /* branches consist of documents, such as 
            {
              location: {{ "type": "Point", "coordinates": [long, lat] }},
              chainName: string,
              branchName: string,
              priceList_id: uuid
            }
            */
        
            var priceList_ids = [];
            var branchesDict = {};  // FIXME: find good name
            branches.forEach(function(branch) {
                priceList_ids.push(branch.priceList_id);
                branchesDict[branch.priceList_id] = { 
                    'location': branch.location.coordinates,
                    'chainName': branch.chainName,
                    'branchName': branch.branchName
                };
            });

            productsCollection.aggregate(
                // return documents with given barcode
                { $match: {"barcode": barcode } }, 

                // generate documents for each element of prices
                // each document is identical except for the value of the prices field.
                // Each value of prices is one of the values in the original prices array.
                { $unwind: '$prices' },
                
                // return documents where price.priceList_id is in the priceList_ids
                { $match: {'prices.priceList_id': {$in: priceList_ids}} }, 
                
                // sort prices by ascending order
                { $sort : {'prices.price': 1} },
                
                // group documents by name and imageSrc which is identical.
                // because of that it returns one document with grouped prices array
                { $group: {
                    "_id": {'name': '$name', 'imageSrc': '$imageSrc'}, 
                    "prices": { $push: '$prices' }
                } },
                
                // remove _id and rename some keys
                { $project : {
                    '_id': 0,
                    'productInfo': {
                        'name': '$_id.name',
                        'imageSrc': '$_id.imageSrc'
                    },
                    'prices': 1
                } },
                // return results to the callback function
                function(err, results) {
                    if (err) {
                        console.log("aggregate size is bigger than 16mb", err);
                    } else if ( results[0] ) {
                        var responseData = results[0];
                        var i = 0;
                        responseData.prices.forEach(function(price) {
                            var p = branchesDict[price.priceList_id]; // FIXME: find good name
                            p.price = price.price;
                            responseData.prices[i] = p;
                            i++;
                        });
                        resp.send(responseData);
                    } else {
                        resp.send(404); //FIXME: send something that means there is no results, but not error
                    }
                }
            );
        });
    });

    // ## END OF HANDLERS ######################################################

    app.listen(SETTINGS.port);
    console.log('Listening on port', SETTINGS.port);
});
