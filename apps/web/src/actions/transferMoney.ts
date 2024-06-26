"use server";
import { z } from "zod";
import { p2pTranferFormSchema } from "@repo/schemas/moneySchemas";
import { auth } from "../../auth";
import db from "../lib/db";
import { revalidatePath } from "next/cache";

export default async function TransferMoney(
  values: z.infer<typeof p2pTranferFormSchema>
) {
  try {
    const session = await auth();

    // 1.) validate the values

    const validatedValues = p2pTranferFormSchema.safeParse(values);

    if (!validatedValues.success) {
      return {
        status: "error",
        message: "Invalid Values",
      };
    }

    // 2.) check if the user is logged in

    if (!session?.user) {
      return {
        status: "error",
        message: "You cannot perform this transfer",
      };
    }

    

    // 3.) check if the "to" user exist

    const toUser = await db.user.findUnique({
      where: {
        phonenumber: validatedValues.data.phonenumber,
      },
    });

  const fromUser = await db.user.findUnique({
    where:{
      id:session.userId
    }
  })


    // 3.1) check if the user is transfering the money himself

    if(toUser?.phonenumber === fromUser?.phonenumber){
      return {
        status: "error",
        message: "Cannot tranfer money to yourself",
      };
    }

    if (!toUser) {
      return {
        status: "error",
        message: "User does not exist",
      };
    }

    //4.) check if logged in user have enough money and perform the transfer by locking the balance row for current user
    try {
      await db.$transaction(async (trans) => {
        // locking the balance row for current user
        await trans.$queryRaw`SELECT * FROM "Balance" WHERE "userId"=${session.userId} FOR UPDATE`;

        const fromBalance = await trans.balance.findUnique({
          where: {
            userId: session.userId,
          },
        });

        // console.log("Is less",fromBalance!.amount<Number(validatedValues.data.amount))

        if (
          !fromBalance ||
          fromBalance.amount / 100 < Number(validatedValues.data.amount)
        ) {
          throw new Error("You do not have enough balance");
        }

        await trans.balance.update({
          where: {
            userId: session.userId,
          },
          data: {
            amount: {
              decrement: Number(validatedValues.data.amount) * 100,
            },
          },
        });

        await trans.balance.update({
          where: {
            userId: toUser.id,
          },
          data: {
            amount: {
              increment: Number(validatedValues.data.amount) * 100,
            },
          },
        });

        

        await trans.p2pTransfers.create({
          data: {
            toUserId: toUser.id,
            fromUserId: session.userId,
            amount: Number(validatedValues.data.amount) * 100,
            status: "Success",
          },
        });
      });
    } catch (err) {

      if (err instanceof Error) {
        if (err.message === "You do not have enough balance") {
          return {
            status: "error",
            message: "You do not have enough balance",
          };
        }
      }

      await db.p2pTransfers.create({
        data: {
          toUserId: toUser.id,
          fromUserId: session.userId,
          amount: Number(validatedValues.data.amount) * 100,
          status: "Failed",
        },
      });



      return {
        status: "error",
        message: "Transaction Failed",
      };
    }
    revalidatePath("/p2ptransfer");
    return {
      status: "success",
      message: "Transfer is successfull",
    };
  } catch (err) {
    console.log(err);

    

    return {
      status: "error",
      message: "Something went wrong!",
    };
  }
}
