const express = require('express');
const recipeController = require('../controllers/recipeController');
const recipeValidation = require('../middleware/recipeValidation');
const router = express.Router();

router.post('/recipes', recipeValidation.validateRecipeCreation, recipeController.createRecipe);
router.put('/recipes/:id', recipeValidation.validateRecipeUpdate, recipeController.updateRecipe);

// Define other endpoints here...

module.exports = router;
