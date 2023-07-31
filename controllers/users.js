const User = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка.' });
      }
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка.' }));
};

const getUserById = (req, res) => {
  if (req.params.userId.length === 24) {
    User.findById(req.params.userId)
      .orFail()
      .then((user) => {
        res.send(user);
      })
      .catch(() => res.status(404).send({ message: 'Пользователь не найден.' }));
  } else {
    res.status(400).send({ message: 'Некорректный id пользователя.' });
  }
};

const updateUserData = (req, res) => {
  const { name, about } = req.body;
  if (req.user._id) {
    User.findByIdAndUpdate(req.user._id, { name, about }, { new: 'true', runValidators: true })
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          res.status(400).send({ message: err.message });
        } else {
          res.status(404).send({ message: 'Пользователь не найден.' });
        }
      });
  } else {
    res.status(500).send({ message: 'На сервере произошла ошибка.' });
  }
};

const updateUserAvatar = (req, res) => {
  const avatar = req.body;
  if (req.user._id) {
    User.findByIdAndUpdate(req.user._id, avatar, { new: 'true', runValidators: true })
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          res.status(400).send({ message: err.message });
        } else {
          res.status(404).send({ message: 'Пользователь не найден.' });
        }
      });
  } else {
    res.status(500).send({ message: 'На сервере произошла ошибка.' });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserData,
  updateUserAvatar,
};
