document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('username');
  const searchResultsContainer = document.getElementById('search-results');

  // Fetch and update search results
  const fetchAndUpdateResults = async (query = '') => {
    try {
      const response = await fetch(`/search?username=${encodeURIComponent(query)}`);
      if (response.ok) {
        const html = await response.text();

        // Parse the returned HTML and update the results container
        const parser = new DOMParser();
        const newDoc = parser.parseFromString(html, 'text/html');
        const newResults = newDoc.querySelector('#search-results');

        searchResultsContainer.innerHTML = newResults.innerHTML;
      } else {
        console.error('Failed to fetch search results.');
        searchResultsContainer.innerHTML = '<p class="text-center text-danger">Failed to load search results.</p>';
      }
    } catch (err) {
      console.error('Error fetching search results:', err);
      searchResultsContainer.innerHTML = '<p class="text-center text-danger">An error occurred. Please try again later.</p>';
    }
  };

  // Fetch all users on page load
  fetchAndUpdateResults();

  // Add event listener for search form submission
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = searchInput.value.trim();
    fetchAndUpdateResults(query);
  });
});