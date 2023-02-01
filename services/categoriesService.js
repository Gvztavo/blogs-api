const Joi = require('joi');
const { Categories } = require('../models');

const categoriesSchema = Joi.object({
  name: Joi.string().required(),
});

const validateCategories = (name) => {
  const { error } = categoriesSchema.validate({ name });
  if (error) throw error;
};

const addCategories = async (name) => {
  const categories = await Categories.create({ name });

  return categories;
};

const getAllCategories = async () => {
  const categories = await Categories.findAll();

  return categories;
};

const categoriesExist = async (categoryIds) => {
  await Promise.all(categoryIds.map(async (category) => {
    const categoryId = await Categories.findByPk(category);
    if (!categoryId) {
      const error1 = { status: 400, message: '"categoryIds" not found' };
      throw error1;
    }
  }));
};

module.exports = {
  validateCategories,
  categoriesExist,
  addCategories,
  getAllCategories,
};
