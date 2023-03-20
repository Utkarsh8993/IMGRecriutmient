const mongoose =  require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        requried : true,
        min:6
    },
    password : {
        type : String,
        default:'test123',
        required : true,
        min:8
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
    isLeader: {
        type:Boolean,
        default:false
    } ,
    isCreater: {
        type:Boolean,
        default:false
    } ,
    imgLink:String
})

userSchema.pre('save' ,async  function(next) {
    if(!this.isModified('password')) return next();
    const hashedPwd =await bcrypt.hash(this.password , 10)
    this.password = hashedPwd;
    next();
})

userSchema.methods.comparePwd =async  function(password , cb) {
    try {
        const match = await bcrypt.compare(password , this.password)
        if(!match) return cb(null , match)
        return cb(null , this)
    } catch (error) {
        return cb(error)
    }
    
}
module.exports = mongoose.model('User' , userSchema)