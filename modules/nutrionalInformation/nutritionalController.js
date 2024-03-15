const nutritionService = require('./nutrionalService');

/**
 * GET /nutrition/:ingredientName
 * Retrieves nutritional information for a specific ingredient by name.
 */
exports.getNutritionalInfo = async (req, res, next) => {
  const { ingredientName } = req.params;

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

/**
 * POST /nutrition
 * Adds or updates nutritional information for an ingredient. The body should contain
 * the ingredient name and nutritional data.
 */
exports.upsertNutritionalInfo = async (req, res, next) => {
  const { ingredientName, nutritionalData } = req.body;

  // Basic validation
  if (!ingredientName || !nutritionalData) {
    return res.status(400).json({ message: "Missing ingredient name or nutritional data." });
  }

  try {
    const updatedNutritionalInfo = await nutritionService.upsertNutritionalInfo(ingredientName, nutritionalData);
    res.json({ message: "Nutritional information updated successfully.", updatedNutritionalInfo });
  } catch (error) {
    console.error(`Error in upsertNutritionalInfo: ${error}`);
    next(error);
  }
};
