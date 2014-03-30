(function() {
    'use strict';

    var path = require('path');

    var nconf = require('nconf');

    var Configuration = function () {
        nconf.argv().env('_');

        console.log(__dirname);

        var environment = nconf.get('NODE:ENV') || 'development';
        nconf.file(environment, path.join(__dirname,'/development.json'));
        nconf.file('default', path.join('./development.json'));
    };

    Configuration.prototype.get = function(key) {
        return nconf.get(key);
    };

    module.exports = new Configuration();
})();