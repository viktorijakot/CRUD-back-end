const bcrypt = require('bcrypt');
const { executeQuery } = require('../helpers');

const register = async (req, res, next) => {
  const { email, password } = req.body;

  const passwordHash = bcrypt.hashSync(password, 10);

  const sql = 'INSERT INTO user (email, password, scope) VALUES (?,?, "manager")';

  const [respObj, error] = await executeQuery(sql, [email, passwordHash]);

  if (error) {
    console.log('error register user ===');
    next(error);
  }
  if (respObj.affectedRows === 1) {
    res.status(201).json({
      msg: 'User is created',
      id: respObj.insertId,
    });
  }
  res.end();
};

module.exports = {
  register,
};
