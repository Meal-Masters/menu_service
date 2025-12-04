import sqlite3

from tkinter import Menubutton

DATABASE_PATH = "menu_service.db"



# conn = sqlite3.connect(DATABASE_PATH)
# cursor = conn.cursor()
# response = cursor.execute()
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
    quary = """SELECT * FROM Menu;
    """
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    response = cursor.execute(quary)

    # return response.fetchone()
    # OR
    for item in response.fetchall():
        print (item)

    conn.close()



def get_dish_by_id(dish_id):
    pass


def create_dish(name, description, price, category, is_available=True):
    pass


def update_dish(dish_id, name, description, price, category, is_available):
    pass


def delete_dish(dish_id):
    pass


def get_dish_ingredients(dish_id):
    dish = {}
    quary = f"""SELECT * FROM Menu
LEFT JOIN DishIngredients ON Menu.Dish_ID = DishIngredients.Dish_ID 
LEFT JOIN Ingredients ON Ingredients.Ingredient_ID = DishIngredients.Ingredient_ID
WHERE Menu.Dish_ID = {dish_id}
    ;"""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    response = cursor.execute(quary)

    # return response.fetchone()
    # OR
    for item in response.fetchall():
        print(item)

    conn.close()
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
    del_ing_attrib1 = f"""DELETE FROM Ingredient_Attributes
        WHERE Attribute_ID = {attribute_id};"""
    del_ing_attrib2 =f"""DELETE FROM Dietary_Attributes
        WHERE Attribute_ID = {attribute_id};"""

    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    cursor.execute(del_ing_attrib1)

    cursor.execute(del_ing_attrib2)
    conn.commit()
    conn.close()





if __name__ == '__main__':
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    delete_dietary_attribute(1)
    # get_all_dishes()
    # get_dish_ingredients(2)
    # response.fetchall()
    conn.close()