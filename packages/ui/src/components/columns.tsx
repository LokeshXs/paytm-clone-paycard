"use client";

import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { ArrowUpDown, UsersRound, Wallet } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { formattCurrency } from "../lib/formatting";
import PaymentDetailsDialog from "./PaymentDetailsDialog";
import { useState } from "react";


export type Transaction = {
  id: String;
  name: string;
  status: string;
  date: Date;
  invoice: string;
  amount: number;
  fromUserId: string | null;
  toUserId: string | null;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Name/Business",
    cell: ({ row }) => {
      const name: string = row.getValue("name");

      if (name === "Wallet") {
        return (
          <div className=" flex items-center gap-3">
            <span className=" inline-block p-3 rounded-lg bg-[#f8edd9]  ">
              <Wallet className=" text-[#f9b73d]" />
            </span>
            <p className=" text-lg font-medium">{name}</p>
          </div>
        );
      }

      return (
        <div className=" flex items-center gap-3">
          <span className=" inline-block p-3 rounded-lg bg-[#c4ebc9] ">
            <UsersRound className=" text-[#93da9d]" />
          </span>
          <p className=" text-lg font-medium">{name}</p>
        </div>
      );
    },

    filterFn: (row,id,value) =>{
      return value.includes(row.getValue(id))
    }
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className=" ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => {
      const date: Date = row.getValue("date");

      return (
        <div>
          <p className=" text-base text-pretty">{date.toLocaleDateString()}</p>
          <p className=" text-xs text-muted-foreground text-pretty">
            {date.toLocaleTimeString()}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "invoice",
    header: "Invoice ID",
  },
  {
    accessorKey: "amount",
    header: ({column})=>{

      return (
        <Button
        variant="ghost"
        onClick={()=> column.toggleSorting(column.getIsSorted()==="asc")}
        >
          Amount
          <ArrowUpDown className=" ml-4 h-4 w-4" />

        </Button>
      )
    },
    cell: ({ row }) => {
      const session = useSession();

      const amount: number = row.getValue("amount");
      const status: string = row.getValue("status");
      const name: string = row.getValue("name");

      if (name === "Peer") {
        const fromUserId: string = row.getValue("fromUserId");
        const toUserId: string = row.getValue("toUserId");
        return (
          <p className={clsx("text-xl font-semibold text-primary")}>
            {toUserId === session.data?.userId && "+"}{" "}
            {fromUserId === session.data?.userId && "-"} {formattCurrency(amount)}
          </p>
        );
      }

      return (
        <p className={clsx("text-xl font-semibold text-primary")}>
          {name === "Wallet" && status === "Success" && "+"} {formattCurrency(amount)}
        </p>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: string = row.getValue("status");

      if (status === "Processing") {
        return (
          <p className="px-4 py-2 w-fit bg-primary text-background opacity-40 rounded-lg">
            {status}
          </p>
        );
      }
      if (status === "Failed") {
        return (
          <p className="px-4 py-2 w-fit bg-destructive text-destructive-foreground  rounded-lg">
            {status}
          </p>
        );
      }

      return (
        <p className="px-4 py-2 w-fit bg-primary text-background rounded-lg">
          {status}
        </p>
      );
    },
  },
  {
    accessorKey: "fromUserId",
    header: "FromUserId",
  },
  {
    accessorKey: "toUserId",
    header: "ToUserId",
  },
 
];
