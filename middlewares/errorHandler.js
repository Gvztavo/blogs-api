const errorHandler = (err, req, res, _next) => {
  const { message } = err;
  if (message === 'jwt expired') {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  if (err.status) return res.status(err.status).json({ message: err.message });

  if (err.details) return res.status(400).json({ message: err.details[0].message });

  return res.status(500).json({ message: 'Internal Error' });
};

module.exports = errorHandler;
