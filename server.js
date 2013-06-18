var express = require('express');
var app = express();
var SETTINGS = {"port": 8000,   // TODO: use app.set and get, enable, disable for settings
                "develop": true};  // TODO: use app.env for "development" and "production"

// HINT: order of app.use is important
app.use(express.compress());
app.use(express.json());

if (SETTINGS.develop) {
    app.use(express.static(__dirname + '/app')); // static files folder
    app.use(express.logger());
}

// TODO: add error handling with app.use

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

app.listen(SETTINGS.port);
console.log('Listening on port', SETTINGS.port);

// TODO: run with `nodejs app.js`
// TODO: visit `localhost:8080` if not work append /index.html

// insights from expressjs api

// add app.enable('trust proxy'). for nginx, haproxy

//Check if the given types are acceptable, returning the best match when true,
// otherwise undefined - in which case you should respond with 406 "Not Acceptable". 
//  req.accepts('application/json'); // or json
  
// Check if the request was issued with the "X-Requested-With" header field
// set to "XMLHttpRequest" (jQuery etc). 
//  req.xhr === true
  
//  req.ip for logging

// req.protocol == "https"

// Send a response.
// res.send(new Buffer('whoop'));
// res.send({ some: 'json' });
// res.send('some html');
// res.send(404, 'Sorry, we cannot find that!');
// res.send(500, { error: 'something blew up' });
// res.send([1, 2, 3]);//json
// res.send(200);

