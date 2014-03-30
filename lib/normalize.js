var fs = require('fs');
var cv = require('opencv');

    function detect_faces( photoFile ){

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

        // //Check that the tags file exists
        // if( !fs.existsSync( tagsFile  ) ){
        //     callback();
        //     return;
        // }

        //Read the tags
        // var tags = fs.readFileSync( tagsFile , { 'encoding' : 'utf8' } );
        // tags     = JSON.parse( tags );

        //Read the image
        cv.readImage( photoFile , function(err, im){

          if( err ){
            // callback( err );
            return;
          }

          //im.convertGrayscale();
          var imgW = im.width();
          var imgH = im.height();

          //Detect Faces
          im.detectObject(cv.FACE_CASCADE, {}, function(err, faces){

            // if( err ){
            //   callback( );
            //   return;
            // }

            var len = faces.length;
            for (var i=0 ; i < len ; i++){

              var face = faces[i];
              // var tag  = _findTag( tags , face , imgW , imgH );

              //If the face doesn't have a tag is worthless
              // if( !tag ) continue;

              //Don't use if face is to small
              // if( face.width <= 100 ){
              //   continue;
              // }

              //Crop the image
              var cropped = _cropFace( im , face );

              //Save the image
              var directory = "./";
              var file      = i + ".jpeg";
              // mkdirp.sync( directory );
              cropped.save( directory + file );
              cropped = null;

              //Save the tag
              // fs.writeFileSync( directory + "tag.json" , JSON.stringify( tag ) );

            }

            //Save some memory
            im  = null;

            //Return
            // callback( );

          });

        });

    }


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
        //roi.convertGrayscale();
        return roi;

    };

    detect_faces("/Users/monvillalon/Projects/HACKPR/ftd-web/data/test/mon.jpg");