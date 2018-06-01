var mongoose = require('mongoose');

var PetSchema = new mongoose.Schema({
  petName: String,
  breed: String,
  age: Number,
  sex: String,
  imageurl: String
});

var Pet = mongoose.model('Pet', PetSchema);

module.exports = Pet;
