// File that defines our User Model
var Schema = mongoose.Schema;

var userSchema = new Schema({
  fullName:  String,
  facebookId: String,
  accessToken: String
});


var User = mongoose.model('User', userSchema);

var user = new User({ fullname: "Andres", facebookId: "thisismyfacebookid", accessToken: "what_a_token!"})
