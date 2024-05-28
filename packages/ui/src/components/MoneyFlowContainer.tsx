import MoneyflowChart from "./MoneyFlowChart";
import db from "@repo/database/client";
import { auth } from "@repo/web/auth";

export default async function MoneyFlowContainer() {
  const session = await auth();
  const userId = session?.userId;

  const oneDayAgo = new Date();

  const unixTime1200SecAgo =
    (Math.floor(oneDayAgo.getTime() / 1000) - 1200) * 1000;
  // console.log(oneDayAgo.getTime()/1000);
  // console.log(Math.floor(oneDayAgo.getTime()/1000) - 60);
  // console.log(new Date((Math.floor(oneDayAgo.getTime()/1000) - 60)*1000).toISOString())

  // console.log(currentDate);
  const dataToFetchForInSec = [120, 300, 600, 900, 1200];
  const chartData = [];

  const currentBalance = await db.balance.findUnique({
    where: {
      userId,
    },
  });

  const currentWalletBalance = currentBalance?.amount || 0

  chartData.push(currentWalletBalance/100);

  const oneDayDataOnRamp = await db.onRampTransactions.findMany({
    where: {
      status: "Success",
      userId: userId,
      timestamp: {
        gte: new Date(unixTime1200SecAgo).toISOString(),
      },
    },
  });
  const oneDayDataOnRampTotal = oneDayDataOnRamp.reduce((acc, currentVal) => {
    return acc + currentVal.amount;
  }, 0);

  const oneDayDataReceived = await db.p2pTransfers.findMany({
    where: {
      status: "Success",
      toUserId: userId,
      timestamp: {
        gte: new Date(unixTime1200SecAgo).toISOString(),
      },
    },
  });

  const oneDayDataSent = await db.p2pTransfers.findMany({
    where: {
      status: "Success",
      fromUserId: userId,
      timestamp: {
        gte: new Date(unixTime1200SecAgo).toISOString(),
      },
    },
  });

  dataToFetchForInSec.forEach((time) => {
    const onRamp = oneDayDataOnRamp.map((details) => {
      if (
        new Date((Math.floor(oneDayAgo.getTime() / 1000) - time) * 1000) <
        details.timestamp
      ) {
        return details;
      }
    });
    // console.log(onRamp);

    const onRampTotal = onRamp.reduce((acc, currentVal) => {
      if (!currentVal) {
        return 0;
      }
      return acc + currentVal?.amount;
    }, 0);
    // console.log(onRampTotal);
    // Received

    const received = oneDayDataReceived.map((details) => {
      if (
        new Date((Math.floor(oneDayAgo.getTime() / 1000) - time) * 1000) <
        details.timestamp
      ) {
        return details;
      }
    });

    const receivedTotal = received.reduce((acc, currentVal) => {
        if (!currentVal) {
            return 0;
          }
          return acc + currentVal?.amount;
    }, 0);

    // Sent

    const sent = oneDayDataSent.map((details) => {
      if (
        new Date((Math.floor(oneDayAgo.getTime() / 1000) - time) * 1000) <
        details.timestamp
      ) {
        return details;
      }
    });

    

    const sentTotal = sent.reduce((acc, currentVal) => {
        if (!currentVal) {
            return 0;
          }
          return acc + currentVal?.amount;
    }, 0);
    console.log(onRampTotal); 
    console.log(receivedTotal); 
    console.log(sentTotal);  
    chartData.push((currentWalletBalance - (onRampTotal + receivedTotal )+ sentTotal)/100);
    // console.log()
  }); 

  console.log(chartData);  
  return <MoneyflowChart chartData={chartData} />;
}
