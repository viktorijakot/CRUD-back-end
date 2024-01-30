const express = require('express');
const authController = require('../controllers/authController');

const authRouter = express.Router();

authRouter.post('/auth/register', authController.register);

authRouter.post('/auth/login', authController.login);

module.exports = authRouter;
