const router = require('express').Router();
const { User } = require('../../models');

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    // Create a new user with the data from the request body
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // Save the user's session
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      res.status(200).json({ message: 'Signup successful!', user: newUser });
    });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(400).json({ message: 'Failed to sign up. Please ensure the data is correct.' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    // Find a user by email
    const user = await User.findOne({ where: { email: req.body.email } });

    // Check if the user exists and the password matches
    if (!user || !(await user.checkPassword(req.body.password))) {
      return res.status(400).json({ message: 'Incorrect email or password.' });
    }

    // Save the user's session
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;

      res.status(200).json({ message: 'Login successful!', user });
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Failed to log in. Please try again later.' });
  }
});

// Logout Route
router.post('/logout', (req, res) => {
  // Destroy the session if the user is logged in
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).json({ message: 'No user is logged in.' });
  }
});

module.exports = router;