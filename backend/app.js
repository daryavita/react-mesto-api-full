require('dotenv').config();
const express = require('express');

const { PORT = 3001 } = process.env;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const { validateURL, putError } = require('./middlewares/errors');
const NotFoundError = require('./errors/Not-found-err');
const { userRouter } = require('./routes/users');
const { cardRouter } = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const { isAuthorized } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// const corsOptions = {
//   origin: [
//     'http://localhost:3000',
//     'http://mesto.daryavita.nomoredomains.xyz',
//     'https://mesto.daryavita.nomoredomains.xyz',
//   ],
//   optionsSuccessStatus: 200,
// };

app.options('*', cors());

app.use(helmet());
// app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(validateURL),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);
app.use('/users', isAuthorized, userRouter);
app.use('/cards', isAuthorized, cardRouter);

app.use(errorLogger);

app.use(isAuthorized, (req, res, next) => next(new NotFoundError('Такая страница не найдена')));

app.use(errors());

app.use(putError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
