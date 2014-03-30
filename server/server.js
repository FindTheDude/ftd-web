(function() {
    'use strict';

    var express = require('express'),
        path    = require('path');

    var app = express();

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