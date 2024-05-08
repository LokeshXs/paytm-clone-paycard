-- DropForeignKey
ALTER TABLE "onRampTransactions" DROP CONSTRAINT "onRampTransactions_paymentCardId_fkey";

-- AddForeignKey
ALTER TABLE "onRampTransactions" ADD CONSTRAINT "onRampTransactions_paymentCardId_fkey" FOREIGN KEY ("paymentCardId") REFERENCES "paymentCards"("cardNumber") ON DELETE SET NULL ON UPDATE CASCADE;
