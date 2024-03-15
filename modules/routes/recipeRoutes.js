const express = require('express');
const recipeController = require('../recipe_management/recipeController');
const recipeValidation = require('../recipe_management/recipeValidation');
const verifyToken = require('../../middleware/verifyToken'); // Adjust the path as necessary

const router = express.Router();

// Route for creating a new recipe
router.post('/recipes', verifyToken, recipeValidation.validateRecipeCreation, recipeController.createRecipe);

// Route for updating an existing recipe
router.put('/recipes/:id', verifyToken, recipeValidation.validateRecipeUpdate, recipeController.updateRecipe);

// Route for fetching all recipes
router.get('/recipes', recipeController.getAllRecipes);

// Route for fetching a specific recipe by ID
router.get('/recipes/:id', recipeController.getRecipe);

// Route for deleting a recipe
router.delete('/recipes/:id', verifyToken, recipeController.deleteRecipe);

module.exports = router;
