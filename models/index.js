var mongoose = require("mongoose");
    jquery   = require("express-jquery");

if (process.env.NODE_ENV == "production") {
  mongoose.connect(process.env.MLAB_URL)
} else {
mongoose.connect('mongodb://localhost/furriends');
}

module.exports.Pet = require("./pets.js");

module.exports.User = require("./user.js");
