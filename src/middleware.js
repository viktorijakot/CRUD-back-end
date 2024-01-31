const jwt = require('jsonwebtoken');
const APIError = require('./apiErrors/apiErrors');
const { jwtSecret } = require('./config');

const mainErrorHandler = (errorGot, req, res, next) => {
  console.log('errorGot ===', errorGot);

  // patikrinti ar atkeliaves error yra instance APIError
  if (errorGot instanceof APIError) {
    return res.status(errorGot.status).json({
      error: errorGot.message,
    });
  }

  res.status(500).json({
    error: 'Internal system error',
  });
};

const validateJwtToken = async (req, resp, next) => {
  const token = req.header('Authorization');
  if (!token) return resp.status(401).json({ error: 'Access denied' });

  if (!jwtSecret) return resp.status(401).json({ error: 'JWT not provided' });

  try {
    jwt.verify(token, jwtSecret);
    next();
  } catch (error) {
    console.log('error ===', error);
  }
};

module.exports = {
  mainErrorHandler,
  validateJwtToken,
};
