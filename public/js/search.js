document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('.form-inline');
  const searchInput = searchForm.querySelector('input[name="username"]');
  const searchResultsContainer = document.querySelector('.list-group');

  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent page reload

    const query = searchInput.value.trim();

    if (!query) {
      alert('Please enter a username to search.');
      return;
    }

    try {
      // Fetch search results from the server
      const response = await fetch(`/search?username=${encodeURIComponent(query)}`);

      if (response.ok) {
        const html = await response.text();
        // Update the page with new results
        const parser = new DOMParser();
        const newDoc = parser.parseFromString(html, 'text/html');
        const newResults = newDoc.querySelector('.list-group');
        searchResultsContainer.innerHTML = newResults.innerHTML;
      } else {
        const error = await response.json();
        console.error('Search error:', error);
        alert(error.message || 'No users found.');
      }
    } catch (err) {
      console.error('Error fetching search results:', err);
      alert('An error occurred while fetching search results.');
    }
  });
});
