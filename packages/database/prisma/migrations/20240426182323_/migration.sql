-- CreateTable
CREATE TABLE "p2pTransfers" (
    "id" TEXT NOT NULL,
    "toUserId" TEXT NOT NULL,
    "fromUserId" TEXT NOT NULL,
    "toUserNumber" TEXT NOT NULL,
    "fromUserNumber" TEXT NOT NULL,
    "Amount" INTEGER NOT NULL,

    CONSTRAINT "p2pTransfers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "p2pTransfers" ADD CONSTRAINT "p2pTransfers_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "p2pTransfers" ADD CONSTRAINT "p2pTransfers_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
