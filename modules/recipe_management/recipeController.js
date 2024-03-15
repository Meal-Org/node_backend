const recipeService = require('../recipe_management/recipeService');
const {NotFoundError} = require('../../middleware/errorHandler')

// Assuming NotFoundError is correctly imported and used in the global error handler
exports.createRecipe = async (req, res, next) => {
  try {
    const recipe = await recipeService.createRecipe(req.body);
    res.status(201).json(recipe);
  } catch (error) {
    next(error);
  }
};

exports.getAllRecipes = async (req, res, next) => {
  try {
    const recipes = await recipeService.getRecipes();
    res.json(recipes);
  } catch (error) {
    next(error);
  }
};

exports.getRecipe = async (req, res, next) => {
  const { id } = req.params;
  try {
    const recipe = await recipeService.getRecipeById(parseInt(id));
    res.json(recipe);
  } catch (error) {
    next(error);
  }
};


exports.updateRecipe = async (req, res, next) => {
  const { id } = req.params;
  try {
    const recipe = await recipeService.updateRecipe(parseInt(id), req.body);
    res.json(recipe);
  } catch (error) {
    next(error);
  }
};

exports.deleteRecipe = async (req, res, next) => {
  const { id } = req.params;
  try {
    await recipeService.deleteRecipe(parseInt(id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
