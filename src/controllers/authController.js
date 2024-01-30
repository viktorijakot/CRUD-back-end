const register = async (req, res, next) => {
  const { email, password } = req.body;

  console.log('req.body ===', req.body);
};

module.exports = {
  register,
};
