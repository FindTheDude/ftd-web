var async   = require("async");
var events  = require("events");
var fbgraph = require('fbgraph');
var crypto  = require('crypto');
var request = require('request');
var mkdirp  = require('mkdirp');
var fs      = require('fs');
var path    = require('path');
var glob    = require('glob');
var cv      = require('opencv');

var FindTheDude = function( ){

    //Private Members
    var dataDirectory                   = "./data/";
    var cacheDirectory                  = "/cache/";
    var downloadsSubDirectory           = "downloads";
    var facesSubDirectory               = "faces";
    var trainingSubDirectory            = "training";
    var concurrencyFriends              = 3;
    var concurrencyPhotos               = 25;
    var concurrencyDetect               = 25;

    //Create Queues
    var detectFacesQueue = async.queue( function( task, callback ){

        var userId    = task.userId;
        var photoFile = task.photoFile;
        var tagsFile  = task.tagsFile;

        //TODO: Check the cache
        console.log("DETECTING FACES IN " + photoFile );

        //Check that the photo file exists
        if( !fs.existsSync( photoFile  ) ){
            callback();
            return;
        }

        //Check that the photo has data
        if( fs.statSync( photoFile )["size"] <= 0 ){
            callback();
            return;
        }

        //Check that the tags file exists
        if( !fs.existsSync( tagsFile  ) ){
            callback();
            return;
        }

        //Read the tags
        var tags = fs.readFileSync( tagsFile , { 'encoding' : 'utf8' } );
        tags     = JSON.parse( tags );

        //Read the image
        cv.readImage( photoFile , function(err, im){

          if( err ){
            callback( err );
            return;
          }

          var imgW = im.width();
          var imgH = im.height();

          //Detect Faces
          im.detectObject(cv.FACE_CASCADE, {}, function(err, faces){

            if( err ){
              callback( );
              return;
            }

            var len = faces.length;
            for (var i=0 ; i < len ; i++){

              var face = faces[i];
              var tag  = _findTag( tags , face , imgW , imgH );

              //If the face doesn't have a tag is worthless
              if( !tag ) continue;

              //Don't use if face is to small
              if( face.width <= 100 ){
                continue;
              }

              //Crop the image
              var cropped = _cropFace( im , face );

              //Save the image
              var directory = dataDirectory + "/" + userId + "/" + facesSubDirectory + "/" + tag.id + "/";
              var file      = path.basename( photoFile , '.jpeg' ) + "_" + i + ".jpeg";
              mkdirp.sync( directory );
              cropped.save( directory + file );
              cropped = null;

              //Save the tag
              fs.writeFileSync( directory + "tag.json" , JSON.stringify( tag ) );

            }

            //Save some memory
            im  = null;

            //Return
            callback( );

          });

        });

    } , concurrencyDetect );

    var downloadPhotoQueue = async.queue( function( task, callback ){

        var userId   = task.userId;
        var friendId = task.friendId;
        var photo    = task.photo;
        var source   = photo.source;
        var tags     = photo.tags;

        //If the photo doesn't have tags it is worthless
        if( !tags ){
            callback( );
            return;
        }

        //Create an unique filename for the file
        var baseName  = crypto.createHash('sha1').update( source ).digest('hex');
        var directory = dataDirectory + userId + '/' + downloadsSubDirectory + '/';
        var imageFile = directory + baseName + '.jpeg';
        var tagsFile  = directory + baseName + '.tags';

        //Make sure the directory exists
        mkdirp.sync( directory );

        //Write the tags file
        fs.writeFileSync( tagsFile , JSON.stringify( tags.data ) );

        //Download the file
        if( !fs.existsSync( imageFile  ) ){

          console.log("DOWNLOADING FILE " + source );
          request(source).pipe(fs.createWriteStream( imageFile )).on('close', function( err ){

             //Detect Faces
             detectFacesQueue.push( { userId: userId , photoFile: imageFile , tagsFile: tagsFile } , function(){
             });

             //Return Control
             callback( );
          });

        //Skip the file because its already downloaded
        }else{

            //Skiping File
            console.log("SKIPPING FILE " + source );

            //Return Control
            callback( );
        }

    } , concurrencyPhotos );

    var getPhotosForFriendQueue = async.queue( function( task, callback ){

        //Get the photos for the friend
        var userId   = task.userId;
        var friendId = task.friendId;
        var url      = friendId + '/photos/?fields=source,tags';

        console.log("GETTING PHOTOS FOR " + friendId );
        _queryFB( url , function( err , photos ){

            console.log("GOT " + photos.length + " PHOTOS FOR " + friendId );

            //Download the photos
            var len = photos.length;
            for( var i = 0 ; i < len ; i++ ){
                downloadPhotoQueue.push( { userId: userId , friendId: friendId , photo: photos[ i ] } , function(){
                });
            }

            callback();
        });

    } , concurrencyFriends );

    /** Public API **/
    this.setAccessToken = function( oauth ){
        fbgraph.setAccessToken( oauth );
    };

    this.setDataDirectory = function( dir ){
        dataDirectory = dir;
    };

    this.prepare = function( userId ){

        //Download My Photos
        getPhotosForFriendQueue.push( { userId: userId , friendId: userId } , function(){

        });

        //Get the friends
        _queryFB( userId + '/friends/' , function( err , friends ){


            /** CODE FOR DEBUGGING */
            friends = [];
            friends.push( { id: 121801354 } ); //Angel
            friends.push( { id: 605400972 } ); //Osvaldo
            friends.push( { id: 512940291 } ); //Omar
            friends.push( { id: 604890502 } ); //Andres
            friends.push( { id: 788781095 } ); //Mon
            friends.push( { id: 121900606 } ); //Alberto
            /** CODE FOR DEBUGGING */

            //Get Photos for each friend
            var len = friends.length;
            for( var i = 0 ; i < len ; i++ ){
                if( friends[i].id != userId ){
                    getPhotosForFriendQueue.push( { userId: userId , friendId: friends[i].id } , function(){
                    });
                }
            }

            //Wait for the queues to finish to train
            var timeout = setInterval( function(){

                if( detectFacesQueue.idle() &&
                    downloadPhotoQueue.idle() && 
                    getPhotosForFriendQueue.idle() ){

                    clearInterval( timeout );
                    _train( userId );

                }
            }, 1000 );


        });

    };

    this.ready = function( userId ){

        var baseDirectory     = dataDirectory + databaseId + "/";
        var trainingDirectory = baseDirectory + trainingSubDirectory + "/";
        var trainingFile      = trainingDirectory + userId + ".training";

        return fs.existsSync( userId );
    };

    this.predict = function( userId , imageFile , callback ){

        var baseDirectory     = dataDirectory + userId + "/";
        var trainingDirectory = baseDirectory + trainingSubDirectory + "/";
        var trainingFile      = trainingDirectory + userId + ".training";

        //Create Recognizer
        var facerec = cv.FaceRecognizer.createLBPHFaceRecognizer();
        facerec.loadSync(trainingFile);

        //Open the image
        cv.readImage( imageFile , function(err, im){

            if( err ){
                callback( null , [] );
                return;
            }

            var imgW = im.width();
            var imgH = im.height();

            //Detect Faces
            im.detectObject(cv.FACE_CASCADE, {}, function(err, faces){

                if( err ){
                    callback( null , [] );
                    return;
                }

                //Load Faces Images
                var predictions = [];
                var len         = faces.length;
                for (var i=0 ; i < len ; i++){

                    //Load the face
                    var face    = faces[i];
                    var faceImg = _cropFace( im , face );

                    if( face.width <= 200 ){
                        continue;
                    }

                    //Predict
                    var prediction = facerec.predictSync( faceImg );

                    //Check if there was a match
                    if( prediction.id == -1 ){
                        continue;
                    }

                    //Load the meta file
                    var metaFile = baseDirectory + facesSubDirectory + "/" + prediction.id + "/tag.json";
                    var meta     = fs.readFileSync( metaFile , { 'encoding' : 'utf8' } );
                    meta         = JSON.parse( meta );

                    //Add to prediction
                    predictions.push( {
                        id:         prediction.id  ,
                        name:       meta.name ,
                        confidence: prediction.confidence ,
                        x:          face.x ,
                        y:          face.y ,
                        w:          face.width ,
                        h:          face.height
                    });
                }

                callback( null , predictions );

            });

        });

    };

    /** Private API **/
    var _queryFB = function( url , callback ){

        var result         = [];
        var page           = 1;

        console.log("QUERYING FACEBOOK " + url );

        //Check the file system to the request
        // var cachePath = dataDirectory + cacheDirectory;
        // var cacheFile = cachePath + crypto.createHash('sha1').update( url ).digest('hex') + ".cache";

        // if( fs.existsSync( cacheFile ) ){
        //     var cache = fs.readFileSync( cacheFile , { 'encoding' : 'utf8' } );
        //     cache = JSON.parse( cache );
        //     callback( null , cache );
        //     return;
        // }

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

                    //Save the request to the cache
                    // mkdirp.sync( cachePath );
                    // fs.writeFileSync( cacheFile , JSON.stringify( result ) );

                    //Return Control
                    callback( null , result );
                    return;
                }

            });

        };

        fn( url );

    };

    var _findTag = function( tags , face , imgW , imgH , offset ){

        if( offset === undefined )
            offset = 5;

        for( var i in tags ){
            var tag = tags[i];
            var tx = imgW * ( tag.x / 100.0 );
            var ty = imgH * ( tag.y / 100.0 );

            if ( tx >= face.x - offset     &&
                 tx <= face.x + face.width + offset &&
                 ty >= face.y - offset     &&
                 ty <= face.y + face.height + offset ){

                if( tag.id ){
                    return tag;
                }
            }
        }

        return null;

    };

    var _cropFace = function( im , face , width , height , offset )
    {

        if( width === undefined )
            width = 100;

        if( height === undefined )
            height = 100;

        if( offset === undefined )
            offset = 5;

        //Calculate ratio
        var ratio = 1;
        if( face.width > face.height ){
            ratio = width / face.width;
        }else{
            ratio = height / face.height;
        }

        //Calculate new box origin
        var originX = face.x - (((face.width  * ratio) - width  ) / 2 );
        var originY = face.y - (((face.height * ratio) - height ) / 2 );

        //Crop the image
        var roi = im.roi( originX , originY , face.width , face.height );
        roi.resize( width , height , cv.INTER_CUBIC );
        return roi;

    };

    var _train = function( userId )
    {

        console.log("TRAINING " + userId );

        var baseDirectory     = dataDirectory + userId + "/";
        var facesDirectory    = baseDirectory + facesSubDirectory + "/";
        var trainingDirectory = baseDirectory + trainingSubDirectory + "/";

        //Create Training Data
        var trainingData = [];
        var userIds      = fs.readdirSync( facesDirectory );
        userIds.forEach( function( friendId ){

            var images       = glob.sync( facesDirectory + "/" + friendId + "/*.jpeg" );
            if( images.length > 1 ){
                images.forEach( function( file ){
                    trainingData.push([ parseInt(friendId,10) , file ]);
                });
            }

        });

        //Create Recognizer
        var facerec = cv.FaceRecognizer.createLBPHFaceRecognizer();
        facerec.trainSync(trainingData);

        //Save the data
        mkdirp.sync( trainingDirectory );
        facerec.saveSync( trainingDirectory + userId + ".training" );

    };

};

module.exports = new FindTheDude();