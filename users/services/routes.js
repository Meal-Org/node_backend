const express = require('express');
const router = express.Router();
const recipeController = require('./recipeController');
const recipeValidation = require('./recipeValidation');


// Routes for recipe management
router.post('/recipes', recipeValidation.validateRecipeCreation, recipeController.createRecipe);
router.get('/recipes', recipeController.getAllRecipes);
router.get('/recipes/:id', recipeController.getRecipe);
router.put('/recipes/:id', recipeValidation.validateRecipeUpdate, recipeController.updateRecipe);
router.delete('/recipes/:id', recipeController.deleteRecipe);


router.get('/protected', verifyToken, (req, res) => {
  res.send('Protected route accessed');
});

module.exports = router;
