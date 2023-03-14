const Group = require('../models/Groups');
const QuizRoom = require('../models/QuizRoom');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const {v4 : uuid} =require('uuid');

const getAllGroups = asyncHandler(async (req , res) =>{
    const groups = await Group.find().select('-points').lean().exec();
    if(!groups) return res.status(404).json({ message : 'No groups Found'});
    res.json(groups);
})
const createNewGroup = asyncHandler(async (req , res) =>{
    if(!req?.body?.id) return res.status(404).json({message : 'Id of the user is required'});
    const user =await User.findOne({_id : req.user._id} ).lean().exec();
    user.roles = {
        "leader" : 2000,
    }
    user.isPart  = true;
    try {
        const groupObj = {...Group , joinKey : uuid().slice(0,4)}
        const group = await Group.create({groupObj});
        group.UserArray.push(user);
        group.name = req.body.name;
        await group.save();
        await User.updateOne(user , {
            roles : {
                'leader':2000
            }
        });
        
        const quizRoom = await QuizRoom.findOne({ _id : req.params.id});
        quizRoom.Groups.push(group);
        await quizRoom.save()
        if(!group){
            res.sendStatus(400);
            throw new Error('The group was not created');
        }
        res.status(200).json
        (group)
    } catch (error) {
        res.status(400).json({message : error.message})
    }
})

const deleteGroup = asyncHandler(async (req , res) =>{
    if(!req?.body?.id) return res.status(404).json({message : 'The id must be provided'});
    const deletedGroup =await  Group.findById(req.body.id);
    const leader = deletedGroup.UserArray.find((user) => user.roles === 'leader');
    leader.roles = {
        'player' : 1000,
    }
    await leader.save();
    await deletedGroup.delete();

    return res.status(200).json({message : 'The group was deleted'});
})

const getAllUserOfGroup = asyncHandler(async (req , res)=>{
    if(!req?.body?.id) return res.status(404).json({message : 'The id must be provided'});
    const groupUsers =await Group.findOne({_id : req.body.id}).exec();
    if(!groupUsers) res.status(404).json({message : 'The Group does not exist'});
    const userArray = [];
    for (let index = 0; index < groupUsers.UserArray.length; index++) {
        const element = groupUsers.UserArray[index];
        const user =await  User.findOne({_id : element});
        userArray.push(user);   
    }
    console.log(userArray);
    res.status(200).json(userArray);
})


const updatePoints = asyncHandler(async (req , res)=>{
    if(!req?.body?.points || !req.body.id) return res.status(404).json({message : 'The points are required'})
    //store points in local storage
    try {
        const group = await Group.findOne({_id : req.body.id}).exec();
        if(!group) res.status(404).json({message : 'The id is invalid'});
        group.points += req.body.points;
        await group.save();
        return res.status(200).json(group.points);
    } catch(err){
        res.status(400).json({message : err.message})
    }
})


module.exports = {
    getAllGroups,
    createNewGroup,
    deleteGroup,
    getAllUserOfGroup,
    updatePoints
}