(function() {
    'use strict';

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var UserSchema = new Schema({
        fullName: String,
        facebookId: String,
        accessToken: String
    });

    module.export = mongoose.model('User', UserSchema);
})();