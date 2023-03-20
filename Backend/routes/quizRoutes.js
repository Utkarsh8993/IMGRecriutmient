const express = require('express');
const router = express.Router()
const quizController = require('../controllers/quizController');
const groupController = require('../controllers/groupController');
const passport = require('passport')

router.route('/')
    .post(quizController.createQuizRoom)
    .delete(quizController.deleteQuizRoom)
router.route('/join')
    .post(quizController.enterQuizRoom)
router.route('/questions')
    .post(quizController.getAllQuestion)
router.route('/end')
    .post(quizController.endQuiz)
router.route('/:id')
    .get(quizController.getAllGroups)
    .post(groupController.createNewGroup)
router.route('/:id/users')
    .get(quizController.getAllUsersOfQuiz)



    
module.exports = router