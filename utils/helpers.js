module.exports = {
  format_date: (date) => {
    // Safeguard against invalid dates
    if (!date) return '';
    // Format date as MM/DD/YYYY
    return new Date(date).toLocaleDateString();
  },
  format_amount: (amount) => {
    // Safeguard against invalid or non-numeric inputs
    if (isNaN(amount)) return '0';
    // Format large numbers with commas
    return parseInt(amount, 10).toLocaleString();
  },
  get_emoji: () => {
    const randomNum = Math.random();

    // Return a random emoji
    if (randomNum > 0.7) {
      return `<span for="img" aria-label="lightbulb">💡</span>`;
    } else if (randomNum > 0.4) {
      return `<span for="img" aria-label="laptop">💻</span>`;
    } else {
      return `<span for="img" aria-label="gear">⚙️</span>`;
    }
  },
};