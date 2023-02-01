const express = require('express');
const { newCategorie, listAllCategories } = require('../controllers/categoriesController');
const { validateToken } = require('../middlewares/auth');

const categoriesRouter = express.Router();

categoriesRouter.post('/', validateToken, newCategorie);

categoriesRouter.get('/', validateToken, listAllCategories);

module.exports = categoriesRouter;
