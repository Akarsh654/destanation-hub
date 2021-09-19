var express = require('express');
var router = express.Router();
const passport = require('passport')
var authController = require('../Controllers/authController');
const business = require('../models/business');
var Business = require('../models/business')

router.get("/jwt_protect", passport.authenticate('jwt', { session: false }),authController.test_jwt);


router.get('/login', authController.get_login)

router.post('/login', authController.post_login)

router.post('/login-player', authController.post_login_player)

router.get('/register', authController.get_register)

router.post('/register', authController.post_register)

router.get('/forgot_password', authController.get_forgot_password)

router.post('/forgot_password', authController.post_forgot_password)

router.get('/reset/:token', authController.get_reset_token)

router.post('/reset', authController.post_reset)

router.get('/index', authController.index);

router.get('/', authController.index);

router.get('/business-details', function(req, res, next) {
    res.render('businessDet', { title: 'Business Details' });
})

router.get('/view-business', function(req, res, next) {
    let business = Business.find({_id: "6144498ba305c715600ec6ce"}).lean(); 
    // return business; 
    console.log('business: ', business)
    res.render('listings', { business, title: 'Business Details' });
})

module.exports = router;