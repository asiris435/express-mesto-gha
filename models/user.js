const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Вы пропустили это поле.'],
    minlength: [2, 'Минимальное количество символов - 2.'],
    maxlength: [30, 'Максимальное количество символов - 30.'],
  },
  about: {
    type: String,
    required: [true, 'Вы пропустили это поле.'],
    minlength: [2, 'Минимальное количество символов - 2.'],
    maxlength: [30, 'Максимальное количество символов - 30.'],
  },
  avatar: {
    type: String,
    required: [true, 'Вы пропустили это поле.'],
    validate: {
      validator(url) {
        return /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(url);
      },
      message: 'Неправильный URL.',
    },
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
