const updateFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the update form
  const strDrink = document.querySelector('#cocktail-name').value.trim();
  const description = document.querySelector('#description').value.trim();
  const id = parseInt(document.querySelector('#id').value);

  if (strDrink && description && id) {
    // Send a POST request to the API endpoint
    const response = await fetch(`/api/recipes/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ strDrink, description }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      document.location.replace(`/profile/update/${id}?updated=true`);
    } else {
      alert(response.statusText);
    }
  }
};

const deleteFormHandler = async (event) => {
  if (confirm("Delete recipe?")) {
    event.preventDefault();

    // Collect hidden id value from the delete form
    const id = document.querySelector('#id').value;

    if (id) {
      // Send a POST request to the API endpoint
      const response = await fetch(`/api/recipes/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // If successful, redirect the page to confirm the post has been removed.
        document.location.replace('/profile?deleted=true');
      } else {
        alert(response.statusText);
      }
    };
  }
};

document
  .querySelector('#update-form')
  .addEventListener('submit', updateFormHandler);

document
  .querySelector('#delete-form')
  .addEventListener('click', deleteFormHandler);