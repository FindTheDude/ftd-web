'use strict';

var async = require('async'),
    ftd = require('../../../lib/findthedude.js'),
    mongoose = require('mongoose'),
    Tags = mongoose.model('Tags');

/**
 * Get recognized dude list
 */
exports.list = function (request, response) {
    async.waterfall([
        function (callback) {
            console.log('Finding all.');

            Tags.findAll({ facebookId: request.params.userId}, function (err, tags) {
                callback(err, tags);
            });
        },
        function (tags) {
            console.log('Returning tags on response.');

            return response.json(tags);
        }
    ], function (err) {
        var errors = [];
        errors.push({
            statusCode: 404,
            error: err
        });
        response.send(404, err);
    });
};

/**
 * Recognize dude
 */
exports.recognize = function (request, response) {
    var userId = request.params.userId;

    console.log('ENTERING RECOGNIZE');

   // async.each(request.files, function (err, file) {
        var filePath = request.files.photo.path; //file.path;
        //var photoFd;

        console.log('Ready to predict one photo.');

        ftd.predict(userId, filePath, function (err, predictions) {
            console.log( predictions );
            response.json({tags: predictions});
        });

//        async.waterfall([
//            function (callback) {
//                console.log('Checking if ready.');
//                callback();
//
////                ftd.ready(userId, function (err, isReady) {
////                    if (!isReady) {
////                        err = 'Not Ready';
////                    }
////                    callback(err);
////                });
//            },
//            function (callback) {
//                console.log('Getting stats.');
//
//                fs.stat(filePath, function (err, stats) {
//                    callback(err, stats);
//                });
//            },
//            function (stats, callback) {
//                console.log('Getting file.');
//
//                if (!stats.isFile) {
//                    var err = 'Not a file.';
//                    callback(err);
//                } else {
////                    fs.open(filePath, 'r', function (err, fileDescriptor) {
////                        photoFd = fileDescriptor;
////                        callback(err, fileDescriptor);
////                    });
//                }
//            },
//            function (fileDescriptor, callback) {
//                console.log('predicting.');
//                ftd.predict(userId, fileDescriptor, function (err, predictions) {
//                    callback(err, predictions);
//                });
//            },
//            function (tagArray) {
//                console.log('Predicted.');
//
//                var tagsEntity = new Tags({
//                    facebookId: userId,
//                    photo: photoFd,
//                    tags: tagArray
//                });
//
//                tagsEntity.save();
//
//                return response.json({tags: tagArray});
//            }
//        ], function (err) {
//            var errors = [];
//            errors.push({
//                statusCode: 404,
//                error: err
//            });
//            response.send(404, err);
//        });
    //});
};