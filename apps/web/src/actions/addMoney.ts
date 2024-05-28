"use server";
import { addMoneyFormSchema } from "@repo/schemas/moneySchemas";
import { z } from "zod";
import db from "../lib/db";
import { auth } from "../../auth";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";
import { BASE_URL, WEBHOOK_URL } from "../config/site-config";

export async function addMoney(values: z.infer<typeof addMoneyFormSchema>) {
  try {
    const session = await auth();
    const userId = session?.userId;



    // 1.) zod validation

    const validatedValues = addMoneyFormSchema.safeParse(values);

    if (!validatedValues.success) {
      return {
        status: "error",
        message: "Invalid Values",
      };
    }

    const { amount, bank } = validatedValues.data;

    // Amount in Number and mutiply by 100 because the decimals should not be stored in database due to precision issues
    const amountInNumber = Number(amount) * 100;
    // 2.) add the entry into on ramp transactions

    const transactionDetails = await db.onRampTransactions.create({
      data: {
        status: "Processing",
        amount: amountInNumber,
        timestamp: new Date(),
        userId: userId!,
        token: uuidv4(),
        paymentCardId: bank,
      },
    });

    revalidatePath("/dashboard");
    // console.log(transactionDetails);
    setTimeout(async () => {
      await fetch(`${WEBHOOK_URL}/webhook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: transactionDetails.token,
          amount: transactionDetails.amount,
          userId: transactionDetails.userId,
        }),
      });
    }, 5000);
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Something went wrong!",
    };
  }
}
