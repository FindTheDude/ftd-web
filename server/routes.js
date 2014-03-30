'use strict';

var dudes = require('./lib/controllers/dudes'),
    friends = require('./lib/controllers/friends'),
    security = require('./lib/security');

/**
 * Application routes
 */
module.exports = function (app) {
    if (app === undefined) {
        console.log('plop');
    }

    // Server API Routes
    app.get('/api/users/dudes', security.isAuthenticated, dudes.list);
    app.post('/api/users/dudes', security.isAuthenticated, dudes.recognize);
    app.post('/api/users/friends', security.isAuthenticated, friends.update);

};