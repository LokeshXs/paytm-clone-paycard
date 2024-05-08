"use server";
import { addNewCardFormSchema } from "@repo/schemas/moneySchemas";
import { z } from "zod";
import db from "../lib/db";
import { auth } from "../../auth";

export default async function addPaymentCard(
  value: z.infer<typeof addNewCardFormSchema>
) {
  try {
    const session = await auth();

    console.log(value);

    // 1.) validate values using zod

    const validatedValues = addNewCardFormSchema.safeParse(value);

    if (!validatedValues.success) {
      return {
        status: "error",
        message: "Values are invalid",
      };
    }

    const { cardNumber, expiryDate, name, cvv } = validatedValues.data;

    // 2,) check if a card already exists

    const existingCard = await db.paymentCards.findUnique({
      where: {
        cardNumber: cardNumber.replaceAll(" ", ""),
      },
    });

    if (existingCard) {
      return {
        status: "error",
        message: "Card already exists",
      };
    }

    //3.) check if a card's expiry year is valid

    const year = expiryDate.split("/")[1];
    const month = expiryDate.split("/")[0];
    console.log(new Date().getMonth());
    console.log(new Date().getFullYear());
    if (
      Number(year) < new Date().getFullYear() ||
      Number(month) <= new Date().getMonth() + 1
    ) {
      return {
        status: "error",
        message: "Expiry month or year is invalid",
      };
    }

    // 5.) Define the provider for a card

    let provider = "";
    if (cardNumber.startsWith("4")) {
      provider = "visa";
    } else if (cardNumber.startsWith("5")) {
      provider = "mastercard";
    }

    if (provider === "") {
      return {
        status: "error",
        message:
          "Please check the card number, we are currently only accepting Visa and Mastercard",
      };
    }

    // 4.) Create a new card
    await db.paymentCards.create({
      data: {
        cardNumber: cardNumber.replaceAll(" ", ""),
        expirymonth: Number(month),
        expiryYear: Number(year),
        holderName: name,
        cvv: Number(cvv),
        UserId: session?.userId!,
        provider: provider,
      },
    });

    return {
      status: "success",
      message: "Card Added Successfully !",
    };
  } catch (err) {
    console.log(err);
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
}
