const express = require('express');
const router = express.Router()
const groupController = require('../controllers/groupController');

router.route('/')
    .get(groupController.getAllGroups)
    .delete(groupController.deleteGroup)
    .patch(groupController.updatePoints)
router.route('/users')
    .get(groupController.getAllUserOfGroup)

module.exports = router