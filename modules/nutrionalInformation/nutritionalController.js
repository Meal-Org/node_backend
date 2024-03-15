const nutritionService = require('../nutrionalInformation/nutrionalService'); // Ensure correct service file name

// Joi for validation
const Joi = require('joi');

// Validation schemas
const ingredientNameSchema = Joi.object({
    ingredientName: Joi.string().required()
});

const nutritionalDataSchema = Joi.object({
    ingredientName: Joi.string().required(),
    nutritionalData: Joi.object({
        calories: Joi.number().required(),
        fatTotal: Joi.number(),
        saturatedFat: Joi.number(),
        cholesterol: Joi.number(),
        sodium: Joi.number(),
        carbohydrate: Joi.number(),
        fiber: Joi.number(),
        sugars: Joi.number(),
        protein: Joi.number(),
    }).required()
});

exports.getNutritionalInfo = async (req, res, next) => {
    const { ingredientName } = req.params;
  
    // Validate ingredientName
    const { error } = ingredientNameSchema.validate({ ingredientName });
    if (error) return res.status(400).json({ message: error.details[0].message });
  
    try {
        const nutritionalInfo = await nutritionService.getNutritionalInfoByIngredientName(ingredientName);
        if (!nutritionalInfo) {
            return res.status(404).json({ message: `Nutritional information for ${ingredientName} not found.` });
        }
        res.json(nutritionalInfo);
    } catch (error) {
        console.error(`Error in getNutritionalInfo: ${error}`);
        next(error); // Passes errors to the global error handler
    }
};

exports.upsertNutritionalInfo = async (req, res, next) => {
  // Extract the entire request body to validate against the nutritionalDataSchema
  const requestData = {
      ingredientName: req.body.ingredientName,
      nutritionalData: req.body.nutritionalData
  };

  // Validate the request data
  const { error } = nutritionalDataSchema.validate(requestData);
  if (error) {
      return res.status(400).json({ message: error.details[0].message });
  }

  // Extract validated data
  const { ingredientName, nutritionalData } = requestData;
  const userId = req.user.id; // Extracted by verifyToken middleware

  try {
      const updatedNutritionalInfo = await nutritionService.upsertNutritionalInfo(ingredientName, nutritionalData, userId);
      res.json({ message: "Nutritional information updated successfully.", updatedNutritionalInfo });
  } catch (error) {
      console.error(`Error in upsertNutritionalInfo: ${error}`);
      next(error);
  }
};

