// AIService.js
const { OpenAI } = require('openai');
const { PrismaClient } = require('@prisma/client');
const logger = require('../../shared/logger');
const { ValidationError, OpenAIError } = require('../../middleware/errorHandler');
const { analyzePrompt } = require('../nlp/nlpService');
const { getNutritionalInfoByIngredientName } = require('../nutrionalInformation/nutrionalService');
const { getRecipeById } = require('../recipe_management/recipeService');
require('dotenv').config();

const openai = new OpenAI(process.env.OPENAI_API_KEY);
const prisma = new PrismaClient();

const systemMessageTemplates = {
    general: "You are a helpful assistant specializing in food, knowledgeable about recipes, ingredients, and nutritional facts.",
    nutrition: "You are an expert in nutritional information, capable of providing detailed data on a wide range of ingredients.",
    recipe: "You can offer detailed recipes based on specified ingredients, cuisine types, and dietary preferences.",
    // Add more templates for other intents as needed
};

exports.handleUserPrompt = async (prompt, userId, maxTokens = 150) => {
    if (!prompt) throw new ValidationError("Prompt cannot be empty");

    const { intent, entities } = analyzePrompt(prompt);
    let systemMessage = systemMessageTemplates[intent] || systemMessageTemplates.general; // Default to general if intent not recognized
    let responseContent;

    try {
        switch (intent) {
            case "nutrition":
                // Handling nutritional information
                responseContent = entities.length > 0 ?
                  await getNutritionalInfoByIngredientName(entities[0]) :
                  "I'm not sure which ingredient you're asking about. Could you specify?";
                break;
            case "recipe":
                // Handling recipe information
                responseContent = entities.length > 0 ?
                  await getRecipeById(entities[0]) :
                  "I need to know the ingredient you're interested in for a recipe.";
                break;
            case "general":
            default:
                // Fallback to generating text with OpenAI, using a dynamic system message
                const response = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: systemMessage },
                        { role: "user", content: prompt },
                    ],
                    max_tokens: maxTokens,
                });
                responseContent = response.choices[0].message.content.trim();
                break;
        }

        // In the part of your AIService where you create the Interaction
        await prisma.interaction.create({
            data: {
                userQuery: prompt,
                aiResponse: responseContent,
                userId: userId || null, // Correctly handling nullable userId
            },
        });

        return responseContent;
    } catch (error) {
        logger.error('Error with AI Service', { error: error.message, prompt });
        throw new OpenAIError('Failed to process the request. ' + error.message); // Including original error message for context
    }
};
