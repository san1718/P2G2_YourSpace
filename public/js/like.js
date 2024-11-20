// Attach event listeners to all like buttons
document.querySelectorAll('.like-btn').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const postId = btn.getAttribute('data-id');

    // This will Disable the button to prevent multiple clicks
    btn.disabled = true;
    btn.innerHTML = 'Liking...'; // Optional: change button text to show action

    try {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: 'PUT',
      });

      if (response.ok) {
        // This chunk will Update the like count dynamically
        const data = await response.json();
        const likeCount = btn.querySelector('.like-count'); // Assume like count is a child element
        likeCount.innerHTML = data.newLikeCount; // Update like count with response data

        // This will change button state to show the post is liked
        btn.innerHTML = 'Liked';
        btn.disabled = false;
      } else {
        const errorData = await response.json();
        console.error('Error liking post:', errorData);
        alert('Failed to like post.');
        btn.disabled = false;
        btn.innerHTML = 'Like'; // Revert button text if the like fails
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred while liking the post.');
      btn.disabled = false;
      btn.innerHTML = 'Like'; // Revert button text on error
    }
  });
});
