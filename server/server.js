(function() {
    'use strict';

    var express = require('express'),
        path = require('path'),
        logging = require('./logging'),
        mongoose = require('mongoose'),
        configuration = require('./configuration');
    var app = express();

    mongoose.connect('mongodb://localhost/ftdapp');
    // var db = mongoose.createConnection('localhost', 'FTDApp');
    // db.on('error', console.error.bind(console, 'connection error:'));
    // db.once('open', function callback () {
    //     // yay!
    // });

    var User = require('../models/schema.js');

    app.get('/user/get', function(req, res){
      var user = new User({ fullname: 'Andres', facebookId: 'thisismyfacebookid', accessToken: 'what_a_token!'});
      res.send('Here is the user: '+ user);
    });

    app.get('/user/add', function(req, res){
      res.send('Creating the User');
    });

    console.log(__dirname);
    //this is needed only on dev environment
    //also avoid hard coding the value
    app.use(require('connect-livereload')({
        port: configuration.get('livereload:port')
    }));

    app.use(express.bodyParser({uploadDir:'/tmp/'}));
    app.use(express.static(path.join(__dirname, '../build')));
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(express.errorHandler());
    app.use(logging);


    // Routing
    require('../lib/routes')(app);

    app.listen(configuration.get('express:port'), function() {
        console.log('Express server listening on port ' + configuration.get('express:port'));
    });

    module.exports = app;
}());