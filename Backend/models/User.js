const mongoose =  require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        requried : true
    },
    password : {
        type : String,
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
    requestKey :{
        type:String,
        default:'',
        required:false
    }
})

module.exports = mongoose.model('User' , userSchema)