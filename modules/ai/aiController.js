const aiService = require('./aiService'); // Adjust path as necessary
const logger = require('../../shared/logger'); // Ensure this path is correct

exports.getAIResponse = async (req, res) => {
    try {
        const prompt = req.body.prompt;
        // Extract userId from verified token; null if not authenticated
        const userId = req.user ? req.user.id : null;

        // Validate the prompt
        if (!prompt) {
            logger.warn('Empty prompt received');
            return res.status(400).json({ message: "Prompt cannot be empty" });
        }

        // Generate the response text using the AI service
        const responseText = await aiService.handleUserPrompt(prompt, userId, 150); // Assuming maxTokens is 150

        // Log the received response
        logger.info(`Response received for prompt: ${prompt} | Response: ${responseText}`);

        // Constructing a response similar to the OpenAI Chat Completions API format
        const apiResponseFormat = {
            choices: [{
                finish_reason: "stop",
                index: 0,
                message: {
                    content: responseText,
                    role: "assistant"
                },
                logprobs: null
            }],
            created: Date.now(),
            id: "chatcmpl-" + Math.random().toString(36).substr(2, 16), // Example ID
            model: "gpt-3.5-turbo",
            object: "chat.completion",
            usage: {
                completion_tokens: responseText.split(/\s+/).length,
                prompt_tokens: prompt.split(/\s+/).length,
                total_tokens: prompt.split(/\s+/).length + responseText.split(/\s+/).length
            }
        };

        // Log the final API response format before sending
        logger.info(`Sending response: ${JSON.stringify(apiResponseFormat)}`);

        res.json(apiResponseFormat);
    } catch (error) {
        // Log errors with error level
        logger.error("Error in getAIResponse: ", error);

        res.status(500).json({ message: "An error occurred while generating the response." });
    }
};
