"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { formattCurrency } from "../lib/formatting";


type TransactionDetails = {
  invoiceId: string;
  amount: number;
  from: string;
  to: string;
  status: string;
};

type Props = {
 open:boolean,
 setOpen:Dispatch<SetStateAction<boolean>>,
 invoiceId:string
};
export default function ({ open,setOpen,invoiceId }: Props) {

    const [transactionDetails,setTransactionDetails] = useState<any>();
    const [isLoading,setIsLoading] = useState<Boolean>(false);

    useEffect(()=>{
        const fetchTransaction = async () =>{
            const response = await fetch(`http://localhost:3000/api/transaction/${invoiceId}`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })

            const data = await response.json();
            setTransactionDetails(data.data);
            console.log(response);
          
        }

        fetchTransaction();
    },[]);

    if(!transactionDetails){
      return <p>Loading</p>
    }


  return (
    <Dialog open={open} onOpenChange={()=>setOpen(!open)}>
      <DialogTrigger asChild>
        <Button variant="outline">Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{transactionDetails.id}</DialogTitle>
          <p>{formattCurrency(transactionDetails.amount)}</p>
          <DialogDescription>
            <p><span>From:</span> <span> {transactionDetails.provider}</span></p>
            <p><span>From:</span> <span> {transactionDetails.provider}</span></p>
          </DialogDescription>
        </DialogHeader>
       
      </DialogContent>
    </Dialog>
  );
}
