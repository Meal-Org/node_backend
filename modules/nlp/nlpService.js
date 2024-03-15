// nlpService.js

const nlp = require('compromise');

const analyzePrompt = (prompt) => {
    const doc = nlp(prompt);
    let intent = "general";
    let entities = [];

    // Define intents based on keywords or phrases
    if (doc.has('nutritional info')) {
        intent = "nutrition";
    } else if (doc.has('recipe')) {
        intent = "recipe";
    }

    // Example of extracting entities - customize as needed
    // This is a simplistic approach; consider refining it based on your use case
    entities = doc.nouns().out('array');

    return { intent, entities };
};

module.exports = { analyzePrompt };
