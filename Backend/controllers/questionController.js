const asyncHandler = require('express-async-handler');
const Questions = require('../models/Questions');
const Groups = require('../models/Groups');

const checkQuestion = asyncHandler (async (req , res)=>{
    if(req?.body?.id) return res.status(400).json({message : 'The Url must include question id'});
    if(!req?.body?.optionsSumbitted) return res.status(400).json({message : 'Please Select A option'});
    const question = await Questions.findOne({_id : req.body.id}).exec();
    if(!question) return res.status(400).json({message : `No question exist with ${req.body.id}`});
    const correcOptions =await Questions.options.filter((option) => option.correct ===  true);
    if(!correcOptions.value === optionsSumbitted.value ) return res.status(201).json({message: 'You are wrong'});
    return res.status(200).json({messgae : 'You are correct'});
    //localStorage increment point and userCorrectness
})


const createQuestion = asyncHandler(async(req , res)=>{
    if(req?.body?.quizQuestion) return res.json({message: 'This field is required'});
    const questionReqObj = req.body.question;
    if(!questionReqObj?.question || !questionReqObj.options) return  res.status(400).json({message : 'These fields are required'});
    const newQuestion = {
        question : questionReqObj.question,
        options :  questionReqObj.options,
        pointsAssigned :  questionReqObj.points
    }
    try {
        const duplicate = Questions.findOne({question : newQuestion.question}).exec();
        if(duplicate) return res.status(400).json({message : 'Question already exist'})
        const result = await Questions.create(newQuestion);
        res.status(200).json({result})

    } catch (error) {
        res.status(400).json({message : 'Unable to create question'})
    }

})

module.exports = {
    createQuestion,
    checkQuestion
}