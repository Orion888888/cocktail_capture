const fs = require('fs');

const requestIngredients = async () => {
    try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
        if (response.ok) {
            const data = await response.json();
            const ingredientArray = data.drinks;
            const importData = ingredientArray.map(ingredient => ({ name: ingredient.strIngredient1 }));
            const writeData = JSON.stringify(importData);

            fs.writeFile('./seeds/import_ingredientsData.json', writeData, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Data written to file successfully!');
                }
            });
        } else {
            console.error('Failed to fetch data:', response.statusText);
        }
    } catch (error) {
        console.error('Error during request:', error);
    }
};

requestIngredients();