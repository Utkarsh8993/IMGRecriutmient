const express = require('express');
const router = express.Router()
const groupController = require('../controllers/groupController');

router.route('/')
    .get(groupController.getAllgroup)
    .post(groupController.createNewgroup)

    