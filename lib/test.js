var ftd = require('./findthedude.js');

ftd.setAccessToken("CAACEdEose0cBANRi3av4QtazUgKDLAaB0iswYBRhgMMBga7D2GC2FTHGgenVzmcUluZA0TOIaaXwM5YK14UQHdVKgzDpgbew3ujVG0h9ZAMHuLhvOtFcurjFprxHAEY8iiqPsO3ybAuZBvWZChEb9jVsDdZCNxr1e7GaZA2mPZAkIoZBI84ySJfsP4KVE7QDuBYZD");
ftd.setDataDirectory( __dirname + "/../data/");
// ftd.prepare( "788781095" , function(){

// });

ftd.predict( "788781095" , "/Users/monvillalon/Projects/HACKPR/ftd-web/data/test/mon.jpg" , function( err , prediction ){
    console.log( prediction );
});