(function() {
    'use strict';

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var TagsSchema = new Schema({
        facebookId: String,
        photo: Buffer,
        tags: {
            id: String,
            name: String,
            confidence: String,
            x: Number,
            y: Number,
            w: Number,
            h: Number
        }
    });

    module.export = mongoose.model('Tags', TagsSchema);
})();