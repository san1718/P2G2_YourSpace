document.querySelectorAll('.like-btn').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const postId = btn.getAttribute('data-id');

    // Disable the button to prevent multiple clicks
    btn.disabled = true;
    btn.innerHTML = 'Liking...';

    try {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: 'PUT',
      });

      if (response.ok) {
        const data = await response.json();
        // Update button text dynamically with new like count
        btn.innerHTML = `Liked (${data.likes})`;
      } else {
        const errorData = await response.json();
        console.error('Error liking post:', errorData);
        alert('Failed to like post. Please try again.');
        btn.innerHTML = 'Like';
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred while liking the post.');
      btn.innerHTML = 'Like';
    } finally {
      btn.disabled = false;
    }
  });
});
