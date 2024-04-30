"use client";

import clsx from "clsx";
import { Badge } from "./ui/badge";
import { formattCurrency } from "../lib/formatting";
import db from "@repo/web/db";
import { useState } from "react";

type TransactionCardProps = {
  transactionId: string;
  status: string;
  date: Date;
  amount: number;
  provider: string;
};
export default function TransactionCard({
  transactionId,
  status,
  date,
  amount,
  provider,
}: TransactionCardProps) {
  const [transactionStatus, setTransactionStatus] = useState(status);
  const formattedAmount = formattCurrency(amount);

  if (transactionStatus !== "Success") {
    const intervalId = setInterval(async () => {
      if (transactionStatus === "Success") {
        clearInterval(intervalId);
      }
      const res = await fetch(
        `http://localhost:3000/api/transaction/${transactionId}`,
        {
          cache: "no-store",
        }
      );

      const data = await res.json();

      setTransactionStatus(data.status);
    }, 5000);
  }

  return (
    <div className="flex items-center justify-between max-w-[400px] w-full bg-muted px-6 py-2 rounded-2xl">
      <div className="space-y-2 ">
        <p
          className="text-primary font-semibold text-xl"
        >
          {transactionStatus === "Processing"
            ? "Processing..."
            : transactionStatus}
        </p>
        <span className="px-1 py-0.5 inline-block rounded border-[1px]  border-primary text-primary shadow-none text-sm max-w-[100px] truncate"  >
            {provider}
          </span>
        <p className="text-muted-foreground text-sm">{date.toLocaleString()}</p>
      </div>
      <p className={clsx("text-xl font-semibold",{
        "text-green-500":provider !== ""&& status ==="Success",
        "text-muted-foreground":provider !== ""&& status ==="Processing"
      })} >{provider !== ""&& status ==="Success"&& "+"} {formattedAmount}</p>
    </div>
  );
}
