import clsx from "clsx";
import { formattCurrency } from "../lib/formatting";
import db from "@repo/web/db";
import { Repeat } from 'lucide-react';

type Props = {
  date: Date;
  amount: number;
  fromUserId:string,
  toUserId:string,
  userId:string,
  status:string,
};

export default async function P2PTransactionCard({ date, amount,toUserId,fromUserId,userId ,status}: Props) {
  const formattedAmount = formattCurrency(amount);
  
  const fromUser = await db.user.findUnique({
    where :{
        id:fromUserId
    }
  })

  const toUser = await db.user.findUnique({
    where :{
        id:toUserId
    }
  })
  return (
    <div className="flex items-center justify-between max-w-[400px] w-full px-6 py-2 rounded-2xl bg-muted">
      <div className="space-y-1 ">
        <div className="space-y-2 ">
          <p className="text-primary font-semibold text-xl">{status}</p>
          <div className="flex gap-2"> 
          <span className="px-1 py-0.5 inline-block rounded border-[1px]  border-primary text-primary shadow-none text-sm max-w-[100px] truncate"  >
            {fromUser?.name}
          </span>
          <Repeat className="text-primary w-4" />
          <span className="px-1 py-0.5 inline-block rounded border-[1px]  border-primary text-primary shadow-none text-sm max-w-[100px] truncate"  >
            {toUser?.name}
          </span>
          </div>
          <p className="text-muted-foreground text-sm">
            {date.toLocaleString()}
          </p>
        </div>
      </div>
      <p className={clsx("text-xl font-semibold",{
        "text-green-500":toUserId === userId,
        "text-destructive":fromUserId === userId,
      })}>{toUserId === userId && "+"} {fromUserId === userId && "-"}  {formattedAmount}</p>
    </div>
  );
}
