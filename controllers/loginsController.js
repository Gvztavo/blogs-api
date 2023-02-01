const { generateToken } = require('../middlewares/auth');
const { validateLogin, addLogin } = require('../services/loginsServices');

const newLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await validateLogin(email, password);

    await addLogin(email, password);
    const token = generateToken(email);

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

module.exports = {
  newLogin,
};
