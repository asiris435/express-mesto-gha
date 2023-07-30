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
});

module.exports = mongoose.model('card', cardSchema);
