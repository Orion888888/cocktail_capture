const likedBtnArray = document.querySelectorAll('.like-btn');

const likeHandler = (cockTailRecipeIdOnParam) => {
    likedBtnArray[cockTailRecipeIdOnParam].setAttribute("style", "display: none;");

    // TODO : We can add the remaining logic here to send the liked cocktail reciepe id
    // into the database of liked recipes via an api.
}

for (let cockTailRecipeIdOn = 0; cockTailRecipeIdOn < likedBtnArray.length; cockTailRecipeIdOn++) {
    likedBtnArray[cockTailRecipeIdOn].addEventListener('click', () => likeHandler(cockTailRecipeIdOn));

}


// const likeHandler = async (event) => {
//     try {
//         const { target } = event;
//         const drinkId = target.getAttribute('data-id');

//         // Send a POST request to add the liked recipe
//         const response = await fetch(`/api/recipes/liked/${drinkId}`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//         });

//         if (!response.ok) {
//             throw new Error('Failed to add recipe to liked');
//         }

//         // Create the recipe card element; Append the card to the container
//         const recipeCard = createRecipeCard(drinkId);
//         document.querySelector('.liked-recipes').appendChild(recipeCard);

//         console.log('Recipe added to liked successfully');
//     } catch (error) {
//         console.error('Error occurred while liking recipe:', error);
//     }
// };

// document.querySelectorAll('.like-btn').forEach(btn => {
//     btn.addEventListener('click', likeHandler);
// });




// const likeHandler = (event) => {
//     const { target } = event
//     const drinkId = target.getAttribute('')
// }
// document.querySelector('.like-btn').addEventListener('click', likeHandler);

// target.getAttribute("data-id")