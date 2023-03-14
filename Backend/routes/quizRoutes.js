const express = require('express');
const router = express.Router()
const quizController = require('../controllers/quizController');
const groupController = require('../controllers/groupController');

router.route('/')
    .post(quizController.createQuizRoom)
    .delete(quizController.deleteQuizRoom)
router.route('/:id')
    .post(quizController.enterQuizRoom)
    .get(quizController.getAllGroups)
    .post(groupController.createNewGroup)
router.route('questions/:id')
    .get(quizController.getAllQuestion)

module.exports = router