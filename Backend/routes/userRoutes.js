const express = require('express');
const router = express.Router()
const userController = require('../controllers/userController');

router.route('/')
    .get(userController.getAllUser)
    .post(userController.createNewUser)

router.route('/join')
    .post(userController.groupRequest)

router.route('/profile')
    .get(userController.getAllPropOfUser)

module.exports = router