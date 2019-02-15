var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors=require('cors');
var config = require('./config');


//MongoDb Connections
mongoose.connect(config.url,{ useNewUrlParser: true });

mongoose.connection.once('open', function () {
  console.log("Database connection opened");
});

mongoose.connection.on('error', function (error) {
  console.log("Database connection error %s", error);
});

//
mongoose.connection.on('reconnected', function() {
  console.log("Database reconnected");
});
//
mongoose.connection.on('disconnected', function() {
  console.log("Database disconnected");
  mongoose.connect(config.url,{ useNewUrlParser: true });
});



var fileupload = require('./fileupload');
app.use('/route', fileupload);




//middlewares
app.use('/pic_folder', express.static(__dirname + '/docs'));
app.use(cors());
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended:false }))
// app.use(fileuploader());


module.exports = app;