(function() {
    'use strict';

    var restler = require('restler');

    var configuration = require('../configuration');

    var Facebook = function(clientId, clientSecret) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;

        this._get = function(url, options, callback) {
            var request = restler.get(url, options);
            for(var event in callback) {
                if(callback.hasOwnProperty(event)) {
                    request.on(event, callback[event]);
                }
            }
        };
    };

    Facebook.prototype.retrieveLongLiveToken = function(accessToken, callback) {
        if('function' === typeof callback) {
            callback['complete'] = callback;
        }
        var options = {
            query: {
                'grant_type': 'fb_exchange_token',
                'client_id': this.clientId,
                'client_secret': this.clientSecret,
                'fb_exchange_token': accessToken
            }
        };
        this._get('https://graph.facebook.com/oauth/access_token', options, callback);
    };

    Facebook.prototype.me = function(accessToken, callback) {
        if('function' === typeof callback) {
            callback['complete'] = callback;
        }

        var options = {
            query: {
                'access_token': accessToken,
                'fields': 'id,name'
            }
        };

        this._get('https://graph.facebook.com/me', options, callback);
    };

    module.exports = new Facebook(configuration.get('facebook:client_id'),
        configuration.get('facebook:client_secret'));
})();