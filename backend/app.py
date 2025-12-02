from flask import Flask
from flask_cors import CORS
from flask_restx import Api, Resource

app = Flask(__name__)
CORS(app)

api = Api(app, version='1.0', title='Meal Masters Menu API', doc='/api/docs')

# ============================================================================
# DISHES ENDPOINTS
# ============================================================================

@api.route('/api/menu/dishes')
class DishList(Resource):
    def get(self):
        # Fetch all dishes from database
        return {"error": "Not implemented yet"}, 501
    
    def post(self):
        # Create new dish
        return {"error": "Not implemented yet"}, 501


@api.route('/api/menu/dishes/<int:dish_id>')
class Dish(Resource):
    def get(self, dish_id):
        # Fetch specific dish by ID
        return {"error": "Not implemented yet"}, 501
    
    def put(self, dish_id):
        # Update dish
        return {"error": "Not implemented yet"}, 501
    
    def delete(self, dish_id):
        # Delete dish
        return {"error": "Not implemented yet"}, 501


@api.route('/api/menu/dishes/<int:dish_id>/ingredients')
class DishIngredients(Resource):
    def get(self, dish_id):
        # Fetch ingredients for dish
        return {"error": "Not implemented yet"}, 501


@api.route('/api/menu/dishes/<int:dish_id>/dietary-attributes')
class DishDietaryAttributes(Resource):
    def get(self, dish_id):
        # Fetch dietary attributes for dish
        return {"error": "Not implemented yet"}, 501


@api.route('/api/menu/dishes/<int:dish_id>/extras')
class DishExtras(Resource):
    def get(self, dish_id):
        # Fetch extras for dish
        return {"error": "Not implemented yet"}, 501


# ============================================================================
# INGREDIENTS ENDPOINTS
# ============================================================================

@api.route('/api/menu/ingredients')
class IngredientList(Resource):
    def get(self):
        # Fetch all ingredients
        return {"error": "Not implemented yet"}, 501
    
    def post(self):
        # Create new ingredient
        return {"error": "Not implemented yet"}, 501


@api.route('/api/menu/ingredients/<int:ingredient_id>')
class Ingredient(Resource):
    def delete(self, ingredient_id):
        # Delete ingredient
        return {"error": "Not implemented yet"}, 501


# ============================================================================
# DIETARY ATTRIBUTES ENDPOINTS
# ============================================================================

@api.route('/api/menu/dietary-attributes')
class DietaryAttributeList(Resource):
    def get(self):
        # Fetch all dietary attributes
        return {"error": "Not implemented yet"}, 501
    
    def post(self):
        # Create new dietary attribute
        return {"error": "Not implemented yet"}, 501


@api.route('/api/menu/dietary-attributes/<int:attribute_id>')
class DietaryAttribute(Resource):
    def delete(self, attribute_id):
        # Delete dietary attribute
        return {"error": "Not implemented yet"}, 501


# ============================================================================
# MAIN
# ============================================================================

if __name__ == '__main__':
    app.run(debug=True, port=5000)
    # swagger in http://localhost:5000/api/docs