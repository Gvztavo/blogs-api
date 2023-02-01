const { 
  verifyUser, 
  addUser, 
  findUserByEmail, 
  findAllUsers, 
  findUserById,
  eraseUser, 
} = require('../services/usersService');

const { generateToken } = require('../middlewares/auth');

const newUser = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
    verifyUser(displayName, email, password, image);

    await findUserByEmail(email);

    await addUser(displayName, email, password, image);

    const token = generateToken(email);

    return res.status(201).json({ token });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const listAllUsers = async (req, res, next) => {
  try {
    const result = await findAllUsers();

    return res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const listUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await findUserById(id);

    return res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { email } = req;
    await eraseUser(email);

    return res.status(204).json({});
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

module.exports = {
  newUser,
  listAllUsers,
  listUserById,
  deleteUser,
};
