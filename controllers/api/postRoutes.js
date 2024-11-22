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

    res.status(200).json(postData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Like a post
router.put('/:id/like', withAuth, async (req, res) => {
  try {
    // Increment the 'likes' column for the specified post
    const post = await Post.increment('likes', {
      where: { id: req.params.id },
    });

    // Fetch the updated post to get the current likes count
    const updatedPost = await Post.findByPk(req.params.id, {
      attributes: ['likes'],
    });

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    // Return the updated likes count
    res.status(200).json({ likes: updatedPost.likes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to like the post.' });
  }
});

module.exports = router;
