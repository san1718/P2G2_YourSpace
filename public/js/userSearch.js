document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('username');
  const searchResultsContainer = document.getElementById('search-results');

  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const query = searchInput.value.trim();

    try {
      const response = await fetch(`/search?username=${encodeURIComponent(query)}`);
      const html = await response.text();

      const parser = new DOMParser();
      const newDoc = parser.parseFromString(html, 'text/html');
      const newResults = newDoc.querySelector('#search-results');

      searchResultsContainer.innerHTML = newResults.innerHTML;
    } catch (err) {
      console.error('Error fetching search results:', err);
      searchResultsContainer.innerHTML = '<p class="text-center text-danger">An error occurred. Please try again later.</p>';
    }
  });
});