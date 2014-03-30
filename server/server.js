(function() {
    'use strict';

    var express = require('express'),
        path = require('path'),
        logging = require('./logging'),
        mongoose = require('mongoose');
    var app = express();

    mongoose.connect('mongodb://localhost/ftdapp');
    // var db = mongoose.createConnection('localhost', 'FTDApp');
    // db.on('error', console.error.bind(console, 'connection error:'));
    // db.once('open', function callback () {
    //     // yay!
    // });

    app.get('/user/get', function(req, res){
      res.send('Here is the user');
    });

    app.get('/user/add', function(req, res){
      res.send('Creating the User');
    });

    var configuration = require('./configuration');

    console.log(__dirname);
    //this is needed only on dev environment
    //also avoid hard coding the value
    app.use(require('connect-livereload')({
        port: configuration.get('livereload:port')
    }));

    app.use(express.static(path.join(__dirname, '../build')));
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(express.errorHandler());
    app.use(logging);

    app.listen(configuration.get('express:port'), function() {
        console.log('Express server listening on port ' + configuration.get('express:port'));
    });

    module.exports = app;
}());