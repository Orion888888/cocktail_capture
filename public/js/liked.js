document.addEventListener('DOMContentLoaded', () => {
    // Select all elements with class 'like-btn'
    const likeBtns = document.querySelectorAll('.like-btn');
    
    // Add event listener to each like button
    likeBtns.forEach(likeBtn => {
        likeBtn.addEventListener('click', async () => {
            // Retrieve drink ID from data attribute
            const drinkId = likeBtn.getAttribute('data-id');

            // Perform toggle operations on the like button
            likeBtn.classList.toggle('liked');
            likeBtn.classList.toggle('bg-green-500');
            likeBtn.classList.toggle('text-white');
            likeBtn.classList.toggle('transform');
            likeBtn.classList.toggle('scale-110');
            likeBtn.classList.toggle('rotate-180');

            // AJAX request to server to handle the 'like' operation
            try {
                const response = await fetch(`/api/like/${drinkId}`, {
                    method: 'POST'
                });
                
                // Handle the response from the server
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