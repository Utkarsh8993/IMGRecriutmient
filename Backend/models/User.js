const mongoose =  require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        requried : true
    },
    password : {
        type : String,
        default:'test123',
        required : true
    },
    quizPlayed : {
        type : Number,
        default : 0
    },
    isPart : {
        type:Boolean,
        default:false
    },
    questionCorrect : {
        type:Number,
        default:0
    },
    roles : {
        player : {
            type:Number,
            default:1000
        },
        leader:Number 
    },
    token : String,
    imgLink:String
})

module.exports = mongoose.model('User' , userSchema)