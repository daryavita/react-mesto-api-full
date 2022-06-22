const bcrypt = require('bcrypt');

const { generateToken } = require('../middlewares/auth');

const User = require('../models/user');
const ValidationError = require('../errors/Validation-err');
const NotFoundError = require('../errors/Not-found-err');
const ConflictError = require('../errors/Conflict-err');
const AuthError = require('../errors/Auth-err');

const saltRounds = 10;
const MONGO_DUPLICATE_KEY_CODE = 11000;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      next(err);
    });
};

const getUser = (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному id не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

const getUserProfile = (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => res.send(user))
    .catch((err) => {
      next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (!email || !password) {
    throw new ValidationError('Email и пароль обязательны');
  }

  bcrypt.hash(password, saltRounds).then((hash) => {
    User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user) => {
        const resUser = {
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
          _id: user._id,
        };

        res.send(resUser);
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new ValidationError('Некорректные данные при создании пользователя'));
        }
        if (err.code === MONGO_DUPLICATE_KEY_CODE) {
          return next(new ConflictError('Этот email уже зарегистрирован'));
        }
        return next(err);
      });
  })
    .catch((err) => {
      next(err);
    });
};

const updateUser = (req, res, next) => {
  const { id } = req.user;
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному id не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Некорректные данные при обновлении пользователя'));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const { id } = req.user;
  const { avatar } = req.body;

  User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному id не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Некорректные данные при обновлении пользователя'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Email или пароль неверный');
      }

      const isPasswordValid = bcrypt.compare(password, user.password);

      return Promise.all([isPasswordValid, user]);
    })
    .then(([isPasswordValid, user]) => {
      if (!isPasswordValid) {
        throw new AuthError('Email или пароль неверный');
      }
      return generateToken({ id: user._id });
    })
    .then((token) => res.send({ token }))
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
  login,
  getUserProfile,
};
