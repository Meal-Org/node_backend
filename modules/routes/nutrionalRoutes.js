const express = require('express');
const nutritionController = require('../nutrionalInformation/nutritionalController');

// Assuming you have an authentication middleware
const verifyToken = require('../../middleware/verifyToken');

const router = express.Router();

// Retrieves nutritional information for a specific ingredient by name.
// This route is kept public; no authentication required to view nutritional information.
router.get('/:ingredientName', nutritionController.getNutritionalInfo);

// Adds or updates nutritional information for an ingredient.
// Requires users to be authenticated to add or update nutritional info.
router.post('/', verifyToken,nutritionController.upsertNutritionalInfo);

module.exports = router;
