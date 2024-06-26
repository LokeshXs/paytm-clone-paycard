"use client";

import clsx from "clsx";
import { Badge } from "./ui/badge";
import { formattCurrency } from "../lib/formatting";
import db from "@repo/web/db";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import {BASE_URL} from "@repo/web/baseurl";

type TransactionCardProps = {
  transactionId: string;
  status: string;
  date: Date;
  amount: number;
  cardId: string;
};
export default function TransactionCard({
  transactionId,
  status,
  date,
  amount,
  cardId,
}: TransactionCardProps) {

  const [transactionStatus, setTransactionStatus] = useState(status);
  const router = useRouter();
  const formattedAmount = formattCurrency(amount);


  if (transactionStatus === "Processing" || transactionStatus === "") {
    const intervalId = setInterval(async () => {
     
      const res = await fetch(
        `${BASE_URL}/api/transaction/${transactionId}`,
        {
          cache: "no-store",
        }
      );

      const data = await res.json();
   

     
      if(data.data.status !== "Processing"){
        setTransactionStatus(data.data.status);
        clearInterval(intervalId);
        router.refresh();
      }
    }, 5000);
  }

  

  return (
    <div className="flex items-center justify-around w-full bg-muted px-6 py-2 rounded-2xl">
      <div className="space-y-2 ">
        <p className="text-primary font-semibold text-xl">
          {transactionStatus === "Processing"
            ? "Processing..."
            : transactionStatus}
        </p>
        <span className="px-1 py-0.5 inline-block rounded border-[1px]  border-primary text-primary shadow-none text-sm max-w-[100px] truncate">
        {`(**** ${cardId.slice(-4)})`}
        </span>
        <p className="text-muted-foreground text-sm">{date.toLocaleString()}</p>
      </div>
      <p
        className={clsx("text-xl font-semibold", {
          "text-green-500": cardId !== "" && transactionStatus === "Success",
          "text-muted-foreground":
            cardId !== "" && transactionStatus === "Processing",
        })}
      >
        {cardId !== "" && status === "Success" && "+"} {formattedAmount}
      </p>
    </div>
  );
}
