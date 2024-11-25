const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const { Op } = require('sequelize');

// Render homepage with posts or welcome message
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        { model: User, attributes: ['username'] },
        {
          model: Comment,
          include: [{ model: User, attributes: ['username'] }],
        },
      ],
      order: [['created_at', 'DESC']],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    // Debugging: Log the posts and their comments
    console.log('Fetched Posts with Comments:', JSON.stringify(posts, null, 2));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in || false,
    });
  } catch (err) {
    console.error('Error fetching homepage data:', err);
    res.status(500).json({ message: 'Failed to load homepage.' });
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
      include: [
        {
          model: Post,
          include: [
            {
              model: Comment,
              include: [{ model: User, attributes: ['username'] }],
            },
          ],
        },
      ],
    });

    if (!userData) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const user = userData.get({ plain: true });

    // Debugging: Log the user and their posts
    console.log('Fetched User Profile:', JSON.stringify(user, null, 2));

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    console.error('Error fetching profile data:', err);
    res.status(500).json({ message: 'Failed to load profile.' });
  }
});

// Render profile edit page (protected)
router.get('/profile/edit', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id);

    if (!userData) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const user = userData.get({ plain: true });

    // Debugging: Log the user data for editing
    console.log('Editing User Profile:', JSON.stringify(user, null, 2));

    res.render('editProfile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    console.error('Error fetching edit profile data:', err);
    res.status(500).json({ message: 'Failed to load edit profile page.' });
  }
});

// Search for users
router.get('/search', async (req, res) => {
  try {
    const { username } = req.query;

    const users = await User.findAll({
      where: username
        ? {
            username: {
              [Op.iLike]: `%${username}%`,
            },
          }
        : {},
      attributes: ['id', 'username', 'email', 'profile_picture'],
    });

    const userList = users.map((user) => user.get({ plain: true }));

    // Debugging: Log the search results
    console.log('Search Results:', JSON.stringify(userList, null, 2));

    res.render('userSearch', {
      users: userList,
      logged_in: req.session.logged_in || false,
    });
  } catch (err) {
    console.error('Error searching for users:', err);
    res.status(500).json({ message: 'Failed to fetch users.' });
  }
});

// Render a specific user's profile
router.get('/profile/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [
        {
          model: Post,
          include: [
            {
              model: Comment,
              include: [{ model: User, attributes: ['username'] }],
            },
          ],
        },
      ],
    });

    if (!userData) {
      return res.status(404).json({ message: 'User not found!' });
    }

    const user = userData.get({ plain: true });

    // Debugging: Log the specific user profile
    console.log('Fetched User Profile with Posts:', JSON.stringify(user, null, 2));

    res.render('user', {
      ...user,
      logged_in: req.session.logged_in || false,
    });
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ message: 'Failed to load profile.' });
  }
});

module.exports = router;
