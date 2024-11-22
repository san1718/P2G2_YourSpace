document.querySelector('.update-profile-pic-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  try {
    const response = await fetch('/api/users/profile', {
      method: 'PUT',
      body: formData,
    });

    if (response.ok) {
      alert('Profile picture uploaded successfully!');
      window.location.reload(); // Reload the page to display the updated profile picture
    } else {
      const error = await response.json();
      alert(error.message || 'Failed to upload profile picture.');
    }
  } catch (err) {
    console.error('Error uploading profile picture:', err);
    alert('An unexpected error occurred while uploading the profile picture.');
  }
});

// Adding support for creating posts
if (document.querySelector('.new-post-form')) {
  document.querySelector('.new-post-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const content = document.querySelector('#post-content').value.trim();

    if (!content) {
      alert('Please enter content for your post.');
      return;
    }

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Post created successfully!');
        window.location.reload(); // Reload the page to display the new post
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to create post.');
      }
    } catch (err) {
      console.error('Error creating post:', err);
      alert('An unexpected error occurred while creating the post.');
    }
  });
}

// Adding support for deleting posts
if (document.querySelector('.post-list')) {
  document.querySelector('.post-list').addEventListener('click', async (event) => {
    if (event.target.matches('.delete-btn')) {
      const postId = event.target.getAttribute('data-id');

      try {
        const response = await fetch(`/api/posts/${postId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Post deleted successfully!');
          window.location.reload(); // Reload the page to remove the deleted post
        } else {
          const error = await response.json();
          alert(error.message || 'Failed to delete post.');
        }
      } catch (err) {
        console.error('Error deleting post:', err);
        alert('An unexpected error occurred while deleting the post.');
      }
    }
  });
}
