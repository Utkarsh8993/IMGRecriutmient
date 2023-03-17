const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/User');
const { v4 : uuid} = require('uuid')  
const jwt = require('jsonwebtoken')
passport.serializeUser((user, done) => {
    done(null, user.id);
 });
 
 passport.deserializeUser(async (id, done) => {
   const USER = await User.findById(id);
   done(null, USER);
 });
 
passport.use(
    new GoogleStrategy({
        callbackURL : 'http://localhost:3500/auth/google/redirect',
        clientID : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET
    },async (accessToken, refreshToken , profile, done)=>{
       
        const duplicate = await User.findOne({username : profile._json.name})
        if(duplicate) return done(null , duplicate);
    
        const newUser = {
            username : profile._json.name,
            imgLink : profile._json.picture,
            token: accessToken
        }
        
        try {
            const user =await User.create(newUser);
            if(!user) return new Error('Invalid Login');
            done(null , user)
        } catch (error) {
            console.log(error);
            done(error , newUser)
        }
    }
))