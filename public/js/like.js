// Attach event listeners to all like buttons
document.querySelectorAll('.like-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const postId = btn.getAttribute('data-id');
  
      try {
        const response = await fetch(`/api/posts/${postId}/like`, {
          method: 'PUT',
        });
  
        if (response.ok) {
          // Reload the page to update like count
          location.reload();
        } else {
          const errorData = await response.json();
          console.error('Error liking post:', errorData);
          alert('Failed to like post.');
        }
      } catch (err) {
        console.error('Error:', err);
        alert('An error occurred while liking the post.');
      }
    });
  });
  