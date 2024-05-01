"use client";

import clsx from "clsx";
import { Badge } from "./ui/badge";
import { formattCurrency } from "../lib/formatting";
import db from "@repo/web/db";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'

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
  console.log(status);
  const [transactionStatus, setTransactionStatus] = useState(status);
  const router = useRouter();
  const formattedAmount = formattCurrency(amount);

  // useEffect(() => {
  //   const fetchStatus = async () => {
  //     const res = await fetch(
  //       `http://localhost:3000/api/transaction/${transactionId}`,
  //       {
  //         cache: "no-store",
  //       }
  //     );

  //     const data = await res.json();

  //     setTransactionStatus(data.status);
  //   };

  //   fetchStatus();
  // }, []);

  if (transactionStatus === "Processing" || transactionStatus === "") {
    const intervalId = setInterval(async () => {
     
      const res = await fetch(
        `http://localhost:3000/api/transaction/${transactionId}`,
        {
          cache: "no-store",
        }
      );

      const data = await res.json();

      setTransactionStatus(data.status);
      if(data.status !== "Processing"){
        clearInterval(intervalId);
        router.refresh();
      }

     
    }, 5000);
  }

  // if(transactionStatus === ""){
  //   return (
  //     <div>Fetching</div>
  //   )
  // }

  return (
    <div className="flex items-center justify-between max-w-[400px] w-full bg-muted px-6 py-2 rounded-2xl">
      <div className="space-y-2 ">
        <p className="text-primary font-semibold text-xl">
          {transactionStatus === "Processing"
            ? "Processing..."
            : transactionStatus}
        </p>
        <span className="px-1 py-0.5 inline-block rounded border-[1px]  border-primary text-primary shadow-none text-sm max-w-[100px] truncate">
          {provider}
        </span>
        <p className="text-muted-foreground text-sm">{date.toLocaleString()}</p>
      </div>
      <p
        className={clsx("text-xl font-semibold", {
          "text-green-500": provider !== "" && transactionStatus === "Success",
          "text-muted-foreground":
            provider !== "" && transactionStatus === "Processing",
        })}
      >
        {provider !== "" && status === "Success" && "+"} {formattedAmount}
      </p>
    </div>
  );
}
