

import AddMoneyform from "@repo/ui/addmoneyform";
import { auth } from "../../../../auth";
import db from "../../../lib/db";
import { addMoney } from "../../../actions/addMoney";
import { formattCurrency } from "@repo/ui/formatcurrency";
import TransactionTabs from "@repo/ui/transactionTabs";
export default async function DashboardView() {
  const session = await auth();

  const balance = await db.balance.findUnique({
    where: {
      userId: session?.userId,
    },
  });

  const totalBalance = formattCurrency(balance?.amount || 0);
  const totalLockedBalance = formattCurrency(balance?.locked || 0);

  return (
    <main className="p-12 space-y-12">

      <h1 className="text-4xl font-bold">My Wallet</h1>
      <div className="flex items-start gap-24  ">
        <section className="flex-1 flex flex-col items-start justify-center space-y-12">
          <div className="bg-muted  w-full py-6 px-8 rounded-2xl space-y-6">
            <h2 className="text-2xl font-semibold">Add Money</h2>
            <AddMoneyform action={addMoney} />
          </div>
          <div className="space-y-6 py-6 px-8 border-[1px] border-primary  w-full rounded-2xl  ">
            <h2 className="text-2xl font-semibold text-primary" >My Balance</h2>
            <div className="space-y-4">
              <div>
                <h6 className="text-lg text-muted-foreground">
                  Locked Balance
                </h6>
                <p className="text-3xl font-medium">{totalLockedBalance}</p>
              </div>
              <div>
                <h6 className="text-lg text-muted-foreground">Total Balance</h6>
                <p className="text-3xl font-medium">{totalBalance}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex-[1.5] flex flex-col items-start justify-center space-y-12">
          <div className=" max-w-[600px] w-full py-6 px-8 rounded-2xl space-y-6 ">
            <h2 className="text-2xl font-semibold">My Transactions</h2>
            <TransactionTabs defaultSelection="all" />
          </div>
        </section>
      </div>
    </main>
  );
}
