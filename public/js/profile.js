const newFormHandler = async (event) => {
  event.preventDefault();

  // Get post content from the form
  const content = document.querySelector('#post-content').value.trim();

  if (content) {
    try {
      // Send a POST request to the API to create a new post
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Reload the profile page after successful creation
        document.location.replace('/profile');
      } else {
        const err = await response.json();
        console.log(err);
        alert('Failed to create post. Please try again.');
      }
    } catch (err) {
      console.error('Error creating post:', err);
      alert('An error occurred while creating the post.');
    }
  } else {
    alert('Please enter content for your post.');
  }
};

const delButtonHandler = async (event) => {
  // Check if the delete button was clicked
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    try {
      // Send a DELETE request to the API to remove the post
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Reload the profile page after successful deletion
        document.location.replace('/profile');
      } else {
        const err = await response.json();
        console.log(err);
        alert('Failed to delete post. Please try again.');
      }
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('An error occurred while deleting the post.');
    }
  }
};

// Attach event listeners
document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.post-list')
  .addEventListener('click', delButtonHandler);