module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  startsWith: (str, prefix) => {
    return str.startsWith(prefix);
  }
};
