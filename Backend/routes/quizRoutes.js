const express = require('express');
const router = express.Router()
const quizController = require('../controllers/quizController');
const groupController = require('../controllers/groupController');

router.route('/')
    .post(quizController.createQuizRoom)
    .delete(quizController.deleteQuizRoom)
router.route('/:id')
    .get(quizController.getAllGroups)
    .post(groupController.createNewGroup)
router.route('questions/:id')
    .get(quizController.getAllQuestion)
router.route('/join')
    .post(quizController.enterQuizRoom)

    
module.exports = router