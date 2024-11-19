const signupFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the signup form
  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  // Validate input fields
  if (!username || !email || !password) {
    alert('Please fill out all fields.');
    return;
  }

  try {
    // Send a POST request to the signup API endpoint
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // Redirect to the profile page on success
      document.location.replace('/profile');
    } else {
      const errorData = await response.json();
      console.error('Error:', errorData);
      alert(errorData.message || 'Failed to sign up. Please check your details and try again.');
    }
  } catch (err) {
    console.error('Error during signup:', err);
    alert('An unexpected error occurred while signing up. Please try again later.');
  }
};

// Attach event listener to the signup form
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);