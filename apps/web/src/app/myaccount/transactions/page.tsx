import { DataTable } from "@repo/ui/data-table";
import { Transaction, columns } from "@repo/ui/columns";
import { auth } from "../../../../auth";
import db from "@repo/database/client";
import { SessionProvider } from "next-auth/react";


async function getData(): Promise<Transaction[]> {
  const session = await auth();
  // Fetch data from your API here.

  const recentWalletTransactions = await db.onRampTransactions.findMany({
    where: {
      userId: session?.userId,
    },
  });

  // console.log(recentWalletTransactions);

  const recentP2PTransactions = await db.p2pTransfers.findMany({
    where: {
      OR: [
        {
          toUserId: session?.userId,
        },
        {
          fromUserId: session?.userId,
        },
      ],
    },
  });

  // console.log(recentWalletTransactions);

  const allTransactionsInOrder = [
    ...recentWalletTransactions,
    ...recentP2PTransactions,
  ]
    .sort((a, b) => {
      return  new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime() ;
    })
    .map((transferDetail) => ({
      id: transferDetail.id,
      amount: transferDetail.amount,
      status: transferDetail.status,
      invoice: transferDetail.id,
      name: "paymentCardId" in transferDetail ? "Wallet" : "Peer",
      date: transferDetail.timestamp,
      fromUserId: "fromUserId" in transferDetail? transferDetail.fromUserId:null,
      toUserId: "toUserId" in transferDetail? transferDetail.toUserId:null,
    }));
  return allTransactionsInOrder;
}

export default async function TransactionsPage() {
    const session = await auth();
  const data = await getData();

  return (
    <main className="p-12 container mx-auto w-full  ">
     

      <DataTable columns={columns} data={data} />
     
    </main>
  );
}
