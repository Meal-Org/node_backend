const express = require('express');
const recipeController = require('./recipeController');
const recipeValidation = require('./recipeValidation');
const router = express.Router();

router.post('/recipes', recipeValidation.validateRecipeCreation, recipeController.createRecipe);
router.put('/recipes/:id', recipeValidation.validateRecipeUpdate, recipeController.updateRecipe);

// Define other endpoints here...

module.exports = router;
