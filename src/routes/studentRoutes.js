const express = require('express');
const studentController = require('../controllers/studentController');
const { validateJwtToken } = require('../middleware');

const studentRouter = express.Router();

studentRouter.get('/students', studentController.all);
studentRouter.get('/students/:studentId', studentController.single);
studentRouter.post('/students', validateJwtToken, studentController.create);
studentRouter.put('/students/:studentId', validateJwtToken, studentController.update);
studentRouter.delete('/students/:studentId', validateJwtToken, studentController.delete);

module.exports = studentRouter;
