const mongoose = require('mongoose');
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email:    {type: String, require: true},
    username: { type: String, required: true },
    passwordDigest: { type: String, required: true }
});

UserSchema.statics.createSecure = function (email, username, password, callback){
  // `this` references our user model, since this function will be called from the model itself
  // store it in variable `UserModel` because `this` changes context in nested callbacks

  var UserModel = this;

  // hash password user enters at sign up
  bcrypt.genSalt((err, salt) => {
    console.log('salt: ', salt);  // changes every time
    bcrypt.hash(password, salt, (err, hash) => {

      // create the new user (save to db) with hashed password
      UserModel.create({
        email: email,
        username: username,
        passwordDigest: hash
      }, callback);
    });
  });
};


// authenticate user (when user logs in)
UserSchema.statics.authenticate = (email, username, password, callback) => {
  // find user by email entered at log in
  // remember `this` is the User model when we are inside a static method
  this.findOne({email: email}, (err, foundUser) => {
    console.log(foundUser);

    // throw error if can't find user
    if (!foundUser) {
      console.log('No user with email ' + email);
      callback("Error: no user found", null);  // better error structures are available, but a string is good enough for now
    // if we found a user, check if password is correct
    } else if (foundUser.checkPassword(password)) {
      callback(null, foundUser);
    } else {
      callback("Error: incorrect password", null);
    }
  });
};

// compare password user enters with hashed password (`passwordDigest`)
UserSchema.methods.checkPassword = (password) => {
  // run hashing algorithm (with salt) on password user enters in order to compare with `passwordDigest`
  return bcrypt.compareSync(password, this.passwordDigest);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
