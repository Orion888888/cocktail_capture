const createFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the recipe creation form
  const strDrink = document.querySelector('#cocktail-name').value.trim();
  const description = document.querySelector('#description').value.trim();
  //const recipeImage = document.getElementById('#strDrinkThumb').value.trim();

  console.group(strDrink, description);

  if (strDrink && description) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/recipes', {
      method: 'POST',
      body: JSON.stringify({ strDrink, description }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      
      const data = await response.json();

      console.log(data);

      await submitIngredients(data);
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};


const submitIngredients = async (data) => {
  const recipes_id = data.id;

  const ingredientsEl = document.querySelectorAll('.ingredient');
  const amountsEl = document.querySelectorAll('.amount');

  for (i = 0; i < ingredientsEl.length; i++) {

    if (ingredientsEl[i].value) {
      const ingredientData = await getIngredientId(ingredientsEl[i].value.trim());
      const ingredients_id = ingredientData.id;

      const amount = amountsEl[i].value.trim();

      console.log('-----');
      console.log(ingredients_id);
      console.log(recipes_id);
      console.log(amount);
      console.log('-----');

      // Send a POST request to the API endpoint
      const response = await fetch('/api/ingredients', {
        method: 'POST',
        body: JSON.stringify({ ingredients_id, recipes_id, amount }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        alert(response.statusText);
      }
    } else {
      return;
    }
  }
};

const getIngredientId = async (name) => {
  // Send a GET request to the API endpoint
  const response = await fetch(`/api/ingredients/${name}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    return await response.json();
  } else {
    alert(response.statusText);
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