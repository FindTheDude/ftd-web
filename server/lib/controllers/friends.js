'use strict';

var async	= require("async"),
	ftd 	= require('../findthedude.js');

/**
 * Update user friend list
 */
exports.update = function ( request, response ) {
	var userId = request.params.userId;

	console.log("Updating friend list.");
	ftd.prepare(userId, function(err, callback) {
		if(err == null)
			response.json("Generation Queued.");
		else 	
			response.send(404);
	});
};