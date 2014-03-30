'use strict';

var dudes   = require('./lib/controllers/dudes'),
    friends	= require('./lib/controllers/friends');

/**
 * Application routes
 */
module.exports = function(app) {
    if(app === undefined) {
        console.log('plop');
    }

  // Server API Routes
  app.get('/users/:userId/dudes', dudes.list );
  app.post('/users/:userId/dudes', dudes.recognize );
  app.post('/users/:userId/friends', friends.update );

};