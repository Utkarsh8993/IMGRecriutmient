const User = require('../models/User')
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const Group = require('../models/Groups');

const getAllUser = asyncHandler(async (req , res)=>{
    const users = await User.find().select('-password').lean();
    if(!users) return res.status(400).json({ message : 'No users found'});
    res.json(users);
})

const createNewUser = asyncHandler(async (req , res) =>{
    const{username , password } = req.body;
    if(!username || !password) return res.status(400).json({message : 'All fields are required '});
    //check duplicate
    const duplicate = await User.findOne({ username }).lean().exec();
    if(duplicate) return res.status(409).json({message : 'Duplicate Username'});
    const hashedPWD = await bcrypt.hash(password , 10);
    const userObject = { username , "password" : hashedPWD }
    const user  = await User.create(userObject);

    if(user){ 
        res.status(200).json({message : `New USer ${username} created with id:${user._id}`})
    }  else {
        res.status(400).json({message : 'Invalid  Data'});
    }
})




const groupRequest = asyncHandler(async (req ,res) => {
    const { id , requestKey } = req.body;
    const user = await User.findOne({_id :  id });
    if(user.isPart) return res.status(400).json({message : 'Already Part of Group'});
    const group = await Group.findOne({ joinKey : requestKey });
    group.UserArray.push(user);
    user.isPart = true;
    await user.save();
    await group.save();
    return res.status(200).json({message : 'Successfully joined the group '})
})

const getAllPropOfUser = asyncHandler(async(req , res)=>{
    if(!req?.user?._id) return res.status(200).json({message : 'Login to See This'})
    const user =await User.findOne({_id : req.user._id});
    if(!user) return res.status(400).json({message : 'No such User Exits'});
    res.status(200).json(user);
})

module.exports = {
    getAllUser,
    createNewUser,
    groupRequest,
    getAllPropOfUser
}