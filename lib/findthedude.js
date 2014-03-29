var async   = require("async");
var util    = require("util");
var events  = require("events");
var fbgraph = require('fbgraph');

var config = {
    'oauth': null
};

var FindTheDude = function(){

    //Set default values
    this.config = {
        'oauth': null
    };

    //Create Queue
    this.photosQueue = async.queue( function( task, callback ){
        console.log( task.name );
        callback();
    });

    //Call parent constructor
    events.EventEmitter.call( this );

    /** Public API **/
    this.setAccessToken = function( oauth ){
        fbgraph.setAccessToken( oauth );
    };

    this.prepare = function( userId , callback ){

        //Get the friends
        _queryFB( userId + '/friends/' , function( err , friends ){

            //Get the friend ids
            var friendsIds = [];
        });

    };

    this.ready = function( userId ){

    };

    this.predict = function( img ){

    };

    /** Private API **/
    var _findFriends = function(){

    };

    var _downloadPhotos = function(){

    };

    var _queryFB = function( url , callback ){

        var result         = [];
        var page           = 1;

        var fn = function( url ){

            fbgraph.get( url, function(err, res) {

                //Check for error
                if( err ){
                    callback( err );
                    return;
                }

                //Add the values to the array;
                result = result.concat( res.data );

                //Do the next page
                if( res.paging && res.paging.next ){
                    page++;
                    fn( res.paging.next  );
                //Finish
                }else{
                    callback( null , result );
                    return;
                }

            });

        };

        fn( url );

    };

};

util.inherits( FindTheDude , events.EventEmitter );
module.exports = new FindTheDude();