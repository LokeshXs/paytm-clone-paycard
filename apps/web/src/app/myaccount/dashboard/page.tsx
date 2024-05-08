import db from "../../../lib/db";
import { auth } from "../../../../auth";
import { formattCurrency } from "@repo/ui/formatcurrency";
import MoneyFlowContainer from "@repo/ui/MoneyFlowContainer";


export default async function DashboardPage() {
  const session = await auth();

  const balance = await db.balance.findUnique({
    where: {
      userId: session?.userId,
    },
  });

  const totalBalance = formattCurrency(balance?.amount || 0);



  return (
    <main className="p-12 flex">
      <div className="flex-[2]">
        <MoneyFlowContainer />
      </div>
      <div className="flex-1  p-4">
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
      </div>
    </main>
  );
}
