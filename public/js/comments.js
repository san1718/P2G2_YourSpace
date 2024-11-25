document.addEventListener('DOMContentLoaded', () => {
    // Select all comment forms
    document.querySelectorAll('.new-comment-form').forEach((form) => {
      form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
  
        // Retrieve the post ID and the comment content
        const postId = form.getAttribute('data-id');
        const comment = form.querySelector('textarea[name="comment"]').value.trim();
  
        // Ensure the comment is not empty
        if (!comment) {
          alert('Please enter a comment before submitting.');
          return;
        }
  
        try {
          // Send a POST request to create the comment
          const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ post_id: postId, comment }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (response.ok) {
            // Clear the comment field
            form.querySelector('textarea[name="comment"]').value = '';
            // Optionally, reload the page or dynamically fetch new comments
            alert('Comment added successfully!');
            window.location.reload();
          } else {
            const error = await response.json();
            alert(error.message || 'Failed to add comment.');
          }
        } catch (err) {
          console.error('Error adding comment:', err);
          alert('An unexpected error occurred. Please try again.');
        }
      });
    });
  });
  