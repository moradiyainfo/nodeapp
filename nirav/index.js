var express = require('express');
var app = express();
var fs = require("fs");
var http = require('http');
var mongo = require('mongodb');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var MongoClient = require('mongodb').MongoClient;
var url2 = "mongodb://localhost:27017";
var url = "mongodb://nirav:Rohit%40other123@ds153974.mlab.com:53974/?authSource=nirav"
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('views'));

var resultt;

app.post('/submitdata',urlencodedParser, function (req, res) {
	// First read existing users.

	if(req.body.submitdata)
	{

		MongoClient.connect(url, {
			useNewUrlParser: true
		}, function (err, db) {
			if (err)
				throw err;
			var dbo = db.db("nirav");

			var myobj = {
				fname: req.body.fname,
				lname: req.body.lname

			};

			dbo.collection("nirav").insertOne(myobj, function (err2, res2) {
				if (err2)
					throw err2;

					console.log("1 document inserted "+ req.body.submitdata );

				db.close();

			});

			res.redirect('/index?submit=1');
		});
	}
	else if(req.body.viewdata)
	{
		res.redirect('/data');
	}
});




app.get('/index', function (req, res) {

	fs.readFile(__dirname + "/views/" + "index.html", 'utf8', function (err, data) {

		res.end(data);
	});

})
app.get('/', function (req, res) {

	fs.readFile(__dirname + "/views/" + "index.html", 'utf8', function (err, data) {

		res.end(data);
	});


})

app.get('/data', function (req, res) {

	fs.readFile(__dirname + "/views/" + "data.html", 'utf8', function (err, data) {

		MongoClient.connect(url, {
			useNewUrlParser: true
		}, function (err, db) {
			if (err)
				throw err;
			var dbo = db.db("test");

			dbo.collection("nirav").find({}). toArray(function (err2, res2) {
					if (err2)
						throw err2;
					
					res.render('data', {
						table: res2
					});
				db.close();

			});



		});

	});

})
app.get('/submitdata', function (req, res) {

		res.redirect('/data');
});

var server = app.listen(8081);
