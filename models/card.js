const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Вы пропустили это поле.'],
    minlength: [2, 'Минимальное количество символов - 2.'],
    maxlength: [30, 'Максимальное количество символов - 30.'],
  },
  link: {
    type: String,
    required: [true, 'Вы пропустили это поле.'],
    validate: {
      validator(url) {
        return /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(url);
      },
      message: 'Неправильный URL.',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Вы пропустили это поле.'],
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);
