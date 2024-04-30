/*
  Warnings:

  - You are about to drop the column `fromUserNumber` on the `p2pTransfers` table. All the data in the column will be lost.
  - You are about to drop the column `toUserNumber` on the `p2pTransfers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "p2pTransfers" DROP COLUMN "fromUserNumber",
DROP COLUMN "toUserNumber";
