import TransactionCard from "./TransactionCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import db from "@repo/web/db";
import {auth} from "@repo/web/auth";
import P2PTransactionCard from "./P2PTransactionCard";

type Props = {
    defaultSelection:string
}

export default async function TransactionTabs({defaultSelection}:Props){

    const session = await auth();
    

    const onRampTransactions = await db.onRampTransactions.findMany({
        where:{
            userId:session?.userId
        }
    })

    const p2pTransactions = await db.p2pTransfers.findMany({
        where:{
            OR:[
                {
                    toUserId:session?.userId
                },
                {
                    fromUserId:session?.userId
                }
            ]
        }
    })
    const p2pSentTransactions = await db.p2pTransfers.findMany({
        where:{
          fromUserId:session?.userId
        }
    })
    const p2pReceivedTransactions = await db.p2pTransfers.findMany({
        where:{
          toUserId:session?.userId
        }
    })
 

 
    return (
        <Tabs defaultValue= {defaultSelection} className="w-[400px] ">
        <TabsList className="bg-primary">
          <TabsTrigger value="all" className="data-[state=active]:bg-secondary text-secondary data-[state=active]:text-primary  ">All Transactions</TabsTrigger>
          <TabsTrigger value="p2p" className="data-[state=active]:bg-secondary text-secondary  data-[state=active]:text-primary   "> P2P Transactions</TabsTrigger>
          <TabsTrigger value="sent" className="data-[state=active]:bg-secondary text-secondary  data-[state=active]:text-primary   "> Sent</TabsTrigger>
          <TabsTrigger value="received" className="data-[state=active]:bg-secondary text-secondary  data-[state=active]:text-primary   "> Received</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <ul className="space-y-6">
            {onRampTransactions.map((transactionDetails) => (
              <li key={transactionDetails.id}>
                <TransactionCard
                  transactionId={transactionDetails.id}
                  status={transactionDetails.status}
                  date={transactionDetails.startTime}
                  amount={transactionDetails.amount}
                  provider={transactionDetails.provider}
                />
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="p2p">
        <ul className="space-y-6">
            {p2pTransactions.map((transactionDetails) => (
              <li key={transactionDetails.id}>
                <P2PTransactionCard
                 date={transactionDetails.timestamp}
                 amount={transactionDetails.Amount}
                 fromUserId={transactionDetails.fromUserId}
                 toUserId={transactionDetails.toUserId}
                 userId = {session?.userId || ""} 
                />
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="sent">
        <ul className="space-y-6">
            {p2pSentTransactions.map((transactionDetails) => (
              <li key={transactionDetails.id}>
                <P2PTransactionCard
                 date={transactionDetails.timestamp}
                 amount={transactionDetails.Amount}
                 fromUserId={transactionDetails.fromUserId}
                 toUserId={transactionDetails.toUserId}
                 userId = {session?.userId || ""} 
                />
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="received">
        <ul className="space-y-6">
            {p2pReceivedTransactions.map((transactionDetails) => (
              <li key={transactionDetails.id}>
                <P2PTransactionCard
                 date={transactionDetails.timestamp}
                 amount={transactionDetails.Amount}
                 fromUserId={transactionDetails.fromUserId}
                 toUserId={transactionDetails.toUserId}
                 userId = {session?.userId || ""} 
                />
              </li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>
    )
}