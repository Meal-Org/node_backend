const openai = require('../utils/openaiClient');
const logger = require('../../shared/logger'); // Assuming logger is now global
const { DatabaseError, ValidationError } = require('../../middleware/errorHandler'); // Adjust path as necessary

exports.generateText = async (prompt, maxTokens = 150) => {
  if (!prompt) {
    throw new ValidationError("Prompt cannot be empty");
  }

  try {
    logger.info(`Generating text for prompt: ${prompt}`);
    const response = await openai.createCompletion({
      model: "gpt-3.5-turbo", // Specific model for GPT-3.5 Turbo
      prompt: prompt,
      max_tokens: maxTokens,
      temperature: 0.7, // Adjust based on how creative you want the responses to be
      // Add any other parameters you need for your request
    });

    const responseText = response.data.choices[0].text.trim();
    logger.info(`Generated text with GPT-3.5 Turbo: ${responseText}`);
    return responseText;
  } catch (error) {
    logger.error('Error with the OpenAI GPT-3.5 Turbo API', { error: error.message });
    // Assuming API issues are categorized under DatabaseError or you might create a specific error class
    throw new DatabaseError('Failed to generate text from OpenAI GPT-3.5 Turbo API');
  }
};
