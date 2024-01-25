const express = require('express');
const studentController = require('../controllers/studentController');

const studentRouter = express.Router();

studentRouter.get('/students', studentController.all);

module.exports = studentRouter;
