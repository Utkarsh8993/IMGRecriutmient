const jwt = require('jsonwebtoken')
const User = require('../models/User')

const verifyJWT =(req,res,next) =>{
    const cookies = req.cookies;   
    if(!req?.cookies?.jwt || !req?.cookies?.decoder) return res.status(401).json({message : 'Unauthorized'});
    const token = cookies.jwt;
    const decoder = cookies.decoder;
    jwt.verify(
        token,
        decoder,
        async (err , decoded) =>{
            if(err) return res.status(403).json({message : `${err.message}`});
            if(!decoded?.user?._id) return res.status(400).json({ message : 'No id found in cookie'})
            const id = decoded.user._id
            const user = await User.findOne({_id : id});
            if(!user){
                res.clearCookie('jwt', { httpOnly: true, sameSite: 'None'});
                res.status(403).json({message : 'Invalid token'});
            }
            req.user = user
            next();
        }
    )
}

module.exports = verifyJWT