# insights from expressjs api

add app.enable('trust proxy'). for nginx, haproxy

Check if the given types are acceptable, returning the best match when true,
otherwise undefined - in which case you should respond with 406 "Not Acceptable". 
req.accepts('application/json'); // or json
  
Check if the request was issued with the "X-Requested-With" header field
set to "XMLHttpRequest" (jQuery etc). 
req.xhr === true
  
req.ip for logging

req.protocol == "https"

Send a response.
res.send(new Buffer('whoop'));
res.send({ some: 'json' });
res.send('some html');
res.send(404, 'Sorry, we cannot find that!');
res.send(500, { error: 'something blew up' });
res.send([1, 2, 3]);//json
res.send(200);
