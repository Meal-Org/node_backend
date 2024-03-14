const recipeService = require('../services/recipeService');
const {NorFoundError} = require('../../middleware/errorHandler')
exports.createRecipe = async (req, res, next) => {
  recipeService.createRecipe(req.body)
    .then(recipe => res.status(201).json(recipe))
    .catch(next);
};

exports.getAllRecipes = (req, res, next) => {
  recipeService.getRecipes()
    .then(recipes => res.json(recipes))
    .catch(next);
};

exports.getRecipe = (req, res, next) => {
  const { id } = req.params;
  recipeService.getRecipeById(parseInt(id))
    .then(recipe => recipe ? res.json(recipe) : res.status(404).json({ message: 'Recipe not found' }))
    .catch(next);
};

exports.updateRecipe = (req, res, next) => {
  const { id } = req.params;
  recipeService.updateRecipe(parseInt(id), req.body)
    .then(recipe => res.json(recipe))
    .catch(next);
};

exports.deleteRecipe = (req, res, next) => {
  const { id } = req.params;
  recipeService.deleteRecipe(parseInt(id))
    .then(() => res.status(204).send())
    .catch(next);
};
