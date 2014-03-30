'use strict';

var dudes = require('./lib/controllers/dudes'),
    friends = require('./lib/controllers/friends'),
    users = require('./lib/controllers/users'),
    passport = require('passport');

/**
 * Application routes
 */
module.exports = function (app) {
    // Server API Routes
    app.get('/users/:userId', users.get);
    app.post('/users/:userId', users.create);
    app.get('/users/:userId/dudes/:dudeId', dudes.getDude);
    app.get('/users/:userId/dudes', dudes.list);
    app.post('/api/users/dudes', passport.authenticate('local'), dudes.recognize);
    app.post('/users/:userId/friends', friends.update);

};