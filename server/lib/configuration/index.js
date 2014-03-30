(function() {
    'use strict';

    var path = require('path');

    var nconf = require('nconf');

    var Conf = function () {
        nconf.argv().env('_');

        console.log(__dirname);

        var environment = nconf.get('NODE:ENV') || 'development';
        nconf.file(environment, path.join(__dirname,'/development.json'));
        nconf.file('default', path.join('./development.json'));
    };

    Conf.prototype.get = function(key) {
        return nconf.get(key);
    };
})();