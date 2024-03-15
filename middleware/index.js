// api-gateway/routes/index.js
const express = require('express');
const rateLimiter = require('./rateLimiter');
const recipeRoutes = require('../../recipe-management/routes/recipeRoutes'); // Adjust path as necessary
const nutritionRoutes = require('../../nutritional-information/routes/nutritionRoutes'); // Adjust path as necessary
const aiRoutes = require('../modules/routes/aiRoutes'); // Adjust path as necessary

const router = express.Router();

// Apply rate limiting middleware globally
router.use(rateLimiter);

// Setup routes
router.use('/recipes', recipeRoutes);
router.use('/nutrition', nutritionRoutes);
router.use('/ai', aiRoutes);

module.exports = router;
