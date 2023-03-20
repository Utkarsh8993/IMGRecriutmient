const bcrypt = require('bcrypt');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportConfig = require('../config/passportLocal')

const handleLogin = asyncHandler(async(req , res)=>{
   if(!req.isAuthenticated()) return res.status(401).json({message : 'Authentication Failed'});
   const {_id , username , roles} = req.user
   const accessToken = jwt.sign({
        iss : 'QuizHub Founder',
        sub :  _id
   },
    process.env.ACCESS_TOKEN_SECRET,{
        expiresIn : "1h"
    }
   )
   res.cookie('accesstoken' , accessToken , {
    httpOnly:true,
    sameSite:'none',
    secure:true,
    maxAge: 60 * 60 * 1000
   } )
   res.status(200).json({message : 'Logged in scuccefully' , user:{
    username,
    roles
   }})
})

const handlePassportLogin = asyncHandler(async (req , res)=>{
    req.userObj = req.user
    //req.user is present and is authenticated
    const secret = req.user.token || process.env.ACCESS_TOKEN_SECRET
    console.log(secret);
    const accessToken = jwt.sign( {
        "user" : req.user
    } , secret,
    {expiresIn: '1d'}
)
    //decode the cookie at frontend
    const result = res.cookie('jwt' , accessToken , {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly:true,
        sameSite:'none',
        secure : true
    })
    
    //secret containing cookie
    res.cookie('decoder' , secret , {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly:true,
        sameSite:'none',
        secure:true
    })
    //redirect;
    res.redirect('http://localhost:3000/h')
    }
)

const handleRegister =asyncHandler( async (req,res) =>{
    if(!req?.body?.username || !req?.body?.password || !req?.body?.confirmPwd) return res.status(400).json({message : 'these fields are required'});
    const {username , password , confirmPwd } = req.body;
    if(password !== confirmPwd) return res.status(400).json({message : 'Both passwords must be same'})
    try {
        const duplicate = await User.findOne({ username}).exec()
    if(duplicate) return res.status(403).json({message : `The username is taken`});
    const result = await User.create({
        username,
        password
    })
    if(!result) return res.status(400).json({message : 'Unable to register'})
    return res.status(200).json({message : 'Account Successfully created'})
    } catch (error) {
        console.log(error)
    }
    
})

const handleLogout = (req,res) =>{
    console.log('hellop')
    if(!req?.cookies?.jwt ||!req?.cookies?.decoder ) return res.status(204).json({message : 'No cookie'})
    const user = User.findByIdAndUpdate(req.user._id , {
        isPart:false,
        isTrue:false,
        isCreater:false
    })
    res.clearCookie('jwt');
    res.clearCookie('decoder')
    res.status(200).json({message : 'Logged Out Succefully'})
}

module.exports = {
    handleLogin,
    handlePassportLogin,
    handleRegister,
    handleLogout
}


