//question db???
    
const QuizRoom = require('../models/QuizRoom');
const User = require('../models/User');
const Questions = require('../models/Questions');
const asyncHandler = require('express-async-handler');
const {v4 : uuid} =require('uuid');
const Groups = require('../models/Groups');
const Group = require('../models/Groups')


const createQuizRoom = asyncHandler(async (req , res)=>{
    if(!req?.user) return res.status(401).json({message : 'Unauthorized'});
    try {
        const user = await User.findOne({_id : req.user._id});
        
        if(!req?.body?.questions) return res.status(400).json({ message : 'Questions are required for a quiz room' })
        if(!user) return res.status(401).json({message : 'User not found'})
        const result = await User.updateOne(user , {
            isCreater : true
        })
        if(!result) return res.status(403).json({message : 'The user is not saved'})
        const quizRoomObj = {
           RoomID :uuid().slice(0 , 4),
           Groups : [],
           Questions: req.body.questions
        }
        const quizRoom = await QuizRoom.create(quizRoomObj);
        if(quizRoom){
            const responseData = {
                id: quizRoom._id,
                code: quizRoom.RoomID
              }
              
              return res.status(200).json(responseData)
        }else{
            return res.sendStatus(400)
        }
    } catch (error) {
        console.log(error)
    }
})

//post request from a User
const enterQuizRoom = asyncHandler(async (req , res)=>{
    try {
        const user = await User.findOne(req.user._id);
        console.log(user)
        if(!user) return res.status(401).json({message : 'Unauthorized'})
        if(!req?.body?.requestKey) return res.status(400).json({message : 'Key is required'})
        const { requestKey } = req.body;
        const quizRoom = await QuizRoom.findOne({ RoomID: requestKey});
        if(!quizRoom) return res.status(400).json({message : 'The Room Does Not Exist' , joined :false});
        return res.status(200).json({ joined : true , code : quizRoom})
    } catch (error) {
        console.log(error)
    }
   
})

const deleteQuizRoom = asyncHandler(async (req , res)=>{
    if (!req?.body?.id) return res.status(404).json({ message : 'Invalid Room No.'});
    const quizRoomToBeDeleted = await QuizRoom.findById(req.body.id);
    if(!quizRoomToBeDeleted) return res.status(400).json({ message : 'Invalid ID'});
    res.status(200).json({ message : 'Quiz was Completed'})
})

const getAllGroups = asyncHandler(async(req,res)=>{
    if(!req?.params?.id) return res.json({ message : 'The id is required in the url'})
    const id = req.params.id;
    
    const quizRoom =await QuizRoom.findOne({_id  :id});
    if(!quizRoom) return res.status(200).json({ message : 'The id is Invalid'})
    const groupIdArray = quizRoom.Groups;
    const groupIdStringArray = groupIdArray.map((id)=> {return id.toString()})
    const groups = [];
    for (let index = 0; index < groupIdStringArray.length; index++) {
        const groupId   = groupIdStringArray[index];
        const group = await Groups.findOne({ _id : groupId}).exec();
        groups.push(group);
    }
    return res.status(200).json(groups);       
})

const getAllQuestion = asyncHandler(async(req,res)=>{
    if(!req?.body?.id) return res.status(400).json({ message : 'The id is required in the url'})
    const id = req.body.id;
     
    const quizRoom =await QuizRoom.findOne({_id  :id});
    if(!quizRoom) return res.status(400).json({ message : 'The id is Invalid'})
    const questionArray = quizRoom.Questions;

    return res.status(200).json(questionArray);       
})

const getAllUsersOfQuiz = asyncHandler(async (req,res) =>{
    if(!req?.params?.id) return res.status(400).json({message : 'The id is requried'});
    const allUser = [];
    const quizRoom =await QuizRoom.findById(req.params.id);
    if(!quizRoom) return res.status(400).json({ message : 'The id is Invalid'})
    const groups = quizRoom.Groups;
    
    for (let index = 0; index < groups.length; index++) {
        const element = groups[index]
        const group = await Groups.findById(element)
        const users = group.UserArray
            for (let j = 0; j < users.length; j++) {
                const userId = users[j];
                const user = await User.findById(userId);
                allUser.push(user)
            }
        }
    return res.status(200).json(allUser)
    })

const endQuiz = asyncHandler(async(req,res) =>{
    if(!req?.body?.quizId){return res.status(400).json({ message : 'The quiz id is required'})};
    try {
        const quizRoom =await QuizRoom.findById(req.body.quizId);
        
        if(!quizRoom) return res.status(400).json({ message : 'The id is Invalid'});
        const GroupsArray = quizRoom.Groups.map((group) =>{ return group.toString() } );
        for (let index = 0; index < GroupsArray.length; index++) {
            const element = GroupsArray[index].toString();
            const group = await Group.findById(element)
            const users = group.UserArray
            const userArray = users.map((user) =>{
                return user.toString();
            })
            for (let j = 0; j < userArray.length; j++) {
                const id = userArray[j];
                const user = await User.findById(id);
                user.isPart = false;
                user.isCreater = false;
                user.isLeader = false;
                user.quizPlayed++;
                console.log(user)
                const result = await user.save();
                console.log(user)
                if(!result) res.json({message : 'Unable to Update User'})
            }
            const result = await Groups.findByIdAndDelete(GroupsArray[index]._id)
            if(!result) res.json({message : 'Unable to delete group'})
        }
        const result = await Groups.findByIdAndDelete(req.body.quizId)
        if(!result) res.json({message : 'Unable to delete quiz'})
        return res.status(200).json({message : 'Quiz exited succesfully'})
    } catch (error) {
        return res.status(500).json({message : error.message})
    }
   
})

//whenever a room is made ->option for making groups


module.exports = {
    createQuizRoom,
    enterQuizRoom,
    deleteQuizRoom,
    getAllGroups,
    getAllQuestion,
    endQuiz,
    getAllUsersOfQuiz
}