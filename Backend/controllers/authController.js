const bcrypt = require('bcrypt');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')

const handleLogin = asyncHandler(async(req , res)=>{
    if(req?.body?.username || req?.body?.pwd) return res.json({ message : 'Username and Password is required'});

    const {username , pwd} = req.body

    const foundUser =await User.findOne({username : username}).exec();
    if(!foundUser) return res.sendStatus(401) //unauthorized;
    const match = await bcrypt.compare(pwd , foundUser.password)
    if(!match) return res.status(401).json({ message : 'Incorrect Password'});
    res.status(200).json({message : `${username} is Logged in`});
})

const handlePassportLogin = asyncHandler(async (req , res)=>{

    //req.user is present and is authenticated
    const secret = req.user.token || process.env.ACCESS_TOKEN_SECRET
    const accessToken = jwt.sign( {
        "user" : req.user
    } , secret,
    {expiresIn: '1h'}
)
    //decode the cookie at frontend
    const result = res.cookie('jwt' , accessToken , {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly:true,
        sameSite:'none'
    })
    
    //secret containing cookie
    res.cookie('decoder' , secret , {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly:true,
        sameSite:'none'
    })
    //redirect;
    res.redirect('http://localhost:3000')
    }
)

module.exports = {
    handleLogin,
    handlePassportLogin
}
