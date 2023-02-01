const Joi = require('joi');
const { Users, Login } = require('../models');

const loginSchema = Joi.object({
  email: Joi.string().email().required().not()
.empty(),
  password: Joi.string().length(6).required().not()
.empty(),
});

const validateLogin = async (email, password) => {
  const { error } = loginSchema.validate({ email, password });

  if (error) throw error;

  const valid = await Users.findOne({ where: { email } });

  if (!valid || valid.password !== password) {
    const error1 = { status: 400, message: 'Invalid fields' };
    throw error1;
  }
};

const addLogin = async (email, password) => {
  await Login.create({ email, password });
};

module.exports = {
  validateLogin,
  addLogin,
};
