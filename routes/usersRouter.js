const express = require('express');
const { 
  newUser, 
  listAllUsers, 
  listUserById, 
  deleteUser, 
} = require('../controllers/usersController');
const { validateToken } = require('../middlewares/auth');

const usersRouter = express.Router();

usersRouter.post('/', newUser);

usersRouter.get('/', validateToken, listAllUsers);

usersRouter.get('/:id', validateToken, listUserById);

usersRouter.delete('/me', validateToken, deleteUser);

module.exports = usersRouter;