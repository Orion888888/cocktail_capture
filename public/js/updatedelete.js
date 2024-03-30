const updateFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the update form
  const name = document.querySelector('#cocktail-name').value.trim();
  const description = document.querySelector('#recipe-input').value.trim();
  const id = parseInt(document.querySelector('#id').value.trim());


  try {
    if (name && description && id) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/recipes', {
        method: 'PUT',
        body: JSON.stringify({ name, description, id }),
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (err) {
    alert(response.err);
  }
};


const deleteFormHandler = async (event) => {
  if (confirm("Delete recipe?")) {
    event.preventDefault();

    // Collect hidden id value from the delete form
    const id = parseInt(document.querySelector('#id').value.trim());

    try {
      if (id) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/recipes', {
          method: 'DELETE',
          body: JSON.stringify({ id }),
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } catch (err) {
      alert(response.err);
    }
  };
};

document
  .querySelector('#update-form')
  .addEventListener('submit', updateFormHandler);

document
  .querySelector('#delete-form')
  .addEventListener('click', deleteFormHandler);