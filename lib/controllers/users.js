'use strict';

var async 	= require("async"),
	friends	= require("./friends.js");

/**
 * Get recognized dude list
 */
exports.get = function ( request, response ) {
	var userId = request.params.userId;

	console.log("Getting user.");

	// connect to mongo db to fecth the user information
	response.send(500);
};

/**
 * Create new user
 */
exports.create = function ( request, response ) {
	var userId = request.params.userId;
	var dudeId = request.params.dudeId;

	console.log("Creating user.");

	// create new user on db

	// Start preparing the user database
	friends.update(request, response);
};