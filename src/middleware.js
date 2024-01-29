const APIError = require('./apiErrors/apiErrors');

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

module.exports = {
  mainErrorHandler,
};
