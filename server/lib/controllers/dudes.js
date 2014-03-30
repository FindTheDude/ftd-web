'use strict';

var async = require('async'),
    fs    = require('fs'),
    ftd   = require('../../../lib/findthedude.js');

/**
* Get a specific dude
*/
exports.getDude = function (request, response) {
   //var userId = request.params.userId;
   //var dudeId = request.params.dudeId;

   console.log('Ready to get dude.');

   // connect to mongo db to fecth dude list and generate the links
   response.send(500);
};

/**
* Get recognized dude list
*/
exports.list = function (request, response) {
   //var userId = request.params.userId;

   console.log('Ready to get dude list.');

   // connect to mongo db to fecth dude list and generate the links
   response.send(500);
};

/**
* Recognize dude
*/
exports.recognize = function (request, response) {
   var userId = request.params.userId;

   // connect to mongo db to fecth user information

   var filePath = request.files.file.path;


   console.log('Ready to predict.');

   async.waterfall([
       function (callback) {
           console.log('Checking if ready.');

           ftd.ready(userId, function (err, isReady) {
               if (!isReady) {
                   err = 'Not Ready';
               }

               callback(err);
           });
       },
       function (callback) {
           console.log('Getting stats.');

           fs.stat(filePath, function (err, stats) {
               callback(err, stats);
           });
       },
       function (stats, callback) {
           console.log('Getting file.');

			if (!stats.isFile) {
				var err = 'Not a file.';
				callback(err);
			} else {
				fs.open(filePath, 'r', function (err, fileDescriptor) {
					callback(err, fileDescriptor);
				});
           }
       },
       function (fileDescriptor, callback) {
           console.log('predicting.');
           ftd.predict(userId, fileDescriptor, function (err, predictions) {
               callback(err, predictions);
           });
       },
       function (predictions) {
           console.log('Predicted.');

           response.json(predictions);

           // Todo store to mongo db to allow refetching of dudes
       }
   ], function (err) {
       response.send(404, err);
   });
};