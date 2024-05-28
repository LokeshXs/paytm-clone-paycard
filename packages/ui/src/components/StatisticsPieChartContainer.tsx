import StatisticsPieChart from "./StatisticsPieChart";
import db from "@repo/database/client";
import { auth } from "@repo/web/auth";

export default async function StatisticsPieChartContainer() {
  const session = await auth();

  const walletAddMoney = await db.onRampTransactions.findMany({
    where: {
      AND: [
        {
          userId: session?.userId,
        },
        {
          status: "Success",
        },
      ],
    },
  });

  const totalWalletMoneyAdded = walletAddMoney.reduce((acc, currentVal) => {
    return acc + currentVal.amount;
  }, 0);

  const totalPeerTransafers = await db.p2pTransfers.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              fromUserId: session?.userId,
            },
            {
              toUserId: session?.userId,
            },
          ],
        },
        {
          status: "Success",
        },
      ],
    },
  });

  // console.log(totalPeerTransafers);


  const totalPeerSent= totalPeerTransafers.reduce((acc, currentVal) => {
    if(currentVal.fromUserId === session?.userId){

        return acc + currentVal.amount;
    }

    return acc
  }, 0);
  const totalPeerReceived= totalPeerTransafers.reduce((acc, currentVal) => {
    if(currentVal.toUserId === session?.userId){

        return acc + currentVal.amount;
    }

    return acc
  }, 0);

  // console.log('Total received',totalPeerReceived);
  // console.log('Total sent',totalPeerSent);

  return <StatisticsPieChart totalWalletMoneyAdded={totalWalletMoneyAdded/100} totalPeerReceived={totalPeerReceived/100} totalPeerSent={totalPeerSent/100} />;
}
