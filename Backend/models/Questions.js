const mongoose =  require('mongoose')

const questionSchema = new mongoose.Schema({
    question : {
        type:String,
        required:true
    },
    options : [
        {
            value:{
                type:String,
                required:true
            },
            correct : {
                type:Boolean,
                required:true
            }  
        }
    ],
    pointsAssigned:{
        type:Number,
        default:1,
        required:false
    }
})


module.exports = mongoose.model('Questions' , questionSchema)