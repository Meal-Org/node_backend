const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

exports.getNutrionalInfoByIngredientName = async (ingredientName) => {
    try {
        const ingredient = await prisma.ingredient.findUnique({
            where: {
                name: ingredientName,
            },
            include: {
                nutrionalInfo: true,
            },
        });
        if (!ingredient) {
            throw new Error('Ingredient with name ${ingredientName} not found')
        }
        return ingredientName.nutrionalInfo;
    }catch(error) {
        console.error(`Failed to retrieve nutrional info : ${error.message}`)
        throw error;
    }
};

exports.upsertnutrionalInfo = async (ingredientName, nutritionalData) => {
    try {
        const ingredient = await prisma.ingredient.upsert({
            where: {
                name: ingredientName,
            },
            update: {},
            create: {
                name: ingredientName,
            },
        });
        const nutrionalInfo = await prisma.nutrionalInfor.upsert({
            where: {
                ingredientId: ingredient.id,

            },
            update: nutritionalData,
            create: {
                ...nutritionalData,
                ingredientId: ingredient.id
            },
        });
        return nutrionalInfo;
    } catch(error) {
        console.error('Failed to upsert nutrional information: ${error.message}')
        throw error;
    }
}