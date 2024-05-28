import AddMoneyform from "@repo/ui/addmoneyform";
import { auth } from "../../../../auth";
import db from "../../../lib/db";
import { addMoney } from "../../../actions/addMoney";
import { formattCurrency } from "@repo/ui/formatcurrency";
import TransactionTabs from "@repo/ui/transactionTabs";
import {
  CreditCard,
  LayoutDashboard,
  SmartphoneNfc,
  ScrollText,
  AreaChart,
} from "lucide-react";
import { Button } from "@repo/ui/button";
import Link from "next/link";
import Image from "next/image";
import AddCard from "@repo/ui/addcard";
import addPaymentCard from "../../../actions/AddCard";

export default async function DashboardView() {
  const session = await auth();

  const balance = await db.balance.findUnique({
    where: {
      userId: session?.userId,
    },
  });

  const paymentCards = await db.paymentCards.findMany({
    where: {
      UserId: session?.userId,
    },
  });

  const totalBalance = formattCurrency(balance?.amount || 0);
  const totalLockedBalance = formattCurrency(balance?.locked || 0);

  return (
    <main className="p-12 max-lg:p-4 max-sm:pl-14 space-y-12">
      <h1 className="text-4xl max-sm:text-3xl font-bold">My Wallet</h1>
      <div className="flex items-start gap-24 max-xl:gap-8  ">
        <section className="flex-1 flex flex-col items-start justify-center space-y-12">
          <div className="space-y-6 py-6 px-8 border-[1px]   w-full rounded-2xl  ">
            <h2 className="text-2xl max-sm:text-xl font-semibold text-primary">My Balance</h2>
            <div className="space-y-4">
              <div>
                <p className="text-5xl max-sm:text-3xl font-semibold">{totalBalance}</p>
              </div>
            </div>
          </div>

          <div className="bg-primary  w-full py-6 px-8 rounded-2xl space-y-6">
            <h2 className="text-2xl max-xl:text-xl font-semibold text-background">
              Add Money
            </h2>
            <AddMoneyform action={addMoney} savedCards={paymentCards} />
          </div>

          <div className="w-full">
            <AddCard action={addPaymentCard} />
            <div className="py-6 px-14 max-xl:px-6 space-y-6 max-h-[400px] overflow-y-scroll">
              {paymentCards.map((cardDetails) => (
                <div className="h-64 min-w-[400px] bg-primary rounded-2xl flex flex-col overflow-hidden ">
                  <div className="px-6 py-4 bg-secondary flex items-center justify-between ">
                    <CreditCard className=" w-12 h-12  text-primary" />
                    <p className="text-2xl font-semibold text-primary">
                      {cardDetails.cardNumber.replace(/(\d{4})/g, "$1 ")}
                    </p>
                  </div>
                  <div className="flex-1 px-8 py-20 flex justify-between ">
                    <div>
                      <p className="text-2xl font-semibold text-background">
                        {cardDetails.provider}
                      </p>
                      <p className="text-xl h-fit w-fit text-muted">
                        {cardDetails.holderName}
                      </p>
                    </div>
                    <Image
                      src="/icons/mastercard.svg"
                      width={60}
                      height={60}
                      alt="mastercard"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex-[1.5] flex flex-col items-start justify-center space-y-12">
          <div className="w-full py-6 px-8 rounded-2xl space-y-6  ">
            <h2 className="text-2xl font-semibold text-primary">Quick Links</h2>
            <div className="flex justify-around gap-2 flex-wrap">
              <Link href="/myaccount/dashboard">
                <div className="flex flex-col items-center border py-4 px-6 rounded-2xl hover:bg-muted min-w-40 ">
                  <div className="p-4 bg-muted text-primary w-fit rounded-full ">
                    <LayoutDashboard />
                  </div>
                  <p className=" text-primary">Dashboard</p>
                </div>
              </Link>

              <Link href="/myaccount/p2ptransfer">
                <div className="flex flex-col items-center border py-4 px-6 rounded-2xl hover:bg-muted min-w-40  ">
                  <div className="p-4 bg-muted text-primary w-fit rounded-full ">
                    <SmartphoneNfc />
                  </div>
                  <p className=" text-primary">Send</p>
                </div>
              </Link>

              <Link href="/myaccount/transactions">
                <div className="flex flex-col items-center border py-4 px-6 rounded-2xl hover:bg-muted min-w-40  ">
                  <div className="p-4 bg-muted text-primary w-fit rounded-full ">
                    <ScrollText />
                  </div>
                  <p className=" text-primary">Transactions</p>
                </div>
              </Link>

              <Link href="/myaccount/dashboard">
                <div className="flex flex-col items-center border py-4 px-6 rounded-2xl hover:bg-muted min-w-40  ">
                  <div className="p-4 bg-muted text-primary w-fit rounded-full ">
                    <AreaChart />
                  </div>
                  <p className=" text-primary">Spent view</p>
                </div>
              </Link>
            </div>
          </div>

          <div className=" w-full py-6 px-8 rounded-2xl space-y-6  ">
            <h2 className="text-2xl font-semibold">My Transactions</h2>
            <TransactionTabs defaultSelection="all" />
          </div>
        </section>
      </div>
    </main>
  );
}
