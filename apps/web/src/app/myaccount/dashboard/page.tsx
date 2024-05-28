import db from "../../../lib/db";
import { auth } from "../../../../auth";
import { formattCurrency } from "@repo/ui/formatcurrency";
import MoneyFlowContainer from "@repo/ui/MoneyFlowContainer";
import { Button } from "@repo/ui/button";
import RecentTransactionCard from "@repo/ui/RecentTransactionCard";
import StatisticsPieChartContainer from "@repo/ui/StatisticsPieChartContainer";

export default async function DashboardPage() {
  const session = await auth();

  const balance = await db.balance.findUnique({
    where: {
      userId: session?.userId,
    },
  });

  const totalBalance = formattCurrency(balance?.amount || 0);

  const recentWalletTransactions = await db.onRampTransactions.findMany({
    where: {
      userId: session?.userId,
    },
    take: 3,
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

    take: 3,
  });

  // console.log(recentWalletTransactions);

  const allTransactionsInOrder = [
    ...recentWalletTransactions,
    ...recentP2PTransactions,
  ].sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime() ;
  }).slice(0,3);

  // console.log(allTransactionsInOrder);

  return (
    <main className="p-12 flex">
      <div className="flex-[2] space-y-12">
        <div className="p-6 bg-primary text-background space-y-4 rounded-2xl">
          <p className="font-bold text-2xl">Unlimited Cashback</p>
          <p className=" text-lg text-muted">
            Instant 2% cashback on your first 5 spend to your wallet
          </p>
          <Button className=" bg-secondary text-primary hover:bg-secondary">
            DOWNLOAD APP
          </Button>
        </div>
        <div className=" max-h-80 h-full space-y-3 ">
          <h3 className="text-2xl font-medium">Moneyflow</h3>
          <MoneyFlowContainer />
        </div>

        <div className="space-y-3 pt-12">
          <div className=" flex justify-between">
            <h3 className="text-2xl font-medium">Recent Transactions</h3>
            <Button className=" bg-muted hover:bg-muted text-primary shadow-none border-primary border-[1px]">View all</Button>
          </div>

          <div className=" space-y-4 pt-6">
            {allTransactionsInOrder.length === 0 && <div className=" flex justify-center pt-6">
      <p className=" text-muted-foreground">No transaction made yet</p>
    </div>}
            {allTransactionsInOrder.map((transactionDetails) => {
              if (!("paymentCardId" in transactionDetails)) {
                if (session?.userId === transactionDetails.toUserId) {
                  if (transactionDetails.status === "Success") {
                    <RecentTransactionCard
                      key={transactionDetails.timestamp.toString()}
                      type={
                        "paymentCardId" in transactionDetails
                          ? "Wallet"
                          : "Peer"
                      }
                      amount={transactionDetails.amount}
                      date={transactionDetails.timestamp}
                      status={transactionDetails.status}
                    />;
                  }
                }
              }
              return (
                <RecentTransactionCard
                  key={transactionDetails.timestamp.toString()}
                  type={
                    "paymentCardId" in transactionDetails ? "Wallet" : "Peer"
                  }
                  amount={transactionDetails.amount}
                  date={transactionDetails.timestamp}
                  status={transactionDetails.status}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex-1  p-4 space-y-20">
        <div className="space-y-3 ">
          <h3 className="text-2xl font-medium">Wallet</h3>
          <div className="h-64 min-w-[300px] bg-primary rounded-2xl flex flex-col overflow-hidden max-w-[400px]">
            <div className="flex-1 p-2 flex items-end">
              <p className="text-xl text-primary-foreground h-fit w-fit">
                {session?.user?.name}
              </p>
            </div>
            <div className="px-6 py-6 bg-secondary ">
              <p className="text-4xl font-semibold text-primary">
                {totalBalance}
              </p>
            </div>
          </div>
        </div>

        <div className=" max-h-80 h-full space-y-3 ">
          <h3 className="text-2xl font-medium">Statistics</h3>
              <StatisticsPieChartContainer />
          </div>
      </div>
    </main>
  );
}
