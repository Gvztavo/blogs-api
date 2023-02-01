const express = require('express');
const { newLogin } = require('../controllers/loginsController');

const loginsRouter = express.Router();

loginsRouter.post('/', newLogin);

module.exports = loginsRouter;
