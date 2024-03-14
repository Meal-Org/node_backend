const Joi = require('joi');
const { ValidationError } = require('../../middleware/errorHandler'); // Adjust the path as needed

// Define the schema for validating a recipe
const recipeSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(''),
  servings: Joi.number().integer().min(1).required(),
  cookingTime: Joi.number().integer().min(1).required(),
  instructions: Joi.string().required(),
  published: Joi.boolean(),
  authorId: Joi.number().integer().required(),
  ingredients: Joi.array().items(Joi.object({
    name: Joi.string().required(),
    quantity: Joi.number().required(),
    unit: Joi.string().required(),
  })).required()
});

exports.validateRecipeCreation = (req, res, next) => {
  const { error } = recipeSchema.validate(req.body);
  if (error) {
    next(new ValidationError(error.details[0].message));
  } else {
    next();
  }
};

exports.validateRecipeUpdate = (req, res, next) => {
  const { error } = recipeSchema.validate(req.body, { presence: 'optional' });
  if (error) {
    next(new ValidationError(error.details[0].message));
  } else {
    next();
  }
};
