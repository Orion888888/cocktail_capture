const createFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the recipe creation form
  const strDrink = document.querySelector('#cocktail-name').value.trim();
  const description = document.querySelector('#description').value.trim();
  const recipeImage = document.getElementById('#strDrinkThumb').value.trim();

  if (strDrink && description) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/recipes', {
      method: 'POST',
      body: JSON.stringify({ strDrink, description, recipeImage }),
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

const addIngredient = (event) => {
  event.preventDefault();

  const ingredientForm = document.querySelector('#ingredient-form');

  ingredientForm.insertAdjacentHTML('beforeend', `<div class="flex add-ingredient">

  <div>
    <label for="ingredient">Ingredient: </label>
    <input name="ingredient" type="text" class="ingredient" />
  </div>

  <div>
    <label for="amount">Amount: </label>
    <input name="amount" type="text" class="amount" />
  </div>

  <div>
    <button type="button" class="remove">-</button>
</div>`);

  resetEvents();
};

const removeIngredient = (event) => {
  const parentDiv = event.target.closest('.add-ingredient');

  if (parentDiv) {
    parentDiv.remove();
  }

  resetEvents();
};

// Removes and re-adds event listeners on all minus buttons for individual ingredients
const resetEvents = () => {
  const removeButtons = document.querySelectorAll('.remove');

  for (button of removeButtons) {
    button.removeEventListener('click', removeIngredient);
    button.addEventListener('click', removeIngredient);
  }
};

document
  .querySelector('#recipe-form')
  .addEventListener('submit', createFormHandler);

document
  .querySelector('#add')
  .addEventListener('click', addIngredient);

resetEvents();