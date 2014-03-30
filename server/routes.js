'use strict';

var dudes = require('./lib/controllers/dudes'),
    friends = require('./lib/controllers/friends'),
    passport = require('passport');

/**
 * Application routes
 */
module.exports = function (app) {
    if (app === undefined) {
        console.log('plop');
    }

    // Server API Routes
    app.get('/api/users/dudes', dudes.list);
    app.post('/api/users/dudes', dudes.recognize);
    app.post('/api/users/friends', friends.update);

};