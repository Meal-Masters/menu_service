INSERT INTO Ingredients (Ingredient_ID, Ingredient_Name, Ingredient_Unit) VALUES
(1, 'Tomato', 'kg'),
(2, 'Lettuce', 'kg'),
(3, 'Chicken Breast', 'kg'),
(4, 'Beef Patty', 'piece'),
(5, 'Cheese', 'kg'),
(6, 'Pasta', 'kg'),
(7, 'Olive Oil', 'liter'),
(8, 'Garlic', 'kg'),
(9, 'Onion', 'kg'),
(10, 'Bread', 'piece'),
(11, 'Milk', 'liter'),
(12, 'Eggs', 'piece'),
(13, 'Flour', 'kg'),
(14, 'Sugar', 'kg'),
(15, 'Peanuts', 'kg'),
(16, 'Shellfish', 'kg'),
(17, 'Soy Sauce', 'liter'),
(18, 'Rice', 'kg'),
(19, 'Bell Pepper', 'kg'),
(20, 'Mushrooms', 'kg');

INSERT INTO Dietary_Attributes (Attribute_ID, Attribute_Name, Attribute_Type) VALUES
(1, 'Peanuts', 'Allergen'),
(2, 'Dairy', 'Allergen'),
(3, 'Gluten', 'Allergen'),
(4, 'Shellfish', 'Allergen'),
(5, 'Soy', 'Allergen'),
(6, 'Eggs', 'Allergen'),
(7, 'Vegan', 'Dietary'),
(8, 'Vegetarian', 'Dietary'),
(9, 'Gluten-Free', 'Dietary'),
(10, 'Dairy-Free', 'Dietary');

INSERT INTO Ingredient_Attributes (Ingredient_ID, Attribute_ID) VALUES
(5, 2),   -- Cheese contains Dairy
(10, 3),  -- Bread contains Gluten
(11, 2),  -- Milk contains Dairy
(12, 6),  -- Eggs are Eggs allergen
(13, 3),  -- Flour contains Gluten
(15, 1),  -- Peanuts are Peanuts allergen
(16, 4),  -- Shellfish is Shellfish allergen
(17, 5),  -- Soy Sauce contains Soy
(6, 3);   -- Pasta contains Gluten

INSERT INTO Menu (Dish_ID, Dish_Name, Description, Category, Dish_Price) VALUES
(1, 'Caesar Salad', 'Fresh romaine lettuce with Caesar dressing and croutons', 'Appetizer', 12.99),
(2, 'Grilled Chicken Breast', 'Tender grilled chicken with herbs', 'Main Course', 18.99),
(3, 'Classic Cheeseburger', 'Beef patty with cheese, lettuce, and tomato', 'Main Course', 15.99),
(4, 'Spaghetti Carbonara', 'Pasta with creamy sauce and bacon', 'Main Course', 16.99),
(5, 'Margherita Pizza', 'Classic pizza with tomato, mozzarella, and basil', 'Main Course', 14.99),
(6, 'Garlic Bread', 'Toasted bread with garlic butter', 'Side', 5.99),
(7, 'French Fries', 'Crispy golden fries', 'Side', 4.99),
(8, 'Chocolate Cake', 'Rich chocolate layer cake', 'Dessert', 7.99),
(9, 'Stir-Fry Vegetables', 'Mixed vegetables in soy sauce', 'Main Course', 13.99),
(10, 'Mushroom Risotto', 'Creamy rice with mushrooms', 'Main Course', 17.99);

INSERT INTO DishIngredients (Ingredient_ID, Dish_ID, Ingredient_Quantity) VALUES
-- Caesar Salad
(2, 1, 0.2),   -- Lettuce
(7, 1, 0.02),  -- Olive Oil
(10, 1, 0.05), -- Bread (croutons)

-- Grilled Chicken Breast
(3, 2, 0.25),  -- Chicken Breast
(7, 2, 0.01),  -- Olive Oil
(8, 2, 0.01),  -- Garlic

-- Classic Cheeseburger
(4, 3, 1),     -- Beef Patty
(5, 3, 0.05),  -- Cheese
(2, 3, 0.05),  -- Lettuce
(1, 3, 0.05),  -- Tomato
(10, 3, 1),    -- Bread

-- Spaghetti Carbonara
(6, 4, 0.2),   -- Pasta
(12, 4, 2),    -- Eggs
(5, 4, 0.05),  -- Cheese

-- Margherita Pizza
(1, 5, 0.15),  -- Tomato
(5, 5, 0.1),   -- Cheese
(13, 5, 0.2),  -- Flour

-- Garlic Bread
(10, 6, 1),    -- Bread
(8, 6, 0.02),  -- Garlic

-- French Fries (potato would be ingredient 21, but we'll skip for simplicity)
(7, 7, 0.05),  -- Olive Oil

-- Chocolate Cake
(13, 8, 0.15), -- Flour
(14, 8, 0.1),  -- Sugar
(12, 8, 3),    -- Eggs
(11, 8, 0.1),  -- Milk

-- Stir-Fry Vegetables
(19, 9, 0.15), -- Bell Pepper
(9, 9, 0.1),   -- Onion
(17, 9, 0.03), -- Soy Sauce
(8, 9, 0.01),  -- Garlic

-- Mushroom Risotto
(20, 10, 0.2), -- Mushrooms
(18, 10, 0.15),-- Rice
(5, 10, 0.03), -- Cheese
(9, 10, 0.05); -- Onion

INSERT INTO DishExtras (Dish_ID, Extra_Dish_ID) VALUES
(2, 6),  -- Grilled Chicken can have Garlic Bread as extra
(2, 7),  -- Grilled Chicken can have French Fries as extra
(3, 7),  -- Cheeseburger can have French Fries as extra
(4, 6),  -- Spaghetti can have Garlic Bread as extra
(5, 6),  -- Pizza can have Garlic Bread as extra
(9, 7),  -- Stir-Fry can have French Fries as extra
(10, 6); -- Risotto can have Garlic Bread as extra
