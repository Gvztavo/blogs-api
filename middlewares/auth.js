const jwt = require('jsonwebtoken');

const secret = '@p!-B0g&Pr0j3ct';

const generateToken = (email) => {
  const jwtConfig = {
    expiresIn: 3600,
    algorithm: 'HS256',
  };

  const token = jwt.sign({ email }, secret, jwtConfig);

  return token;
};

const validateToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      const error = { status: 401, message: 'Token not found' };
      throw error;
    }
    const { email } = jwt.verify(authorization, secret);

    req.email = email;

    next();
  } catch (error) {
    console.error(error.message);
    if (error.message === 'jwt malformed' || error.message === 'invalid signature') {
      const error1 = { status: 401, message: 'Expired or invalid token' };
      next(error1);
    }
    next(error);
  }
};

module.exports = {
  generateToken,
  validateToken,
};
