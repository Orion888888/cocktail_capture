



const likedBtnArray = document.querySelectorAll('.like-btn');

const likeHandler = (cockTailRecipeIdOnParam) => {
    likedBtnArray[cockTailRecipeIdOnParam].setAttribute("style", "display: none;");
}

for (let cockTailRecipeIdOn = 0; cockTailRecipeIdOn < likedBtnArray.length; cockTailRecipeIdOn++) {
    likedBtnArray[cockTailRecipeIdOn].addEventListener('click', () => likeHandler(cockTailRecipeIdOn));
}