const createFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const name = document.querySelector('#cocktail-name').value.trim();
    const description = document.querySelector('#recipe-input').value.trim();
  
    if (name && description) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/recipes', {
        method: 'POST',
        body: JSON.stringify({ name, description }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
    .querySelector('#recipe-form')
    .addEventListener('submit', createFormHandler);