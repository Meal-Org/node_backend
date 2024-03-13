const { PrismaClient } = require('@prisma/client');
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
  return await prisma.recipe.findUnique({
    where: { id },
  });
};

const updateRecipe = async (id, recipeData) => {
  return await prisma.recipe.update({
    where: { id },
    data: recipeData,
  });
};

const deleteRecipe = async (id) => {
  return await prisma.recipe.delete({
    where: { id },
  });
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
