const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      content: req.body.content,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed to create post.' });
  }
});

// Delete a post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      return res.status(404).json({ message: 'No post found with this id!' });
    }

    res.status(200).json({ message: 'Post deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete the post.' });
  }
});

// Like a post (track likes per user session)
router.post('/:id/like', withAuth, async (req, res) => {
  try {
    const postId = req.params.id;

    // Initialize the liked posts structure in the session if not already present
    if (!req.session.likedPosts) {
      req.session.likedPosts = {};
    }

    // Check if the user has already liked the post
    if (req.session.likedPosts[postId]) {
      return res.status(400).json({ message: 'You have already liked this post.' });
    }

    // Increment the likes count for the post
    const post = await Post.increment('likes', {
      where: { id: postId },
    });

    // Fetch the updated post to get the current likes count
    const updatedPost = await Post.findByPk(postId, {
      attributes: ['likes'],
    });

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    // Mark the post as liked in the session
    req.session.likedPosts[postId] = true;

    res.status(200).json({ likes: updatedPost.likes, message: 'Post liked successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to like the post.' });
  }
});

module.exports = router;