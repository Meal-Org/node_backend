const { PrismaClient } = require('@prisma/client');
const { NotFoundError } = require('../../middleware/errorHandler');
const prisma = new PrismaClient();

const createRecipe = async (recipeData) => {
    return await prisma.recipe.create({
        data: recipeData,
    });
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
