document.querySelectorAll('.like-btn').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const postId = btn.getAttribute('data-id');

    // Prevent multiple clicks by disabling the button
    if (btn.disabled) return;

    btn.disabled = true;

    try {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST', // Changed to POST to match the route in postRoutes.js
      });

      if (response.ok) {
        const data = await response.json();

        // Update button appearance and text
        btn.innerHTML = `Liked (${data.likes})`;
        btn.style.backgroundColor = '#0056b3'; // Change to darker blue to indicate it's liked
        btn.style.borderColor = '#0056b3'; // Match border color
        btn.style.color = '#ffffff'; // Ensure text is readable
      } else {
        const errorData = await response.json();
        console.error('Error liking post:', errorData);
        alert(errorData.message || 'Failed to like post. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred while liking the post.');
    } finally {
      // Always re-enable the button after the operation
      btn.disabled = false;
    }
  });
});