require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500;
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const {logger} = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/dbConn');
const mongoose = require('mongoose');
const {logEvents} = require('./middleware/logger');


//connection to db
connectDB();
//cookie Parser
app.use(cookieParser());

//cors
app.use(cors(corsOptions));

//logger
app.use(logger)
//json  middleware
app.use(express.json());

//serving static files
app.use('/' , express.static(path.join(__dirname , 'public')))
//routes add
app.use('/' ,require('./routes/root'));
app.use('/users' , require('./routes/userRoutes'));
app.use('/quiz' , require('./routes/quizRoutes'));

//routing bad requests
app.all('*' , (req , res)=>{
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname , 'views' , '404.html'))
    } else if(req.accepts('json')){
        res.json({message : '404 not found'})
    }  else{
        res.type('text').send('404 not found')
    }
})

app.use(errorHandler);

mongoose.connection.once('open' , ()=>{
    app.listen(PORT , () => console.log(`Server is running on ${PORT}`));
    console.log('Connected To mongoDb');
})

mongoose.connection.on('error' , (err)=>{
   console.log(err);
   logEvents(`${err.no} : ${err.code}\t${err.syscall}\t${err.hostname}` , 'mongoError.log');
})
