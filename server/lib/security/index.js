(function() {
    'use strict';

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;

    var facebook = require('../facebook');

    passport.use(new LocalStrategy({
        usernameField: 'userId',
        passwordField: 'accessToken'
    }, function(userId, accessToken, done) {
        if(!userId && !accessToken) {
            done(null, false, {message: 'Invalid userId or token'});
        }

        console.log('access_token ' + accessToken);

        facebook.retrieveLongLiveToken(accessToken, function(data) {
            console.log(data);
        });

//        var user = new User({ fullname: 'Andres', facebookId: 'thisismyfacebookid', accessToken: 'what_a_token!'});
    }));

    module.exports = function(app) {
        app.use('/api/*', passport.initialize());
        app.use('/api/*', passport.session());

        app.post('/api/auth/facebook', passport.authenticate('local'), function(req, res) {
            res.send({ok: true});
        });
    };
})();