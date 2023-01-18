const router = require('express').Router();
const {
  getComments,
  getSingleComment,
  createComment,
  deleteComment,
} = require('../../controllers/commentController');

// /api/comments
router.route('/').get(getComments).post(createComment).delete(deleteComment);

// /api/comments/:commentId
router.route('/:commentId').get(getSingleComment);

module.exports = router;
