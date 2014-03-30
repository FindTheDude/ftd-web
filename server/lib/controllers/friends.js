'use strict';

var ftd = require('../../../lib/findthedude.js'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

/**
 * Update user friend list
 */
exports.update = function (request, response) {
    console.log('Updating friend list.');

    console.log('userId: ' + request.params.userId);

    User.find({facebookId: request.params.userId}, function (err, user) {
        if (err) {
            console.log(err);
        }
        console.log(user);

        user = user[0];

        ftd.setAccessToken(user.accessToken);

        ftd.prepare(request.params.userId, function (err) {
            if (err) {
                response.send(404);
            } else {
                response.json('Generation Queued.');
            }
        });
    });
};