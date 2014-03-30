(function() {
    'use strict';

    var express = require('express'),
        path = require('path'),
        mongoose = require('mongoose'),
        configuration = require(path.join(__dirname,'./lib/configuration'));
    var app = express();

    mongoose.connect('mongodb://localhost/ftdapp');

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
    require(path.join(__dirname, './lib/logging'))(app);
    require(path.join(__dirname, './lib/security'))(app);


    // Routing
    require('./routes')(app);

    app.listen(configuration.get('express:port'), function() {
        console.log('Express server listening on port ' + configuration.get('express:port'));
    });

    module.exports = app;
}());