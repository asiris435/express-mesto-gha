const Card = require('../models/card');

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      Card.findById(card._id)
        .populate('owner')
        .then((data) => res.status(201).send(data))
        .catch(() => res.status(404).send({ message: 'Карточка не найдена.' }));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка.' });
      }
    });
};

const getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка.' }));
};

const deleteCard = (req, res) => {
  if (req.params.cardId.length === 24) {
    Card.findByIdAndRemove(req.params.cardId)
      .orFail()
      .then(() => {
        res.send({ message: 'Карточка удалена.' });
      })
      .catch(() => res.status(404).send({ message: 'Карточка не найдена.' }));
  } else {
    res.status(400).send({ message: 'Некорректный id карточки.' });
  }
};

const likedCard = (req, res) => {
  if (req.params.cardId.length === 24) {
    Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
      .populate(['owner', 'likes'])
      .orFail()
      .then((card) => {
        res.send(card);
      })
      .catch(() => res.status(404).send({ message: 'Карточка не найдена.' }));
  } else {
    res.status(400).send({ message: 'Некорректный id карточки.' });
  }
};

const dislikedCard = (req, res) => {
  if (req.params.cardId.length === 24) {
    Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
      .populate(['owner', 'likes'])
      .orFail()
      .then((card) => {
        res.send(card);
      })
      .catch(() => res.status(404).send({ message: 'Карточка с указанным _id не найдена.' }));
  } else {
    res.status(400).send({ message: 'Некорректный id карточки.' });
  }
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  likedCard,
  dislikedCard,
};
