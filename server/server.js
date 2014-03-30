(function() {
    'use strict';

    var express = require('express'),
        path    = require('path');

    var app = express();

    // DB Connection
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/ftdapp');
    // var db = mongoose.createConnection('localhost', 'FTDApp');
    // db.on('error', console.error.bind(console, 'connection error:'));
    // db.once('open', function callback () {
    //     // yay!
    // });

    var schema = require('models/schema.js');

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
        port: 35729
    }));

    app.use(express.bodyParser({uploadDir:'/tmp/'}));

    app.use(express.static(path.join(__dirname, '../build')));
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(express.errorHandler());

    // Routing
    require('../lib/routes')(app);

    app.listen(process.env.PORT || 3000, function() {
        console.log('Express server listening on port 3000');
    });

    module.exports = app;
}());