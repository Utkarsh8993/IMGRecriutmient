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
    if(!req?.user?._id) return res.status(404).json({message : 'Id of the user is required'});
    const user =await User.findOne({_id : req.user._id} ).lean().exec();
    if(user.isPart) return res.status(403).json({message : 'You are already in a  group'})
    try {
        const groupObj = { 
            name : req.body.name, 
            joinKey : uuid().slice(0,4),
            UserArray : [user]
        }
        const duplicate = await Group.findOne({ name : req.body.name })
        if(duplicate) return res.status(403).json({message : 'The name is Already Taken'})
        const group = await Group.create(groupObj);
        await User.updateOne(user , {
            roles : 'Leader',
            isLeader: true
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

const addUserToGroup = asyncHandler(async (req,res) =>{

    if(!req?.user?._id) return res.status(403).json({ message : 'You must be logged in'});
    if(!req?.body?.id) return res.status(400).json({message : 'The id is required'})
    try {
        const user = await User.findById(req.user._id.toString());
        if(!user) return res.status(403).json({message : 'The User must be looged in'});
        const group = await Group.findById(req.body.id)
        if(user.isPart) return res.status(403).json({message : 'You are already part of the group'})
        if(!group) return res.status(403).json({message : 'The id is invalid'});
        group.UserArray.push(user)
        await group.save();
        await User.findByIdAndUpdate(req.user._id , {
            isPart: true
        })
        res.status(200).json({ groupId : group._id })
    } catch (error) {
        console.log(error)
    }
})

const deleteGroup = asyncHandler(async (req , res) =>{
    if(!req?.body?.id) return res.status(404).json({message : 'The id must be provided'});
    const deletedGroup =await  Group.findById(req.body.id);
    const leader = deletedGroup.UserArray.find((user) => user.roles === 'Leader');
    leader.roles = {
        'Player' : 1000,
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
    res.status(200).json(userArray);
})


const updatePoints = asyncHandler(async (req , res)=>{
    if(!req?.body?.leaderId) return res.status(404).json({message : 'The leader id are required'});
    if(!req?.body?.quizId) return res.status(404).json({message : 'The quiz id are required'});
    if(!req?.body?.score) return res.status(404).json({message : 'The points are required'})
    try {
        const quizRoom = await QuizRoom.findById(req.body.quizId);
        if(!quizRoom) return res.status(400).json({message : 'The is is inavalid'});
        const groups = QuizRoom.Groups
        for (let index = 0; index < groups.length; index++) {
            const element = groups[index].toString();
            const group = await Group.findById(element);
            const userArray = group.UserArray
            for (let j = 0; j < userArray.length; j++) {
                const userId = userArray[j].toString();
                if(req.body.leaderId === userId){
                   await Group.findByIdAndUpdate(element , {
                        points : req.body.score
                   })
                   const users = group.userArray
                   for (let i = 0; i < users.length; i++) {
                    const element = users[i];
                    await User.findByIdAndUpdate(element , {
                        questionCorrect : +req.body.score
                    })
                   }
                }
            } 
            
        }
    } catch(err){
        res.status(400).json({message : err.message})
    }
})

const deleteOneGroup =asyncHandler(async (id) =>{
    try {
        const group = await Group.findById(id);
        if(!group) return res.status(403).json({message : 'The id is invalid'});
        const userArray = group.UserArray
        for (let index = 0; index < userArray.length; index++) {
                const element = userArray[index].toString();
                const result = await User.findByIdAndUpdate(req.user._id , {
                    isPart: false
                })
                userArray.splice(index , 1);
                group.UserArray = userArray;
                await group.save();
            }
        await Group.findByIdAndDelete(id)
    } catch (error) {
     console.log(error)   
    }
}) 

const removeTheUser = asyncHandler(async (req,res)=>{
    if(!req?.body?.id) return res.status(404).json({message : 'The id must be provided'})
    if(!req?.user?._id) return res.status(403).json({ message : 'You must be logged in'});
    try {
        const user = await User.findOne({ _id : req.user._id}).exec();
        if(!user) return res.status(403).json({message : 'The User must be looged in'});
        const group = await Group.findOne({ _id : req.body.id}).exec();
        if(!group) return res.status(403).json({message : 'The id is invalid'});
        const userArray = group.UserArray
        for (let index = 0; index < userArray.length; index++) {
            const element = userArray[index].toString();
            if(element === user._id.toString() ){
                if(user.isLeader) {
                   deleteOneGroup(id)
                    User.findByIdAndUpdate(user._id , {
                        isLeader:false
                    })
                }

                const result = await User.findByIdAndUpdate(req.user._id , {
                    isPart: false
                })
                userArray.splice(index , 1);
                group.UserArray = userArray;
                await group.save();
                res.status(200).json({message : 'The User was removed with group'})
            } else{
                res.status(400).json({message : 'The user was not found'})
            }
        }
        await group.save();
        await User.updateOne(user , {
            isPart: true
        })
    } catch (error) {
        console.log(error)
    }
})

const groupFromLeader = asyncHandler(async (req , res)=>{
    if(!req?.body?.leaderId) return res.status(404).json({message : 'The leader id are required'});
    if(!req?.body?.quizId) return res.status(404).json({message : 'The quiz id are required'});
    try {
        const quizRoom = await QuizRoom.findById(req.body.quizId);
        if(!quizRoom) return res.status(400).json({message : 'The is is inavalid'});
        const groups = QuizRoom.Groups
        for (let index = 0; index < groups.length; index++) {
            const element = groups[index].toString();
            const group = await Group.findById(element);
            const userArray = group.UserArray
            for (let j = 0; j < userArray.length; j++) {
                const userId = userArray[j].toString();
                if(req.body.leaderId === userId){
                   const group = await Group.findById(element)
                   return res.status(200).json({
                    groupId : group._id
                   })
                }
            }
        }
    } catch(err){
        res.status(400).json({message : err.message})
    }
})

module.exports = {
    getAllGroups,
    createNewGroup,
    deleteGroup,
    getAllUserOfGroup,
    updatePoints,
    addUserToGroup,
    removeTheUser
}