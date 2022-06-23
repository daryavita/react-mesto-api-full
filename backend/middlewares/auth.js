const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');

const AuthError = require('../errors/Auth-err');

const generateToken = (payload) => jwt.sign(payload, NODE_ENV === 'production' ? JWT_SECRET : '12341234', { expiresIn: '7d' });

const isAuthorized = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    throw new AuthError('Требуется авторизация');
  }

  const token = auth.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : '12341234');
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
