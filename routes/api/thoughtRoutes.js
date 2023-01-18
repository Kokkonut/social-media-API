const router = require('express').Router();
const {
  getComments,
  getSingleComment,
  createComment,
  deleteComment,
  updatePost,
} = require('../../controllers/commentController');

// /api/comments
router.route('/').get(getComments).post(createComment);

// /api/comments/:commentId
router.route('/:id').get(getSingleComment).delete(deleteComment).put(updatePost);

module.exports = router;
