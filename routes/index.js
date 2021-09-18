var express = require('express');
var router = express.Router();
const passport = require('passport')
var authController = require('../Controllers/authController')

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

<<<<<<< Updated upstream
=======
router.get('/business-details', function(req, res, next) {
    res.render('businessDet', { title: 'Business Details' });
})

router.get('/view-business', function(req, res, next) {
    res.render('listings', { title: 'Business Details' });
})
>>>>>>> Stashed changes

module.exports = router;