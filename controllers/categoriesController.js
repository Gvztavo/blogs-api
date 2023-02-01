const { 
  validateCategories, 
  addCategories, 
  getAllCategories, 
} = require('../services/categoriesService');

const newCategorie = async (req, res, next) => {
  try {
    const { name } = req.body;
    validateCategories(name);

    const result = await addCategories(name);

    return res.status(201).json(result);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const listAllCategories = async (req, res, next) => {
  try {
    const result = await getAllCategories();

    return res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

module.exports = {
  newCategorie,
  listAllCategories,
}; 
