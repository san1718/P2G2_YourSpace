const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/uploads')); // Save files in public/uploads
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Rename file with timestamp
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/; // Allowed file types
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extname && mimeType) {
      return cb(null, true);
    } else {
      cb(new Error('Only images are allowed!'));
    }
  },
});

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      res.status(200).json(newUser);
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed to sign up. Please try again.' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user || !(await user.checkPassword(req.body.password))) {
      return res.status(400).json({ message: 'Incorrect email or password!' });
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;

      res.status(200).json({ message: 'Login successful!', user });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to log in. Please try again later.' });
  }
});

// Logout Route
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).json({ message: 'No user is logged in.' });
  }
});

// Fetch Logged-In User Profile
router.get('/profile', withAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch user profile.' });
  }
});

// Update Profile (with file upload)
router.put('/profile', withAuth, upload.single('profile_picture'), async (req, res) => {
  try {
    const updates = {
      username: req.body.username,
      email: req.body.email,
    };

    if (req.file) {
      updates.profile_picture = `/uploads/${req.file.filename}`;
    }

    const [updatedRows] = await User.update(updates, {
      where: { id: req.session.user_id },
    });

    if (!updatedRows) {
      return res.status(404).json({ message: 'User not found!' });
    }

    res.status(200).json({ message: 'Profile updated successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update profile. Please try again later.' });
  }
});

// Fetch All Users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'email', 'profile_picture'],
    });

    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch users.' });
  }
});

module.exports = router;
