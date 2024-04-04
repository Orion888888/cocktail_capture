// Client-side JavaScript to handle removing items from cart when not viewing the cart
document.querySelectorAll('.add-to-bar').forEach(button => {
    button.addEventListener('click', async (event) => {
        const id = button.dataset.id;
        try {
            const response = await fetch(`api/cart/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
              });
            if (response.ok) {
                //success message to the user
                console.log('Item added to cart successfully');


                event.target.innerHTML = 'Remove From Bar';
                event.target.classList.remove('add-to-bar');
                event.target.classList.add('add-to-bar');
                
                
            } else {
                //error message to the user
                console.error('Failed to add item to cart');


            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    });
});

// Client-side JavaScript to handle removing items from cart when not viewing the cart
document.querySelectorAll('.remove-from-bar').forEach(button => {
    button.addEventListener('click', async (event) => {
        console.log(event.target);
        const id = button.dataset.id;
        try {
            const response = await fetch(`../api/cart/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
              });
            if (response.ok) {
                //success message to the user
                console.log('Item removed from cart successfully');
                event.target.parentElement.parentElement.remove();
            } else {
                //error message to the user
                console.error('Failed to remove item from cart');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    });
});

// Function to remove recipe completely from users bar/cart
document.querySelectorAll('.remove-complete-from-cart').forEach(button => {
    button.addEventListener('click', async (event) => {
        console.log(event.target);
        const id = button.dataset.id;
        try {
            const response = await fetch(`../api/cart/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
              });
            if (response.ok) {
                //success message to the user
                console.log('Item removed from cart successfully');
                event.target.parentElement.parentElement.remove();
            } else {
                //error message to the user
                console.error('Failed to remove item from cart');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    });
});