'use strict';

var dudes = require('./lib/controllers/dudes'),
    friends = require('./lib/controllers/friends'),
    users = require('./lib/controllers/users'),
    passport = require('passport');

/**
 * Application routes
 */
module.exports = function (app) {
    if (app === undefined) {
        console.log('plop');
    }

    module.exports = function (app) {
        // Server API Routes
        app.get('/api/users/dudes', passport.authenticate('local'), dudes.list);
        app.post('/api/users/dudes', passport.authenticate('local'), dudes.recognize);
        app.post('/api/users/friends', passport.authenticate('local'), friends.update);

    };
}