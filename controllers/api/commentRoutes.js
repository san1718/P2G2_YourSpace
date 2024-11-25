const router = require('express').Router();
const { Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    const { comment, post_id } = req.body;

    if (!comment || !post_id) {
      return res.status(400).json({ message: 'Comment content and post ID are required.' });
    }

    const newComment = await Comment.create({
      comment,
      post_id,
      user_id: req.session.user_id,
    });

    // Fetch the full comment with the user info
    const fullComment = await Comment.findByPk(newComment.id, {
      include: [{ model: User, attributes: ['username'] }],
    });

    res.status(200).json(fullComment);
  } catch (err) {
    console.error('Error creating comment:', err);
    res.status(500).json({ message: 'Failed to create comment.' });
  }
});

// Get all comments for a specific post
router.get('/post/:post_id', async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { post_id: req.params.post_id },
      include: [{ model: User, attributes: ['username'] }],
      order: [['created_at', 'ASC']],
    });

    res.status(200).json(comments);
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ message: 'Failed to fetch comments.' });
  }
});

// Delete a comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const comment = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id, // Ensure only the comment owner can delete it
      },
    });

    if (!comment) {
      return res.status(404).json({
        message: 'No comment found with this ID or you do not have permission to delete it.',
      });
    }

    res.status(200).json({ message: 'Comment deleted successfully.' });
  } catch (err) {
    console.error('Error deleting comment:', err);
    res.status(500).json({ message: 'Failed to delete comment.' });
  }
});

module.exports = router;
