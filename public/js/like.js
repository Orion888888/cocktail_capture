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

            //AJAX request to your server to handle the 'like' operation
            try {
                const response = await fetch(`/api/like/${drinkId}`, {
                    method: 'POST',
                    
                });
                
                //Handle the response from the server
                if (response.ok) {
                    console.log('Drink liked successfully');
                } else {
                    console.error('Failed to like drink');
                }
            } catch (error) {
                console.error('Error occurred while liking drink:', error);
            }
        });
    });
});