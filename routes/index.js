var express = require('express');
var router = express.Router();
const passport = require('passport')
var authController = require('../Controllers/authController')
var businessController = require('../Controllers/businessController')


router.get("/jwt_protect", passport.authenticate('jwt', { session: false }),authController.test_jwt);

router.get('/business', function(req, res, next){
    res.render('business', {title: 'businesses'})
})

router.get('/logout', function(req, res, next){
    res.redirect('login')
})

router.get('/businesses/:user_id', businessController.get_businesses)

router.post('/post-business', businessController.post_register )

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

router.get('/claim', function(req, res, next){
    res.render('claim', {title: 'Claim'})
})

router.get('/unclaimed',businessController.get_unclaimed_businesses)

router.get('/find', function(req, res, next){
    res.render('find-other-businesses', {title: 'Find Other Businesses'})
})
router.get('/find-other-businesses/:user_id', businessController.get_other_businesses)

router.get('/profile', function(req, res, next){
    res.render('profile', {title: 'Profile'})
})

module.exports = router;


