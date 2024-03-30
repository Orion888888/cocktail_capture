const createFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const strDrink = document.querySelector('#cocktail-name').value.trim();
    const description = document.querySelector('#description').value.trim();
    const recipeImage = document.getElementById('strDrinkThumb').value.trim();
    const recipeInstructions = document.getElementById('strInstructions').value.trim();
    const ingredientsList = document.getElementById('strIngredients').value.trim();
    console.group(strDrink,description, recipeImage,recipeInstructions, ingredientsList);

    if (strDrink && description && recipeInstructions) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/recipes', {
        method: 'POST',
        body: JSON.stringify({ strDrink, description, recipeImage, recipeInstructions, ingredientsList }),
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