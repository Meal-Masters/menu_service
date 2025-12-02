CREATE TABLE IF NOT EXISTS Menu (
    Dish_ID INT PRIMARY KEY,
    Dish_Name TEXT NOT NULL,
    Description TEXT,
    Category TEXT,
    Dish_Price REAL
);

CREATE TABLE IF NOT EXISTS DishExtras (
    Dish_ID INT,
    Extra_Dish_ID INT,
    PRIMARY KEY (Dish_ID, Extra_Dish_ID),
    FOREIGN KEY (Dish_ID) REFERENCES Menu(Dish_ID),
    FOREIGN KEY (Extra_Dish_ID) REFERENCES Menu(Dish_ID)
);

CREATE TABLE IF NOT EXISTS Ingredients (
    Ingredient_ID INT PRIMARY KEY,
    Ingredient_Name TEXT NOT NULL,
    Ingredient_Unit TEXT
);

CREATE TABLE IF NOT EXISTS DishIngredients (
    Ingredient_ID INT,
    Dish_ID INT,
    Ingredient_Quantity REAL,
    PRIMARY KEY (Ingredient_ID, Dish_ID),
    FOREIGN KEY (Ingredient_ID) REFERENCES Ingredients(Ingredient_ID),
    FOREIGN KEY (Dish_ID) REFERENCES Menu(Dish_ID)
);

CREATE TABLE IF NOT EXISTS Dietary_Attributes (
    Attribute_ID INT PRIMARY KEY,
    Attribute_Name TEXT NOT NULL UNIQUE,
    Attribute_Type TEXT NOT NULL CHECK(Attribute_Type IN('Allergen', 'Dietary'))
);

CREATE TABLE IF NOT EXISTS Ingredient_Attributes (
    Ingredient_ID INT,
    Attribute_ID INT,
    PRIMARY KEY (Ingredient_ID, Attribute_ID),
    FOREIGN KEY (Ingredient_ID) REFERENCES Ingredients(Ingredient_ID),
    FOREIGN KEY (Attribute_ID) REFERENCES Dietary_Attributes(Attribute_ID)
);
