const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { executeQuery } = require('../helpers');
const APIError = require('../apiErrors/apiErrors');
const { jwtSecret } = require('../config');

const register = async (req, res, next) => {
  const { email, password } = req.body;

  const passwordHash = bcrypt.hashSync(password, 10);

  const sql = 'INSERT INTO user (email, password, scope) VALUES (?,?, "manager")';

  const [respObj, error] = await executeQuery(sql, [email, passwordHash]);

  if (error) {
    console.log('error register user ===');
    return next(error);
  }
  if (respObj.affectedRows === 1) {
    res.status(201).json({
      msg: 'User is created',
      id: respObj.insertId,
    });
  }

  res.end();
};

const login = async (req, resp, next) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM user WHERE email=?';
  const [resObj, error] = await executeQuery(sql, [email]);

  if (error) {
    console.log('error login ===');
    return next(error);
  }
  if (resObj.length === 0) {
    return next(new APIError('User not found', 400));
  }

  const userFound = resObj[0];

  const hashPassword = userFound.password;

  if (!bcrypt.compareSync(password, hashPassword)) {
    return next(new APIError('Password or email not match', 401));
  }
  const token = jwt.sign({
    email: userFound.email,
    id: userFound.id,
    scope: userFound.scope,
  }, jwtSecret, {
    expiresIn: '1h',
  });
  resp.json({
    msg: 'Login success',
    token,
  });
};

module.exports = {
  register,
  login,
};
