const mongoose = require('mongoose');

const dbOptions = {
    useNewUrlParser : true,
    useUnifiedTopology :true
}

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.DATABASE_URI);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {connectDB , dbOptions}