/*
  Warnings:

  - You are about to drop the column `startTime` on the `onRampTransactions` table. All the data in the column will be lost.
  - Added the required column `timestamp` to the `onRampTransactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "onRampTransactions" DROP COLUMN "startTime",
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL;
