const express = require('express');

const userRouter = express.Router();
const userController = require('../controllers/userController');

// GET /api/user Gauti visa sarasa
userRouter.get('/user', userController.all);

// GET /api/user/:id Gauti viena vartotoja pagal ID
userRouter.get('/user/:id', userController.single);

// POST  /api/user Irasyti vartotoja
userRouter.post('/user', userController.create);

// PUT /api/user/:id Vartotojo duomenu atnaujinimas pagal nurodyta jo id
userRouter.put('/user/:id', userController.update);

// DELETE /api/user/:id Vartotojo istrinimas pagal nurodyta jo id
userRouter.delete('/user/:id', userController.delete);

module.exports = userRouter;
