var express 		= require('express');
var request			= require('request');
var router 			= express.Router();
var userLocation;
var newLat;
var newLng;
var newLocation;
// require('dotenv').config();

var User 			= require('../models/user');

// include api keys
// var SECRET_KEY_ZIP = process.env.SECRET_KEY_ZIP;
// var SECRET_KEY_GOOGLE = process.env.SECRET_KEY_GOOGLE;

//APIs
router.get('/', isLoggedIn, function(req, res) {
    userLocation = req.user.location;

// convert zipcode to Lat and Long coordinates
    var findLatLong =`https://www.zipcodeapi.com/rest/${SECRET_KEY_ZIP}/info.json/${userLocation}/degrees`;

    request(findLatLong, function (error, response, body) {
        let unstringifiedLat = JSON.parse(body).lat;
        let unstringifiedLng = JSON.parse(body).lng;

//find doctors based on acquired Lat and Long coordinates
        var findDoctors = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${unstringifiedLat},${unstringifiedLng}&radius=40000&keyword=gynecologist&key=${SECRET_KEY_GOOGLE}`;

        request(findDoctors, function (error, response, results) {
            var doctors = JSON.parse(results);
            res.render("find", {doctors: doctors});
        });
    });
});

// Changes the zipcode of the user
router.put('/', isLoggedIn, function(req, res) {
    console.log("req.body is:", req.body);
    User.findByIdAndUpdate(res.locals.currentUser,
        {location: req.body.location},
        function(err, user) {
            // console.log("new location is:", location)
        })
    res.send('Success!');
});


module.exports = router;
