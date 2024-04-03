let ingredientsArr = [];

// API request to retrieve and then create an array of all ingredient strings
const getIngredientsArr = async () => {
  const response = await fetch('/api/ingredients', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  const data = await response.json();

  ingredientsArr = data.map(ingredient => ingredient.name);
};

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
      await submitIngredients(id);

      document.location.replace(`/profile/update/${id}?updated=true`);
    } else {
      alert(response.statusText);
    }
  }
};

const submitIngredients = async (recipes_id) => {
  const ingredientsEl = document.querySelectorAll('.ingredient');
  const amountsEl = document.querySelectorAll('.amount');

  for (i = 0; i < ingredientsEl.length; i++) {

    if (ingredientsEl[i].value) {
      const ingredientData = await getIngredientId(ingredientsEl[i].value.trim());
      const ingredients_id = ingredientData.id;

      const amount = amountsEl[i].value.trim();

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
    <ul class="suggestions" style="list-style-type: none; padding: 0; display: none;"></ul>
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
  const ingredientInput = document.querySelectorAll('.ingredient');
  const suggestionsList = document.querySelectorAll('.suggestions');

  for (input of ingredientInput) {
    input.removeEventListener('input', autoComplete);
    input.removeEventListener('input', invalidValue);
    input.addEventListener('input', autoComplete);
    input.addEventListener('input', invalidValue);
  }

  for (suggestion of suggestionsList) {
    suggestion.removeEventListener('click', clickValue);
    suggestion.addEventListener('click', clickValue);
  }

  const removeButtons = document.querySelectorAll('.remove');

  for (button of removeButtons) {
    button.removeEventListener('click', removeIngredient);
    button.addEventListener('click', removeIngredient);
  }
};

const autoComplete = (event) => {
  const userInput = event.target.value.trim().toLowerCase();

  if (userInput.length > 2) {
    const matchedIngredients = ingredientsArr.filter(ingredient =>
      ingredient.toLowerCase().includes(userInput)
    );

    displaySuggestions(matchedIngredients, event);
  } else {
    event.target.nextElementSibling.style.display = 'none';
  }
};

function displaySuggestions(suggestions, event) {
  const suggestionsList = event.target.nextElementSibling;
  suggestionsList.innerHTML = '';
  if (suggestions.length > 0) {
    suggestions.forEach(suggestion => {
      const li = document.createElement('li');
      li.textContent = suggestion;
      suggestionsList.appendChild(li);
    });
    suggestionsList.style.display = 'block';
  } else {
    suggestionsList.style.display = 'none';
  }
}

const invalidValue = (event) => {
  const userInput = event.target.value.trim().toLowerCase();
  const matchedIngredients = ingredientsArr.filter(ingredient =>
    ingredient.toLowerCase().includes(userInput)
  );
  if (matchedIngredients.length < 1) {
    // Prevent another character if not a valid ingredient entry
    event.target.value = event.target.value.slice(0, -1);
    autoComplete(event);
  }
};

const clickValue = (event) => {
  if (event.target.tagName === 'LI') {
    event.target.parentElement.previousElementSibling.value = event.target.textContent;
    event.target.parentElement.style.display = 'none';
  }
};

document.addEventListener('click', function (event) {
  const suggestionsList = document.querySelectorAll('.suggestions');

  suggestionsList.forEach(suggestions => {
    const inputElement = suggestions.previousElementSibling;
    if (!suggestions.contains(event.target) && (!validateInput(inputElement.value))) {
        suggestions.style.display = 'none';
      if (inputElement.tagName === 'INPUT') {
        inputElement.value = ''; // Clear the input if user clicks outside
      }
    } else {suggestions.style.display = 'none';}
  });
});

const validateInput = (input) => { return ingredientsArr.includes(input) };


document
  .querySelector('#update-form')
  .addEventListener('submit', updateFormHandler);

document
  .querySelector('#delete-form')
  .addEventListener('click', deleteFormHandler);

document
  .querySelector('#add')
  .addEventListener('click', addIngredient);

  resetEvents();
  window.addEventListener('load', getIngredientsArr);