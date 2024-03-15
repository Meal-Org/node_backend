-- AlterTable
ALTER TABLE "nutritional_info" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "nutritional_info" ADD CONSTRAINT "nutritional_info_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
