const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getNutritionalInfoByIngredientName = async (ingredientName) => {
    try {
        const ingredient = await prisma.ingredient.findUnique({
            where: { name: ingredientName },
            include: { nutritionalInfo: true },
        });
        if (!ingredient) {
            throw new Error(`Ingredient with name ${ingredientName} not found`);
        }
        return ingredient.nutritionalInfo;
    } catch (error) {
        console.error(`Failed to retrieve nutritional info for ${ingredientName}: ${error.message}`);
        throw error;
    }
};

exports.upsertNutritionalInfo = async (ingredientName, nutritionalData, userId) => {
    try {
        // Ensure the ingredient exists or create it
        const ingredient = await prisma.ingredient.upsert({
            where: { name: ingredientName },
            update: {},
            create: { 
                name: ingredientName,
                // Assuming a direct relation for demonstration
                userId: userId
            },
        });

        // Update or create nutritional information
        const nutritionalInfo = await prisma.nutritionalInfo.upsert({
            where: { ingredientId: ingredient.id },
            update: nutritionalData,
            create: {
                ...nutritionalData,
                ingredientId: ingredient.id,
            },
        });
        return nutritionalInfo;
    } catch (error) {
        console.error(`Failed to upsert nutritional information for ${ingredientName}: ${error.message}`);
        throw error;
    }
};
