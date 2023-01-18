const router = require('express').Router();
const {
  getComments,
  getSingleComment,
  createComment,
  deleteComment,
  updatePost,
  addReaction,
  removeReaction,
} = require('../../controllers/commentController');

// /api/comments
router.route('/').get(getComments).post(createComment);

// /api/comments/:commentId
router.route('/:id').get(getSingleComment).delete(deleteComment).put(updatePost);

// /api/comments/:thoughtId/reactions
router.route('/:id/reactions').post(addReaction);
router.route('/:id/reactions/:reactionId').delete(removeReaction);

module.exports = router;
