const { OpenAI } = require('openai');
const openai = new OpenAI();
const logger = require('../../shared/logger'); // Ensure this path is correct
const { ValidationError, OpenAIError } = require('../../middleware/errorHandler'); // Adjust the path and error names as necessary

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
    logger.info(`Generated text with GPT-3.5 Turbo: ${response}`);
    return response.choices[0].message.content.trim();
  } catch (error) {
    logger.error('Error with the OpenAI GPT-3.5 Turbo API', { error: error.message });
    // Use a more specific error if you have defined one, such as OpenAIError
    throw new OpenAIError('Failed to generate text from OpenAI GPT-3.5 Turbo API');
  }
};