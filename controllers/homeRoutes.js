const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Render homepage with posts or welcome message
router.get('/', async (req, res) => {
  try {
    if (req.session.logged_in) {
      const postData = await Post.findAll({
        include: [{ model: User, attributes: ['username'] }],
        order: [['created_at', 'DESC']],
      });

      const posts = postData.map((post) => post.get({ plain: true }));

      return res.render('homepage', {
        posts,
        logged_in: true,
      });
    } else {
      return res.render('homepage', {
        logged_in: false,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Render login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    return res.redirect('/profile');
  }
  res.render('login');
});

// Render signup page
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    return res.redirect('/profile');
  }
  res.render('signup');
});

// Render profile page (protected)
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Render profile edit page (protected)
router.get('/profile/edit', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id);

    const user = userData.get({ plain: true });

    res.render('editProfile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Search for users
router.get('/search', async (req, res) => {
  try {
    const { username } = req.query; // Expect a query parameter like ?username=john
    const userData = await User.findAll({
      where: {
        username: username ? username : '', // Adjust filtering logic as needed
      },
    });

    const users = userData.map((user) => user.get({ plain: true }));

    res.render('userSearch', {
      users,
      logged_in: req.session.logged_in || false,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
