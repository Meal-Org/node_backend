const express = require('express');
const aiController = require('../ai/aiController'); // Adjust the path as needed
const router = express.Router();

// Route for generating text based on a prompt
router.post('/generate-text', aiController.getAIResponse);

module.exports = router;
