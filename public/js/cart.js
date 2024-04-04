// Client-side JavaScript to handle adding items to the cart
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', async () => {
        const id = button.dataset.id;
        try {
            const response = await fetch(`api/cart/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
              });
            if (response.ok) {
                //success message to the user
                console.log('Item added to cart successfully');
            } else {
                //error message to the user
                console.error('Failed to add item to cart');


            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    });
});
