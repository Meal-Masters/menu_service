import sqlite3
import os
from http.client import responses
# from tkinter.tix import Select

DATABASE_PATH = "menu_service.db"



# conn = sqlite3.connect(DATABASE_PATH)
# cursor = conn.cursor()
# response = cursor.execute("SELECT ...")
#
# response.fetchone()
# # OR
# response.fetchall()
#
# conn.close()

############################################

# conn = sqlite3.connect(DATABASE_PATH)
# cursor = conn.cursor()
# response = cursor.execute("INSERT/CREATE/DELETE ...")
# conn.commit()
# conn.close()




def get_all_dishes():
    pass


def get_dish_by_id(dish_id):
    pass


def create_dish(name, description, price, category, is_available=True):
    pass


def update_dish(dish_id, name, description, price, category, is_available):
    pass


def delete_dish(dish_id):
    pass





def get_dish_ingredients(dish_id:int):
    query = f"""SELECT DishIngredients.Dish_ID, Ingredients.Ingredient_ID, Ingredients.Ingredient_Name, DishIngredients.Ingredient_Quantity, Ingredients.Ingredient_Unit
FROM DishIngredients
JOIN Ingredients
ON DishIngredients.Ingredient_ID = Ingredients.Ingredient_ID
WHERE DishIngredients.Dish_ID = {dish_id}"""

    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    response = cursor.execute(query)
    fetched_res = response.fetchall()


    for row in fetched_res:
        dish_ingredients = []
        dish_ingredients.append({
            "Dish_ID": row[0],
            "Ingredient_ID": row[1],
            "Ingredient_Name": row[2],
            "Ingredient_Quantity": row[3],
            "Ingredient_Unit": row[4]
        })
        print(dish_ingredients)
    return dish_ingredients



def get_dish_dietary_attributes(dish_id):
    pass


def get_dish_extras(dish_id):
    pass


def get_all_ingredients():
    pass


def create_ingredient(name, unit, stock_quantity=0):
    pass


def delete_ingredient(ingredient_id):
    pass


def get_all_dietary_attributes():
    pass


def create_dietary_attribute(name, description=""):
    pass


def delete_dietary_attribute(attribute_id):
    pass




if __name__ == '__main__':
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    conn.close()


get_dish_ingredients(3)