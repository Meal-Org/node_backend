const aiService = require('../services/aiService');
const logger = require('../../shared/logger'); // Adjust the path as needed
const { ValidationError } = require('../../middleware/errorHandler'); // Adjust the path as needed

/**
 * Handles requests to generate text using the AI model.
 * @param {Express.Request} req The request object.
 * @param {Express.Response} res The response object.
 * @param {Function} next The next middleware function.
 */
exports.getAIResponse = async (req, res, next) => {
  const { prompt, maxTokens = 150, temperature = 0.7 } = req.body;

  // Basic validation
  if (!prompt) {

    const error = new ValidationError("Prompt cannot be empty.");
    return next(error);
  }

  try {
 
    const generatedText = await aiService.generateText(prompt, maxTokens, temperature);

    // Log the successful interaction
    logger.info('Text generated successfully.');

    res.json({ success: true, generatedText });
  } catch (error) {
    // Log the error and pass it to the global error handler
    logger.error('Failed to generate text', { error: error.message });
    next(error);
  }
};

/**
 * Additional functions to handle other AI-related interactions can be added here.
 * For example, analyzing text sentiment, summarizing content, etc., 
 * by making respective service calls to aiService with different parameters or methods.
 */
