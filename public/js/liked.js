// function createRecipeCard(drinkId) {
//     // Create card element
//     const card = document.createElement('div');
//     card.className = 'recipe-form';

//     // fetch or generate the recipe details
//     card.innerHTML = `
//         <h3>Recipe ${drinkId}</h3>
//         <p>Description of the recipe...</p>
//     `;

//     // Return the card element
//     return card;
// }


const likeHandler = async (event) => {
    try {
        const { target } = event;
        const drinkId = target.getAttribute('data-id');

        // Send a POST request to add the liked recipe
        const response = await fetch(`/api/recipes/liked/${drinkId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error('Failed to add recipe to liked');
        }

        // Create the recipe card element; Append the card to the container
        const recipeCard = createRecipeCard(drinkId);
        document.querySelector('.liked-recipes').appendChild(recipeCard);

        console.log('Recipe added to liked successfully');
    } catch (error) {
        console.error('Error occurred while liking recipe:', error);
    }
};

document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', likeHandler);
});




// const likeHandler = (event) => {
//     const { target } = event
//     const drinkId = target.getAttribute('')
// }
// document.querySelector('.like-btn').addEventListener('click', likeHandler);

// target.getAttribute("data-id")