const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// Endpoint for generating text based on a prompt
router.post('/generate-text', aiController.getAIResponse);


module.exports = router;
