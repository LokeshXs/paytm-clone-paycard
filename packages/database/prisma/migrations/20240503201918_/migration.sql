/*
  Warnings:

  - Changed the type of `provider` on the `paymentCards` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CardProviders" AS ENUM ('visa', 'mastercard');

-- AlterTable
ALTER TABLE "paymentCards" DROP COLUMN "provider",
ADD COLUMN     "provider" "CardProviders" NOT NULL;

-- DropEnum
DROP TYPE "BankProviders";
