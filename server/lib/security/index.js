(function() {
    'use strict';

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;

    var facebook = require('../facebook');

    passport.use(new LocalStrategy({
        usernameField: 'userId',
        passwordField: 'accessToken'
    }, function(userId, accessToken, done) {
        if(!userId && !acccessToken) {
            done(null, false, {message: 'Invalid userId or token'});
        }

        console.log('access_token ' + accessToken);

        facebook.retrieve
    }));
})();