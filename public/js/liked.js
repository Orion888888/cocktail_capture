const likeHandler = (event) => {
    const { target } = event
    const drinkId = target.getAttribute('')
}
document.querySelector('.like-btn').addEventListener('click', likeHandler);