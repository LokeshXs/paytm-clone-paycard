/*
  Warnings:

  - Added the required column `cvv` to the `paymentCards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "paymentCards" ADD COLUMN     "cvv" INTEGER NOT NULL;
