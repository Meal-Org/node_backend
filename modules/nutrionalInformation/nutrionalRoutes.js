const express = require('express');
const nutritionController = require('./nutritionalController');
const router = express.Router();

router.get('/:ingredientName', nutritionController.getNutritionalInfo);
router.post('/', nutritionController.upsertNutritionalInfo);

module.exports = router;
