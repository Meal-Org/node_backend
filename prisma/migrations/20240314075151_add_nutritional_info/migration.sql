-- CreateTable
CREATE TABLE "nutritional_info" (
    "id" SERIAL NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "calories" DOUBLE PRECISION,
    "fatTotal" DOUBLE PRECISION,
    "saturatedFat" DOUBLE PRECISION,
    "cholesterol" DOUBLE PRECISION,
    "sodium" DOUBLE PRECISION,
    "carbohydrate" DOUBLE PRECISION,
    "fiber" DOUBLE PRECISION,
    "sugars" DOUBLE PRECISION,
    "protein" DOUBLE PRECISION,

    CONSTRAINT "nutritional_info_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "nutritional_info_ingredientId_key" ON "nutritional_info"("ingredientId");

-- AddForeignKey
ALTER TABLE "nutritional_info" ADD CONSTRAINT "nutritional_info_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
