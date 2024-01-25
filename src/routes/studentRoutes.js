const express = require('express');
const studentController = require('../controllers/studentController');

const studentRouter = express.Router();

studentRouter.get('/students', studentController.all);
studentRouter.get('/students/:studentId', studentController.single);
studentRouter.post('/students', studentController.create);
studentRouter.put('/students/:studentId', studentController.update);
studentRouter.delete('/students/:studentId', studentController.delete);

module.exports = studentRouter;
