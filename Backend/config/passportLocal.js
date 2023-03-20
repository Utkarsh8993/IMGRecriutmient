const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const JwtStrategy = require('passport-jwt').Strategy
require('dotenv').config()

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((_id, done) => {
  User.findById( _id, (err, user) => {
    if(err){
        done(null, false, {error:err});
    } else {
        done(null, user);
    }
  });
});

const cookieFromRequest = (req) =>{
    if(!req?.cookies?.accesstoken) return null
    return req.cookies.accesstoken
}

//authorization
passport.use(new JwtStrategy({
    jwtFromRequest: cookieFromRequest,
    secretOrKey : process.env.ACCESS_TOKEN_SECRET 
} , async (payload , done) =>{
   try {
    const user =await User.findOne({ _id : payload.sub })
    return done(null , user)
   } catch (error) {
    return done(error , false)
   }
}))



passport.use(new LocalStrategy(async (username , password , done)=>{
   try {
    const user =await  User.findOne({username})
    if(!user) return done(null , false);
    user.comparePwd(password , done)
   } catch (error) {
    return done(error)
   }
}))