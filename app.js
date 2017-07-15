'use strict';

var express = require('express');
var app = express();
var expressLayouts = require('express-ejs-layouts');
var routes = require('./routes');
var bodyParser     = require('body-parser');
var jsonParser = require('body-parser').json;
var logger = require("morgan");
var mongoose = require("mongoose");

app.use(logger("dev"));
app.use(jsonParser());
//==============================================
app.use(express.static(__dirname + '/public'));


 //set ejs as  our templating engine ===========
 app.set('view engine', 'ejs');
 app.use(expressLayouts);
 app.use(bodyParser.urlencoded({ extended: true}));
 //=============================================



mongoose.connect("mongodb://localhost:27017/qora");

var db = mongoose.connection;

db.on("error", function(err){
   console.error("connection error:", err);
});

db.once("open", function(){
   console.log("database connection was successfull !");
});   

app.use(function(req,res, next){
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, COntent-Type, Accept");
   if(req.method === 'OPTIONS'){
      res.header("Access-Control-Allow-Methods", "PUT,POST,DELETE");
      return res.status(200).json({});
   }
   next();
});


app.use("/",routes);


// catch 404 and forward to error handler
app.use(function(req,res,next){
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

//Error Handler
app.use(function(err,req,res,next){
   res.status(err.status || 500);
   res.json({
   	error:{
   		message:err.message
   	}
   });

});

var port = process.env.PORT || 3000;

app.listen(port, function(){
	console.log('Express server is swagging on port 3000');
});
