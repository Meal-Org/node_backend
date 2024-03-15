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
        throw new NotFoundError(`recipe ${id} not found`);
    }

};

const updateRecipe = async (id, recipeData) => {
    const recipe = await prisma.recipe.update({
        where: { id },
        data: recipeData,
    }).catch(e => {
        if (e.code === 'P205') {
            throw new NotFoundError(`recipe ${id} not found`);
        }
        throw e;

    })
    return recipe;
};

const deleteRecipe = async (id) => {
     await prisma.recipe.delete({
        where: { id },
    }).catch (e => {
        if (e.code === 'P205') {
            throw new NotFoundError(`recipe ${id} not found`);
        }
        throw e;

    })
};

module.exports = {
    createRecipe,
    getRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe,
};
