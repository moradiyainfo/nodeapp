var http = require('http');
var mongo = require('mongodb');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

var resultt;

MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
	 var dbo = db.db("test");
	  dbo.collection("nirav").find({}).toArray(function(err, result) {
    if (err) throw err;
    
	resultt=result;
	
    db.close();
  });
});



http.createServer(function(req,res)
{
	res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!');
	
}
).listen(8080);