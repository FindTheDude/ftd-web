(function() {
    'use strict';

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var mongoose = require('mongoose'),
        User = mongoose.model('User');

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
            var regexp = /^access_token=([^&]+)&expires=([^&]).*$/;
            var match = regexp.exec(data);
            var token = match[1];
            var expire = match[2];
            facebook.me(token, function(response) {
                console.log(response);
                console.log('Here we would find the user... by '+ response.id);
                User.findOne({ facebookId : response.id},
                          function(error, user) {
                                if (error) {
                                    done(null, false, {message: 'Cannot persist user'});
                                }
                                if (!user) {
                                        user = new User({fullName: response.name, facebookId: response.id, accessToken: token, expires: expire});
                                        user.save(function(err) {
                                            if(err) {
                                                done(null, false, {message: 'Cannot persist user'});
                                            }
                                        });
                                        done(null, user);
                                        console.log('We would create the user');
                                }
                                else {
                                    console.log('We have found the user!');
                                    done(null, user);
                                }
                        });
            });
        });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.facebookId);
    });

    passport.deserializeUser(function(id, done) {
        done(null, User.findOne({facebookId: id}));
    });

    module.exports = function(app) {
        app.use(passport.initialize());
        app.use(passport.session());

        app.post('/api/auth/facebook', passport.authenticate('local'), function(req, res) {
            res.send(req.user);
        });
    };
})();