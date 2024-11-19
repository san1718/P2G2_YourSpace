const logout = async () => {
  try {
    // Send a POST request to the logout API endpoint
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // Redirect to the login page after successful logout
      document.location.replace('/login');
    } else {
      const errorData = await response.json();
      console.error('Error:', errorData);
      alert(errorData.message || 'Failed to log out. Please try again.');
    }
  } catch (err) {
    console.error('Error during logout:', err);
    alert('An unexpected error occurred while logging out. Please try again later.');
  }
};

// Attach event listener to the logout button
document.querySelector('#logout').addEventListener('click', logout);