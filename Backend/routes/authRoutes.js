const express = require('express');
const router = express.Router()
const authControllers = require('../controllers/authController')
const passport = require('passport')


router.route('/google')
    .get(passport.authenticate('google' , {
        scope : ['profile'],
        access_type:'offline',
        approval_prompt : 'force',
        prompt:'consent'
    }) )
router.route('/google/redirect')
    .get(passport.authenticate('google'),authControllers.handlePassportLogin)
router.route('/login')
    .post(passport.authenticate('local' , {session : false}),authControllers.handleLogin)
router.route('/register')
    .post(authControllers.handleRegister)    
router.route('/logout')
    .get(passport.authenticate('jwt' , {session : false}) ,authControllers.handleLogout)


    module.exports = router