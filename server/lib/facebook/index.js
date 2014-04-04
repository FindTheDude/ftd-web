(function() {
    'use strict';

    var restler = require('restler');

    var configuration = require('../configuration');

    var Facebook = function(clientId, clientSecret) {
        var clientId = clientId;
        var clientSecret = clientSecret;
        var baseUrl = 'https://graph.facebook.com';

        var _get = function(path, options, callback) {
            var request = restler.get(baseUrl + path, options);
            for(var event in callback) {
                if(callback.hasOwnProperty(event)) {
                    request.on(event, callback[event]);
                }
            }
        };

        this.retrieveLongLiveToken = function(accessToken, callback) {
            if('function' === typeof callback) {
                callback['complete'] = callback;
            }
            var options = {
                query: {
                    'grant_type': 'fb_exchange_token',
                    'client_id': clientId,
                    'client_secret': clientSecret,
                    'fb_exchange_token': accessToken
                }
            };

            _get('/oauth/access_token', options, callback);
        };

        this.me = function(accessToken, callback) {
            if('function' === typeof callback) {
                callback['complete'] = callback;
            }

            var options = {
                query: {
                    'access_token': accessToken,
                    'fields': 'id,name'
                }
            };

            _get('/me', options, callback);
        };

        this.friends = function(accessToken, callback) {
            if('function' === typeof callback) {
                callback['complete'] = callback;
            }

            var options = {
                query: {
                    'access_token': accessToken
                }
            };

            _get('/me/friends', options, callback);
        };

        this.photos = function(accessToken, userId, callback) {
            if('function' === typeof callback) {
                callback['complete'] = callback;
            }

            var options = {
                query: {
                    'access_token': accessToken
                }
            };

            _get('/' + userId + '/photos', options, callback);
        };
    };

    module.exports = new Facebook(configuration.get('facebook:client_id'),
        configuration.get('facebook:client_secret'));
})();