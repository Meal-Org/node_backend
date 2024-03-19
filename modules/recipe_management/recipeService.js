const { PrismaClient } = require('@prisma/client');
const { NotFoundError } = require('../../middleware/errorHandler');
const prisma = new PrismaClient();


/**
 * Create a recipe with the given data.
 * @param {Object} recipeData - The data for the recipe to be created.
 * @returns {Promise<Object>} The created recipe.
 */
const createRecipe = async (recipeData) => {
    // Validate or transform recipeData as needed
    if (!recipeData.title) {
        throw new Error("Recipe title is required.");
    }

    try {
        const createdRecipe = await prisma.recipe.create({
            data: recipeData,
        });
        return createdRecipe;
    } catch (error) {
        throw new Error(`Failed to create recipe: ${error.message}`);
    }
};





const getRecipes = async () => {
    return await prisma.recipe.findMany();
};


const getRecipeById = async (id) => {
    const recipe = await prisma.recipe.findUnique({
        where: { id },
    });
    if (!recipe) {
        throw new NotFoundError(`Recipe ${id} not found.`);
    }
    return recipe;
};


const updateRecipe = async (id, recipeData) => {
    try {
        return await prisma.recipe.update({
            where: { id },
            data: recipeData,
        });
    } catch (e) {
        if (e.code === 'P2025') { // Corrected to the standard Prisma error code for "record not found"
            throw new NotFoundError(`Recipe ${id} not found.`);
        }
        throw e;
    }
};

const deleteRecipe = async (id) => {
    try {
        await prisma.recipe.delete({
            where: { id },
        });
    } catch (e) {
        if (e.code === 'P2025') {
            throw new NotFoundError(`Recipe ${id} not found.`);
        }
        throw e;
    }
};

module.exports = {
    createRecipe,
    getRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe,
};
