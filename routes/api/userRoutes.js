const router = require('express').Router();
const {
  getUsers,
  getUserById,
  NewUser,
  updateUser,
  removeUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(NewUser);
router.route ('/:userId').get(getUserById).put(updateUser).delete(removeUser);
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
 