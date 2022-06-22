const mongoose = require('mongoose');
const { isEmail } = require('validator');
const { validateURL } = require('../middlewares/errors');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: validateURL,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, { message: 'Некорректный email' }],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
