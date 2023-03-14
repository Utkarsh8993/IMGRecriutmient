const express = require('express');
const router = express.Router()
const passport = require('passport')

router.route('/google')
    .get(passport.authenticate('google' , {
        scope : ['profile'],
        access_type:'offline',
        approval_prompt : 'force',
        prompt:'consent'
    }) )
router.route('/google/redirect')
    .get(passport.authenticate('google'), (req , res)=>{
        res.send(req.user);
    })
    

module.exports = router