-- AlterTable
ALTER TABLE "onRampTransactions" ADD COLUMN     "paymentCardId" TEXT;

-- CreateTable
CREATE TABLE "paymentCards" (
    "id" TEXT NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "expirymonth" INTEGER NOT NULL,
    "expiryYear" INTEGER NOT NULL,
    "holderName" TEXT NOT NULL,
    "TimeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UserId" TEXT NOT NULL,

    CONSTRAINT "paymentCards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "paymentCards_cardNumber_key" ON "paymentCards"("cardNumber");

-- AddForeignKey
ALTER TABLE "onRampTransactions" ADD CONSTRAINT "onRampTransactions_paymentCardId_fkey" FOREIGN KEY ("paymentCardId") REFERENCES "paymentCards"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentCards" ADD CONSTRAINT "paymentCards_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
