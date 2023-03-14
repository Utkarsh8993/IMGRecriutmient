const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/User');

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
        const duplicate = await User.findOne({googleID : profile.id})
        if(duplicate) return done(null , duplicate);
        const newUser = {
            username : profile.displayName,
            googleID : profile.id,
            token:accessToken
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