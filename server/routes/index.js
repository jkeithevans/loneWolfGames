const express = require('express');
const controller = require('../controllers/controller');
const router = express.Router();

router.route('/users/:userdata')
  .get(controller.readUser)
  
router.route('/users')
  .post(controller.createUser)
  .put(controller.updateUser)

router.route('/games/:game')
  .get(controller.readGame);

module.exports = router;