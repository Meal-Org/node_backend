// aiController.js

const aiService = require('../services/aiService'); // Adjust path as necessary

exports.getAIResponse = async (req, res) => {
  try {
    const prompt = req.body.prompt;
    if (!prompt) {
      return res.status(400).send({ message: "Prompt cannot be empty" });
    }
    const responseText = await aiService.generateText(prompt);
    res.send({ response: responseText });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
