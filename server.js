var port = process.env.PORT || 5000

var db                 = require('./models');
//require express frameware and additional modules
const express          = require('express');
      app              = express();
      bodyParser       = require('body-parser');
      path             = require("path");
      mongoose         = require('mongoose');
      session          = require('express-session');
      bcrypt           = require('bcrypt');
      methodOverride   = require('method-override')
      User             = require('./models/user');

const saltRounds = 10;

// middleware
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'SuperSecretCookie',
  cookie: { maxAge: 30 * 60 * 1000 }
}));

if (process.env.NODE_ENV == "production") {
  mongoose.connect(process.env.MLAB_URL)
} else {
mongoose.connect('mongodb://localhost/furriends');
}

//Use this for any requests with _method
app.use(methodOverride("_method"));
//// Routes ////

// use res.render to load the ejs view file\\\

//index page
app.get('/', function(req, res) {
  res.render('index');
});


app.get('/collections', function (req, res) {

  db.Pet.find({}, function(err, pets){
    if (err) {
      console.log("index error: " + err);
      res.sendStatus(500);
    }
    res.render('collection',{pets:pets});
  });
});

///////////
//create//
/////////

app.post("/collections", function(req,res){
  //get data from the form and add to the DB
  var petName   = req.body.petName;
  var breed     = req.body.breed;
  var age       = req.body.age;
  var sex       = req.body.sex;
  var imageurl  = req.body.imageurl;

  var newPet    =
  {
    petName:petName,
    breed:breed,
    age:age,
    sex:sex,
    imageurl:imageurl
  }
  ///////////////////////////////////////////
  //Create a new pet and save it to the DB//
  /////////////////////////////////////////
  db.Pet.create(newPet, (err,newlyCreatedPet) =>{
    if(err){
      console.log(err);
    } else {
      //redirect back to collections page
      res.redirect('/collections');
    }
  });
});

////////////////
// edit pets //
//////////////
app.get('/collections/:id/edit', (req,res) => {
  db.Pet.findById(req.params.id, (err,foundPet) => {
    if(err) {
      res.redirect('/collections');
    } else {
      res.render('edit', {pet: foundPet});
    }
  });
});
//////////////////
// update pets //
////////////////
app.put('/collections/:id', (req,res) => {
  db.Pet.findByIdAndUpdate(req.params.id,req.body.pet, (err, updatedPet) => {
    if(err){
      res.redirect('/collections');
    }else {
      res.redirect('/collections')
    }
  });
});

/////////////////
// Delete Pets//
///////////////

app.delete('/collections/:id', (req,res) => {
  db.Pet.findByIdAndRemove(req.params.id, (err) => {
    if(err){
      res.redirect('/collections');
    }else{
      res.redirect('/collections');

    }
  });
});


/////////////
// Signup //
///////////

app.get('/signup', (req, res) => {
  res.render('signup');
});

///////////
//create//
/////////

app.post('/users', (req, res) => {
  console.log(req.body)
  User.createSecure(req.body.email, req.body.username, req.body.password, (err, newUser) => {
    req.session.userId = newUser._id;
    res.redirect('/profile');
  });
});

//////////
//login//
////////

app.get('/login', function (req, res) {
  res.render('login');
});

///////////////////////////////////////////////
// authenticate the user and set the session//
/////////////////////////////////////////////


app.post('/sessions', function (req, res) {
  // call authenticate function to check if password user entered is correct
  User.authenticate(req.body.email, req.body.password, function (err, loggedInUser) {
    if (err){
      console.log('authentication error: ', err);
      res.status(500).send();
    } else {
      console.log('setting sesstion user id ', loggedInUser._id);
      req.session.userId = loggedInUser._id;
      res.redirect('/profile');
    }
  });
});



//////////////////////
//Show user profile//
////////////////////


app.get('/profile', (req, res) => {
  console.log('session user id: ', req.session.userId);
  // find the user currently logged in
  User.findOne({_id: req.session.userId}, (err, currentUser) => {
    if (err){
      console.log('database error: ', err);
      res.redirect('/login');
    } else {
      // render profile template with user's data
      console.log('loading profile of logged in user');
      res.render('user-landing-page', {user: currentUser});
    }
  });
});

app.get('/logout', (req, res) => {
  // remove the session user id
  req.session.userId = null;
  // redirect to login
  res.redirect('/login');
});




app.get('*', (req, res) => {
  res.render('404', {
  })
});

app.listen(process.env.PORT || 5000, () => {
  console.log('listening on port' + port)
})
