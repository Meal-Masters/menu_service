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



def create_ingredient(name, unit, stock_quantity=0):
    query_1= create_ingredient(name, unit, stock_quantity=0)
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    response = cursor.execute("INSERT query_1")
    conn.commit()
    conn.close()




if __name__ == '__main__':
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    conn.close()