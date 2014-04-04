(function() {
    'use strict';

    var configuration = require('../../configuration');
    var morgan = require('morgan')(configuration.get('morgan'));

    module.exports = function(app) {
        app.use(morgan);
    };
})();