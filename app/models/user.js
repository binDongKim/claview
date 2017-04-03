var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  email: String,
  // name: String,
  password: String
  // status: String,
  // evaluation_date: { type: Date, default: Date.now },
  // evaluation_result: String,
  // evaluation_opinion: String
});

// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password); // compare hash value
};

module.exports = mongoose.model('User', userSchema);