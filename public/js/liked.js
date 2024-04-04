const likedBtnArray = document.querySelectorAll('.like-btn');

const likeHandler = (cockTailRecipeIdOnParam) => {
    likedBtnArray[cockTailRecipeIdOnParam].setAttribute("style", "display: none;");

    // TODO : We can add the remaining logic here to send the liked cocktail reciepe id
    // into the database of liked recipes via an api.
}

for (let cockTailRecipeIdOn = 0; cockTailRecipeIdOn < likedBtnArray.length; cockTailRecipeIdOn++) {
    likedBtnArray[cockTailRecipeIdOn].addEventListener('click', () => likeHandler(cockTailRecipeIdOn));
}