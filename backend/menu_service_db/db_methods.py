import sqlite3
import os

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


def get_dish_ingredients(dish_id):
    pass


def get_dish_dietary_attributes(dish_id):
    pass


def get_dish_extras(dish_id):
    query = f"""SELECT * FROM DishExtras WHERE Dish_ID = {dish_id} """
    conn = sqlite3 .connect(DATABASE_PATH)
    cursor = conn.cursor()
    response = cursor.execute(query)
    fetched_res = response.fetchall()
    dish_extra = f"""For dish {dish_id}, the extra is {fetched_res[0][1]} """
    return dish_extra


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
    print(get_dish_extras(3))
    # conn = sqlite3.connect(DATABASE_PATH)
    # cursor = conn.cursor()
    # conn.close()