import TransferAmountForm from "@repo/ui/transferform";
import TransferMoney from "../../../actions/transferMoney";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/tabs";
import TransactionCard from "@repo/ui/transactioncard";
import TransactionTabs from "@repo/ui/transactionTabs";

export default function P2PTransfer(){

  return (
    <main className="p-12 space-y-12"> 
    
    <h1 className="text-4xl font-bold text-primary">Transfer</h1>
      <div className="flex items-start gap-24  "> 

        <div className="max-w-[400px] w-full">
        <TransferAmountForm action={TransferMoney} />
        </div>

        <div className="flex-1">
        <div className=" max-w-[600px] w-full py-6 px-8 rounded-2xl space-y-6 ">
            <h2 className="text-2xl font-semibold text-primary">My Transactions</h2>
              <TransactionTabs defaultSelection="p2p" />
          </div>
        </div>
      </div>
    </main>
  )
}