// File that defines our User Model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
  fullName:  String,
  facebookId: String,
  accessToken: String
});

var User = mongoose.model('User', userSchema);
module.export = User;