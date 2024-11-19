const withAuth = (req, res, next) => {
  // Check if the user is logged in
  if (!req.session || !req.session.logged_in) {
    // Redirect to the login page if not authenticated
    return res.redirect('/login');
  }
  // Proceed to the next middleware or route if authenticated
  next();
};

module.exports = withAuth;