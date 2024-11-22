const withAuth = (req, res, next) => {
  // Check if the user is logged in
  if (!req.session || !req.session.logged_in) {
    console.log('Unauthorized access attempt detected'); // Debugging log
    return res.redirect('/login'); // Redirect unauthenticated users to login
  }

  console.log(`Authenticated user: ${req.session.user_id}`); // Debugging log
  next(); // Proceed to the next middleware or route
};

module.exports = withAuth;
