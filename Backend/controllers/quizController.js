const QuizRoom = require('../models/QuizRoom');
const User = require('../models/User');
const Questions = require('../models/Questions');
const asyncHandler = require('express-async-handler');
const {v4 : uuid} =require('uuid');


const createQuizRoom = asyncHandler(async (req , res)=>{
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
    const { id , requestKey } = req.body;
    const user = await User.findById({ id });
    if(!user) return res.status()
    const quizRoom = await QuizRoom.findOne({ RoomID: requestKey});
    if(!quizRoom) return res.status(400).json( {message : 'The Room Does Not Exist'});
    res.redirect('http://localHost:3000/groups')

})

const deleteQuizRoom = asyncHandler(async (req , res)=>{
    if (!req?.body?.id) return res.status(404).json({ message : 'Invalid Room No.'});
    const quizRoomToBeDeleted = await QuizRoom.findById(req.body.id);
    if(!quizRoomToBeDeleted) return res.status(400).json({ message : 'Invalid ID'});
    res.status(200).json({ message : 'Quiz was Completed'})
})

module.exports = {
    createQuizRoom,
    enterQuizRoom,
    deleteQuizRoom
}