const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // Validate input fields
  if (!email || !password) {
    alert('Please enter both email and password.');
    return;
  }

  try {
    // Send a POST request to the login API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // Redirect to the profile page on successful login
      document.location.replace('/profile');
    } else {
      const errorData = await response.json();
      console.error('Error:', errorData);
      alert(errorData.message || 'Failed to log in. Please check your email and password.');
    }
  } catch (err) {
    console.error('Error logging in:', err);
    alert('An unexpected error occurred while logging in. Please try again later.');
  }
};

// Attach event listener to the login form
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);