// API Base URL
const API_BASE_URL = 'http://localhost:5000/api/menu';

// Global state
let currentEditingDishId = null;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function showError(message) {
    alert(`Error: ${message}`);
}

function showSuccess(message) {
    console.log(`Success: ${message}`);
}

function formatPrice(price) {
    return `$${parseFloat(price).toFixed(2)}`;
}

// ============================================================================
// DISHES FUNCTIONS
// ============================================================================

async function loadDishes() {
    const dishesContainer = document.getElementById('dishes-list');
    dishesContainer.innerHTML = '<div class="loading">Loading dishes...</div>';

    try {
        const response = await fetch(`${API_BASE_URL}/dishes`);
        const dishes = await response.json();
        
        if (dishes.error) {
            dishesContainer.innerHTML = `
                <div class="error-message">
                    <h3>⚠️ Backend Not Implemented</h3>
                    <p>The GET /api/menu/dishes endpoint needs to be implemented.</p>
                    <p>This is where students will add the database query to fetch all dishes.</p>
                </div>
            `;
            return;
        }

        if (dishes.length === 0) {
            dishesContainer.innerHTML = '<div class="empty-state">No dishes found. Add your first dish!</div>';
            return;
        }

        dishesContainer.innerHTML = dishes.map(dish => `
            <div class="card dish-card" data-dish-id="${dish.id}">
                <div class="card-header">
                    <h3>${dish.name}</h3>
                    <span class="badge ${dish.is_available ? 'badge-success' : 'badge-danger'}">
                        ${dish.is_available ? 'Available' : 'Unavailable'}
                    </span>
                </div>
                <div class="card-body">
                    <p class="dish-description">${dish.description || 'No description'}</p>
                    <div class="dish-meta">
                        <span class="dish-price">${formatPrice(dish.price)}</span>
                        <span class="dish-category">${dish.category}</span>
                    </div>
                </div>
                <div class="card-actions">
                    <button class="btn btn-sm btn-info" onclick="viewDishDetails(${dish.id})">View Details</button>
                    <button class="btn btn-sm btn-secondary" onclick="editDish(${dish.id})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteDish(${dish.id})">Delete</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading dishes:', error);
        dishesContainer.innerHTML = `
            <div class="error-message">
                <h3>⚠️ Connection Error</h3>
                <p>Could not connect to the backend server.</p>
                <p>Make sure the Flask server is running on port 5000.</p>
                <button class="btn btn-primary" onclick="loadDishes()">Retry</button>
            </div>
        `;
    }
}

async function viewDishDetails(dishId) {
    try {
        // Fetch dish details
        const dishResponse = await fetch(`${API_BASE_URL}/dishes/${dishId}`);
        const dish = await dishResponse.json();

        // Fetch ingredients
        const ingredientsResponse = await fetch(`${API_BASE_URL}/dishes/${dishId}/ingredients`);
        const ingredients = await ingredientsResponse.json();

        // Fetch dietary attributes
        const dietaryResponse = await fetch(`${API_BASE_URL}/dishes/${dishId}/dietary-attributes`);
        const dietary = await dietaryResponse.json();

        // Fetch extras
        const extrasResponse = await fetch(`${API_BASE_URL}/dishes/${dishId}/extras`);
        const extras = await extrasResponse.json();

        // Display modal
        const modal = document.getElementById('dish-details-modal');
        const modalName = document.getElementById('modal-dish-name');
        const modalContent = document.getElementById('modal-dish-content');

        modalName.textContent = dish.name || `Dish #${dishId}`;

        let contentHTML = '<div class="modal-sections">';

        // Basic info
        contentHTML += `
            <div class="modal-section">
                <h4>Basic Information</h4>
                ${dish.error ? `<p class="error-text">Backend not implemented yet</p>` : `
                    <p><strong>Description:</strong> ${dish.description || 'N/A'}</p>
                    <p><strong>Price:</strong> ${formatPrice(dish.price)}</p>
                    <p><strong>Category:</strong> ${dish.category}</p>
                    <p><strong>Status:</strong> ${dish.is_available ? 'Available' : 'Unavailable'}</p>
                `}
            </div>
        `;

        // Ingredients
        contentHTML += `
            <div class="modal-section">
                <h4>Ingredients</h4>
                ${ingredients.error ? `<p class="error-text">Backend not implemented yet</p>` : 
                    ingredients.length === 0 ? '<p>No ingredients added</p>' :
                    '<ul>' + ingredients.map(ing => `<li>${ing.name} (${ing.quantity} ${ing.unit})</li>`).join('') + '</ul>'
                }
            </div>
        `;

        // Dietary attributes
        contentHTML += `
            <div class="modal-section">
                <h4>Dietary Attributes</h4>
                ${dietary.error ? `<p class="error-text">Backend not implemented yet</p>` : 
                    dietary.length === 0 ? '<p>No dietary attributes</p>' :
                    '<div class="badges">' + dietary.map(attr => `<span class="badge badge-info">${attr.name}</span>`).join('') + '</div>'
                }
            </div>
        `;

        // Extras
        contentHTML += `
            <div class="modal-section">
                <h4>Available Extras</h4>
                ${extras.error ? `<p class="error-text">Backend not implemented yet</p>` : 
                    extras.length === 0 ? '<p>No extras available</p>' :
                    '<ul>' + extras.map(extra => `<li>${extra.name} - ${formatPrice(extra.price)}</li>`).join('') + '</ul>'
                }
            </div>
        `;

        contentHTML += '</div>';
        modalContent.innerHTML = contentHTML;
        modal.style.display = 'block';

    } catch (error) {
        console.error('Error viewing dish details:', error);
        showError('Could not load dish details');
    }
}

async function editDish(dishId) {
    try {
        const response = await fetch(`${API_BASE_URL}/dishes/${dishId}`);
        const dish = await response.json();

        if (dish.error) {
            showError('Cannot edit: Backend endpoint not implemented yet');
            return;
        }

        // Populate form
        document.getElementById('dish-id').value = dish.id;
        document.getElementById('dish-name').value = dish.name;
        document.getElementById('dish-description').value = dish.description || '';
        document.getElementById('dish-price').value = dish.price;
        document.getElementById('dish-category').value = dish.category;
        document.getElementById('dish-available').checked = dish.is_available;

        // Show form
        document.getElementById('dish-form-title').textContent = 'Edit Dish';
        document.getElementById('dish-form-container').style.display = 'block';
        document.getElementById('dish-form-container').scrollIntoView({ behavior: 'smooth' });

        currentEditingDishId = dishId;
    } catch (error) {
        console.error('Error loading dish for edit:', error);
        showError('Could not load dish for editing');
    }
}

async function saveDish(event) {
    event.preventDefault();

    const dishId = document.getElementById('dish-id').value;
    const dishData = {
        name: document.getElementById('dish-name').value,
        description: document.getElementById('dish-description').value,
        price: parseFloat(document.getElementById('dish-price').value),
        category: document.getElementById('dish-category').value,
        is_available: document.getElementById('dish-available').checked
    };

    try {
        let response;
        if (dishId) {
            // Update existing dish
            response = await fetch(`${API_BASE_URL}/dishes/${dishId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dishData)
            });
        } else {
            // Create new dish
            response = await fetch(`${API_BASE_URL}/dishes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dishData)
            });
        }

        const result = await response.json();

        if (result.error) {
            showError(`Backend not implemented: ${result.error}`);
            return;
        }

        showSuccess(dishId ? 'Dish updated successfully!' : 'Dish created successfully!');
        cancelDishForm();
        loadDishes();
    } catch (error) {
        console.error('Error saving dish:', error);
        showError('Could not save dish. Make sure the backend is running.');
    }
}

async function deleteDish(dishId) {
    if (!confirm('Are you sure you want to delete this dish?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/dishes/${dishId}`, {
            method: 'DELETE'
        });

        const result = await response.json();

        if (result.error) {
            showError(`Backend not implemented: ${result.error}`);
            return;
        }

        showSuccess('Dish deleted successfully!');
        loadDishes();
    } catch (error) {
        console.error('Error deleting dish:', error);
        showError('Could not delete dish');
    }
}

function showDishForm() {
    document.getElementById('dish-form-title').textContent = 'Add New Dish';
    document.getElementById('dish-form-container').style.display = 'block';
    document.getElementById('dish-form').reset();
    document.getElementById('dish-id').value = '';
    currentEditingDishId = null;
}

function cancelDishForm() {
    document.getElementById('dish-form-container').style.display = 'none';
    document.getElementById('dish-form').reset();
    document.getElementById('dish-id').value = '';
    currentEditingDishId = null;
}

// ============================================================================
// INGREDIENTS FUNCTIONS
// ============================================================================

async function loadIngredients() {
    const ingredientsContainer = document.getElementById('ingredients-list');
    ingredientsContainer.innerHTML = '<div class="loading">Loading ingredients...</div>';

    try {
        const response = await fetch(`${API_BASE_URL}/ingredients`);
        const ingredients = await response.json();

        if (ingredients.error) {
            ingredientsContainer.innerHTML = `
                <div class="error-message">
                    <h3>⚠️ Backend Not Implemented</h3>
                    <p>The GET /api/menu/ingredients endpoint needs to be implemented.</p>
                </div>
            `;
            return;
        }

        if (ingredients.length === 0) {
            ingredientsContainer.innerHTML = '<div class="empty-state">No ingredients found. Add your first ingredient!</div>';
            return;
        }

        ingredientsContainer.innerHTML = `
            <table class="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Unit</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${ingredients.map(ing => `
                        <tr>
                            <td>${ing.name}</td>
                            <td>${ing.unit}</td>
                            <td>${ing.stock_quantity || 0}</td>
                            <td>
                                <button class="btn btn-sm btn-danger" onclick="deleteIngredient(${ing.id})">Delete</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    } catch (error) {
        console.error('Error loading ingredients:', error);
        ingredientsContainer.innerHTML = `
            <div class="error-message">
                <h3>⚠️ Connection Error</h3>
                <p>Could not connect to the backend server.</p>
                <button class="btn btn-primary" onclick="loadIngredients()">Retry</button>
            </div>
        `;
    }
}

async function saveIngredient(event) {
    event.preventDefault();

    const ingredientData = {
        name: document.getElementById('ingredient-name').value,
        unit: document.getElementById('ingredient-unit').value,
        stock_quantity: parseInt(document.getElementById('ingredient-stock').value) || 0
    };

    try {
        const response = await fetch(`${API_BASE_URL}/ingredients`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ingredientData)
        });

        const result = await response.json();

        if (result.error) {
            showError(`Backend not implemented: ${result.error}`);
            return;
        }

        showSuccess('Ingredient added successfully!');
        cancelIngredientForm();
        loadIngredients();
    } catch (error) {
        console.error('Error saving ingredient:', error);
        showError('Could not save ingredient');
    }
}

async function deleteIngredient(ingredientId) {
    if (!confirm('Are you sure you want to delete this ingredient?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/ingredients/${ingredientId}`, {
            method: 'DELETE'
        });

        const result = await response.json();

        if (result.error) {
            showError(`Backend not implemented: ${result.error}`);
            return;
        }

        showSuccess('Ingredient deleted successfully!');
        loadIngredients();
    } catch (error) {
        console.error('Error deleting ingredient:', error);
        showError('Could not delete ingredient');
    }
}

function showIngredientForm() {
    document.getElementById('ingredient-form-container').style.display = 'block';
    document.getElementById('ingredient-form').reset();
}

function cancelIngredientForm() {
    document.getElementById('ingredient-form-container').style.display = 'none';
    document.getElementById('ingredient-form').reset();
}

// ============================================================================
// DIETARY ATTRIBUTES FUNCTIONS
// ============================================================================

async function loadDietaryAttributes() {
    const dietaryContainer = document.getElementById('dietary-list');
    dietaryContainer.innerHTML = '<div class="loading">Loading dietary attributes...</div>';

    try {
        const response = await fetch(`${API_BASE_URL}/dietary-attributes`);
        const attributes = await response.json();

        if (attributes.error) {
            dietaryContainer.innerHTML = `
                <div class="error-message">
                    <h3>⚠️ Backend Not Implemented</h3>
                    <p>The GET /api/menu/dietary-attributes endpoint needs to be implemented.</p>
                </div>
            `;
            return;
        }

        if (attributes.length === 0) {
            dietaryContainer.innerHTML = '<div class="empty-state">No dietary attributes found. Add your first attribute!</div>';
            return;
        }

        dietaryContainer.innerHTML = `
            <table class="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${attributes.map(attr => `
                        <tr>
                            <td><strong>${attr.name}</strong></td>
                            <td>${attr.description || 'No description'}</td>
                            <td>
                                <button class="btn btn-sm btn-danger" onclick="deleteDietaryAttribute(${attr.id})">Delete</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    } catch (error) {
        console.error('Error loading dietary attributes:', error);
        dietaryContainer.innerHTML = `
            <div class="error-message">
                <h3>⚠️ Connection Error</h3>
                <p>Could not connect to the backend server.</p>
                <button class="btn btn-primary" onclick="loadDietaryAttributes()">Retry</button>
            </div>
        `;
    }
}

async function saveDietaryAttribute(event) {
    event.preventDefault();

    const attributeData = {
        name: document.getElementById('dietary-name').value,
        description: document.getElementById('dietary-description').value
    };

    try {
        const response = await fetch(`${API_BASE_URL}/dietary-attributes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(attributeData)
        });

        const result = await response.json();

        if (result.error) {
            showError(`Backend not implemented: ${result.error}`);
            return;
        }

        showSuccess('Dietary attribute added successfully!');
        cancelDietaryForm();
        loadDietaryAttributes();
    } catch (error) {
        console.error('Error saving dietary attribute:', error);
        showError('Could not save dietary attribute');
    }
}

async function deleteDietaryAttribute(attributeId) {
    if (!confirm('Are you sure you want to delete this dietary attribute?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/dietary-attributes/${attributeId}`, {
            method: 'DELETE'
        });

        const result = await response.json();

        if (result.error) {
            showError(`Backend not implemented: ${result.error}`);
            return;
        }

        showSuccess('Dietary attribute deleted successfully!');
        loadDietaryAttributes();
    } catch (error) {
        console.error('Error deleting dietary attribute:', error);
        showError('Could not delete dietary attribute');
    }
}

function showDietaryForm() {
    document.getElementById('dietary-form-container').style.display = 'block';
    document.getElementById('dietary-form').reset();
}

function cancelDietaryForm() {
    document.getElementById('dietary-form-container').style.display = 'none';
    document.getElementById('dietary-form').reset();
}

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Load all data
    loadDishes();
    loadIngredients();
    loadDietaryAttributes();

    // Dishes event listeners
    document.getElementById('add-dish-btn').addEventListener('click', showDishForm);
    document.getElementById('cancel-dish-btn').addEventListener('click', cancelDishForm);
    document.getElementById('dish-form').addEventListener('submit', saveDish);

    // Ingredients event listeners
    document.getElementById('add-ingredient-btn').addEventListener('click', showIngredientForm);
    document.getElementById('cancel-ingredient-btn').addEventListener('click', cancelIngredientForm);
    document.getElementById('ingredient-form').addEventListener('submit', saveIngredient);

    // Dietary attributes event listeners
    document.getElementById('add-dietary-btn').addEventListener('click', showDietaryForm);
    document.getElementById('cancel-dietary-btn').addEventListener('click', cancelDietaryForm);
    document.getElementById('dietary-form').addEventListener('submit', saveDietaryAttribute);

    // Modal close
    const modal = document.getElementById('dish-details-modal');
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
});
