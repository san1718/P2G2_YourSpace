document.querySelector('.edit-profile-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
  
    try {
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        body: formData,
      });
  
      if (response.ok) {
        alert('Profile updated successfully!');
        window.location.replace('/profile');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to update profile.');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('An unexpected error occurred.');
    }
  });