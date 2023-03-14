//question db???
    
const QuizRoom = require('../models/QuizRoom');
const User = require('../models/User');
const Questions = require('../models/Questions');
const asyncHandler = require('express-async-handler');
const {v4 : uuid} =require('uuid');
const Groups = require('../models/Groups');


const createQuizRoom = asyncHandler(async (req , res)=>{
    const user = await User.findOne({_id : req.user._id});
    if(!user) return res.status(401).json({message : 'Unauthorized'})
    const  quizRoomObj = {
       RoomID :uuid().slice(0 , 4),
       Groups : [],
       Questions: await Questions.find().exec(),
    }
    const quizRoom = await QuizRoom.create(quizRoomObj);
    if(quizRoom){
        return res.status(200).json({
            RoomID : quizRoom.RoomID 
        })
    } else{
        return res.sendStatus(400)
    }
})

//post request from a User
const enterQuizRoom = asyncHandler(async (req , res)=>{
    const user = await User.findOne({_id : req.user._id});
    if(!user) return res.status(401).json({message : 'Unauthorized'})
    const { requestKey } = req.body;
    const quizRoom = await QuizRoom.findOne({ RoomID: requestKey});
    if(!quizRoom) return res.status(400).json( {message : 'The Room Does Not Exist'});
    return res.status(200).json({ message : 'Quiz Room joined'})
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
    console.log(groupIdStringArray);
    const groups = [];
    for (let index = 0; index < groupIdStringArray.length; index++) {
        const groupId   = groupIdStringArray[index];
        const group = await Groups.findOne({ _id : groupId}).exec();
        groups.push(group);
    }
    console.log(groups);
    return res.status(200).json(groups);       
})

const getAllQuestion = asyncHandler(async(req,res)=>{
    if(!req?.params?.id) return res.json({ message : 'The id is required in the url'})
    const id = req.params.id;
    
    const quizRoom =await QuizRoom.findOne({_id  :id});
    if(!quizRoom) return res.status(200).json({ message : 'The id is Invalid'})
    const questionIdArray = quizRoom.Questions;
    const questions = [];
    for (let index = 0; index < questionIdArray.length; index++) {
        const questionId   = questionIdArray[index];
        const question = await Questions.findOne({ _id : questionId}).exec();
        questions.push(question);
    }
    return res.status(200).json(questions);       
})

//whenever a room is made ->option for making groups


module.exports = {
    createQuizRoom,
    enterQuizRoom,
    deleteQuizRoom,
    getAllGroups,
    getAllQuestion
}