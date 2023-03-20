const mongoose = require('mongoose');
const {v4 : uuid} =require('uuid');

const quizRoomSchema = mongoose.Schema({
    RoomID : {
        type:String,
        default:uuid().slice(0 , 4),
        immutable : true
    },
    Groups : [
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref : 'Groups'
        }
    ],
    Questions : [
        {
        type:Object,
        required:true
    }
]
})

module.exports = mongoose.model('QuizRoom' , quizRoomSchema)