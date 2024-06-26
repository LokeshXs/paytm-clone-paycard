import TransactionCard from "./TransactionCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import db from "@repo/web/db";
import { auth } from "@repo/web/auth";
import P2PTransactionCard from "./P2PTransactionCard";

type Props = {
  defaultSelection: string;
};

export default async function TransactionTabs({ defaultSelection }: Props) {
  const session = await auth();

  const onRampTransactions = await db.onRampTransactions.findMany({
    where: {
      userId: session?.userId,
    },
  });

  const sortedOnRampTransactions = onRampTransactions.sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  const p2pTransactions = await db.p2pTransfers.findMany({
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

  const sortedP2pTransactions = p2pTransactions.sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  const p2pSentTransactions = await db.p2pTransfers.findMany({
    where: {
      fromUserId: session?.userId,
    },
  });

  const sortedP2pSentTransactions = p2pSentTransactions.sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  const p2pReceivedTransactions = await db.p2pTransfers.findMany({
    where: {
      toUserId: session?.userId,
    },
  });

  const sortedP2pReceivedTransactions = p2pReceivedTransactions.sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  return (
    <Tabs defaultValue={defaultSelection} className="w-full">
      <TabsList className="bg-primary w-full justify-around">
        <TabsTrigger
          value="all"
          className="data-[state=active]:bg-secondary text-secondary data-[state=active]:text-primary  "
        >
          Wallet Transactions
        </TabsTrigger>
        <TabsTrigger
          value="p2p"
          className="data-[state=active]:bg-secondary text-secondary  data-[state=active]:text-primary   "
        >
          {" "}
          P2P Transactions
        </TabsTrigger>
        <TabsTrigger
          value="sent"
          className="data-[state=active]:bg-secondary text-secondary  data-[state=active]:text-primary   "
        >
          {" "}
          Sent
        </TabsTrigger>
        <TabsTrigger
          value="received"
          className="data-[state=active]:bg-secondary text-secondary  data-[state=active]:text-primary   "
        >
          {" "}
          Received
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all" className=" max-h-[600px] overflow-y-auto">
      {sortedOnRampTransactions.length === 0 && <div className=" flex justify-center pt-6">
      <p className=" text-muted-foreground">No transaction made yet</p>
    </div>}
        <ul className="space-y-6">
          {sortedOnRampTransactions.map((transactionDetails) => (
            <li key={transactionDetails.id}>
              <TransactionCard
                transactionId={transactionDetails.id}
                status={transactionDetails.status}
                date={transactionDetails.timestamp}
                amount={transactionDetails.amount}
                cardId={transactionDetails.paymentCardId || ""}
                key={transactionDetails.id}
              />
            </li>
          ))}
        </ul>
      </TabsContent>
      <TabsContent value="p2p">
      {sortedP2pTransactions.length === 0 && <div className=" flex justify-center pt-6">
      <p className=" text-muted-foreground">No transaction made yet</p>
    </div>}
        <ul className="space-y-6">
          {sortedP2pTransactions.map((transactionDetails) => {
            if (session?.userId === transactionDetails.toUserId) {
              if (transactionDetails.status === "Success") {
                return (
                  <li key={transactionDetails.id}>
                    <P2PTransactionCard
                      date={transactionDetails.timestamp}
                      amount={transactionDetails.amount}
                      fromUserId={transactionDetails.fromUserId}
                      toUserId={transactionDetails.toUserId}
                      userId={session?.userId || ""}
                      status={transactionDetails.status}
                    />
                  </li>
                );
              }
            } else {
              return (
                <li key={transactionDetails.id}>
                  <P2PTransactionCard
                    date={transactionDetails.timestamp}
                    amount={transactionDetails.amount}
                    fromUserId={transactionDetails.fromUserId}
                    toUserId={transactionDetails.toUserId}
                    userId={session?.userId || ""}
                    status={transactionDetails.status}
                  />
                </li>
              );
            }
          })}
        </ul>
      </TabsContent>
      <TabsContent value="sent">
      {sortedP2pSentTransactions.length === 0 && <div className=" flex justify-center pt-6">
      <p className=" text-muted-foreground">No transaction made yet</p>
    </div>}
        <ul className="space-y-6">
          {sortedP2pSentTransactions.map((transactionDetails) => (
            <li key={transactionDetails.id}>
              <P2PTransactionCard
                date={transactionDetails.timestamp}
                amount={transactionDetails.amount}
                fromUserId={transactionDetails.fromUserId}
                toUserId={transactionDetails.toUserId}
                userId={session?.userId || ""}
                status={transactionDetails.status}
              />
            </li>
          ))}
        </ul>
      </TabsContent>
      <TabsContent value="received">
      {sortedP2pReceivedTransactions.length === 0 && <div className=" flex justify-center pt-6">
      <p className=" text-muted-foreground">No transaction made yet</p>
    </div>}
        <ul className="space-y-6">
          {sortedP2pReceivedTransactions.map((transactionDetails) => {
            if (session?.userId === transactionDetails.toUserId) {
              if (transactionDetails.status === "Success") {
                return (
                  <li key={transactionDetails.id}>
                    <P2PTransactionCard
                      date={transactionDetails.timestamp}
                      amount={transactionDetails.amount}
                      fromUserId={transactionDetails.fromUserId}
                      toUserId={transactionDetails.toUserId}
                      userId={session?.userId || ""}
                      status={transactionDetails.status}
                    />
                  </li>
                );
              }
            } else {
              return (
                <li key={transactionDetails.id}>
                  <P2PTransactionCard
                    date={transactionDetails.timestamp}
                    amount={transactionDetails.amount}
                    fromUserId={transactionDetails.fromUserId}
                    toUserId={transactionDetails.toUserId}
                    userId={session?.userId || ""}
                    status={transactionDetails.status}
                  />
                </li>
              );
            }
          })}
        </ul>
      </TabsContent>
    </Tabs>
  );
}
