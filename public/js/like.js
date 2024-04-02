document.addEventListener('DOMContentLoaded', () => {
    // Select all elements with class 'like-btn'
    const likeButtons = document.querySelectorAll('.like-btn');
    
    // Add event listener to like button
    likeButtons.forEach(button => {
        button.addEventListener('click', async () => {
            // Retrieve drink ID from data attribute
            const drinkId = button.getAttribute('data-drink-id');
            //Perform an action when the button is clicked (e.g., change button color)
            button.classList.toggle('liked');