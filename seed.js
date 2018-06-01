var db = require("./models");

var samplePets = [{
   petName: 'Fluffy',
   breed: 'Pomeranian',
   age: '4',
   sex: 'Low',
   imageurl: ''
 },
 {
   petName: 'Fennec',
   breed: 'Terrier, Pit Bull/Mix',
   age: '4 years, 11 months',
   energy: 'High',
   imageurl: ''
 },
 {
   petName: 'Boscoe',
   breed: '',
   age: '2018, April 8',
   energy: [ 'hip-hop', 'rap' ],
   imageurl: ''

 },
 {
   petName: 'Flatbush Zombies',
   breed: 'Vacation in Hell',
   age: '2018, April 8',
   energy: [ 'hip-hop', 'rap' ],
   imageurl: ''
 }];

// remove all records that match {} -- which means remove ALL records
  db.Pet.remove({}, function(err, albums){
  if(err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log('removed all books');
  // create new records based on the array samplePets
  db.Pet.create(samplePets, function(err, pets){
    if (err) { return console.log('ERROR', err); }
    console.log("all pets:", pets);
    console.log("created", pets.length, "pets");
    process.exit();
    });
  }
});
