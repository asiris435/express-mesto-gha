const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '64c603d18c6e56d1e62cabc5',
  };
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена.' });
});

app.listen(PORT);
