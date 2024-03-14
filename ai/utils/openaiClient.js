const openai = require('./openaiClient');
const logger = require('../../shared/logger'); // Adjust path as necessary
const { ValidationError, OpenAIError } = require('../../middleware/errorHandler'); // Adjust paths and error names as necessary

exports.generateText = async (prompt, maxTokens = 150) => {
  if (!prompt) {
    throw new ValidationError("Prompt cannot be empty");
  }

  try {
    logger.info(`Generating text for prompt: ${prompt}`);
    // Using the updated method call for chat completions
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: 'user', content: prompt }
      ],
      max_tokens: maxTokens,
      temperature: 0.7,
      // Include any other necessary parameters
    });

    // Assuming the structure of the response is correct as per the OpenAI API format
    const responseText = response.data.choices[0].message.content.trim();
    logger.info(`Generated text with GPT-3.5 Turbo: ${responseText}`);
    return responseText;
  } catch (error) {
    logger.error('Error with the OpenAI GPT-3.5 Turbo API', { error: error.message });
    // Using a more specific error if available or a generic one if not
    throw new OpenAIError('Failed to generate text from OpenAI GPT-3.5 Turbo API');
  }
};
