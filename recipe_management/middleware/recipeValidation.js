const Joi = require('joi');

// Define the schema for a recipe
const recipeSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(''),
  servings: Joi.number().integer().min(1),
  cookingTime: Joi.number().integer().min(0), // cooking time in minutes
  instructions: Joi.string().required(),
  published: Joi.boolean(),
  authorId: Joi.number().integer().required(), // assuming you are sending the ID of the author
  // If ingredients are sent as an array of objects e.g., [{ name: "Sugar", quantity: "2", unit: "cups" }]
  ingredients: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      quantity: Joi.number().required(),
      unit: Joi.string().required(),
    })
  ).required()
});

// Middleware for creating a recipe
exports.validateRecipeCreation = (req, res, next) => {
  const { error } = recipeSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};

// Middleware for updating a recipe (allows for partial updates)
exports.validateRecipeUpdate = (req, res, next) => {
  const { error } = recipeSchema.validate(req.body, { presence: 'optional' });
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};
