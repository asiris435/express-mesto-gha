const router = require('express').Router();
const {
  createCard, getCards, deleteCard, likedCard, dislikedCard,
} = require('../controllers/cards');

router.post('/', createCard);
router.get('/', getCards);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likedCard);
router.delete('/:cardId/likes', dislikedCard);

module.exports = router;
