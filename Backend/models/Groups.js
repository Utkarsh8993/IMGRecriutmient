const mongoose = require('mongoose');
const {v4:uuid} = require('uuid');

const groupSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        default:'Groupy'
    },
    UserArray : [
        {
            type : mongoose.Schema.Types.ObjectId,
            rel:'User',
            required:true
        }
    ],
    points : {
        type:Number,
        required:true,
        default:0
    },
    won : {
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('Group' , groupSchema)