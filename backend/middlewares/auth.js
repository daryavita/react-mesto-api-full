const jwt = require('jsonwebtoken');

const AuthError = require('../errors/Auth-err');

const generateToken = (payload) => jwt.sign(payload, '12341234', { expiresIn: '7d' });

const isAuthorized = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    throw new AuthError('Требуется авторизация');
  }

  const token = auth.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, '12341234');
  } catch (e) {
    return next(new AuthError('Требуется авторизация'));
  }
  req.user = payload;
  return next();
};

module.exports = {
  generateToken,
  isAuthorized,
};
