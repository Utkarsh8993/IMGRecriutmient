const express = require('express');
const router = express.Router()
const quizController = require('../controllers/quizController');

router.route('/')
    .post(quizController.createQuizRoom)
    .delete(quizController.deleteQuizRoom)
router.route('/join')
    .post(quizController.enterQuizRoom)

module.exports = router