const router = require('express').Router();
const {
  getUsers, getMeUser, getUserById, updateUserData, updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMeUser);
router.get('/:userId', getUserById);
router.patch('/me', updateUserData);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
