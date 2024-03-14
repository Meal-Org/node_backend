const { OpenAI } = require('openai');
const logger = require('../../shared/logger'); // Adjust path as necessary
const { ValidationError, OpenAIError } = require('../../middleware/errorHandler'); // Adjust paths and error names as necessary
require('dotenv').config();

const openai = new OpenAI();

exports.generateText = async (prompt, maxTokens = 150) => {
  if (!prompt) {
    throw new ValidationError("Prompt cannot be empty");
  }

  try {
    logger.info(`Generating text for prompt: ${prompt}`);
    // Using the updated method call for chat completions
    const response = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }],
      model: "gpt-3.5-turbo",
    });

    // Assuming the structure of the response is correct as per the OpenAI API format
    // Ensure the correct path to access the generated text based on the actual response structure
    const responseText = response.data.choices[0].message.content.trim();
    logger.info(`Generated text with GPT-3.5 Turbo: ${responseText}`);
    return responseText;
  } catch (error) {
    logger.error('Error with the OpenAI GPT-3.5 Turbo API', { error: error.message });
    throw new OpenAIError('Failed to generate text from OpenAI GPT-3.5 Turbo API');
  }
};
