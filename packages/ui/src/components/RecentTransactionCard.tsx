import { Wallet, UsersRound } from "lucide-react";
import { formattCurrency } from "../lib/formatting";
import clsx from "clsx";

type Props = {
    type:'Wallet'|'Peer',
    date: Date,
    amount: number,
    status:string
}

export default function RecentTransactionCard({type,date,amount,status}:Props) {

    const formattedAmount = formattCurrency(amount);
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        {type ==="Wallet" && <span className=" inline-block p-3 rounded-lg bg-[#f8edd9]  ">
          <Wallet className=" text-[#f9b73d]" />
        </span>}
        {type ==="Peer" && <span className=" inline-block p-3 rounded-lg bg-[#c4ebc9]  ">
          <UsersRound className=" text-[#93da9d]" />
        </span>}

        <p className=" text-lg font-medium">{type}</p>
      </div>

      <div>
        <p className=" text-base text-pretty">{date.toLocaleDateString()}</p>
        <p className=" text-xs text-muted-foreground text-pretty">{date.toLocaleTimeString()}</p>
      </div>

      <div>
        <p className={clsx("text-xl font-semibold", {
          "text-green-500": status === "Success",
          "text-red-500": status === "Failed",
          "text-muted-foreground":
            status === "Processing",
        })}>{formattedAmount}</p>
      </div>

      <div>
        <p className="px-4 py-2 bg-primary text-background rounded-lg">{status}</p>
      </div>
    </div>
  );
}
