
import {z} from "zod";

export enum BankProviders  {
HDFC = "hdfc",
AXIS = "axis",
SBI = "sbi"
}

export enum OnRampStatus {
  Processing,
  Failed,
  Success,
}

export const addMoneyFormSchema = z.object({
  amount: z.string().regex(/^[0-9]+$/,"Invalid Amount!"),
  bank:z.string(),
})

export const p2pTranferFormSchema = z.object({
  phonenumber: z.string().regex(/^[789][0-9]{9}$/,"Invalid Number!"),
  amount: z.string().regex(/^[0-9]+$/,"Invalid Amount!"),
})

export const addNewCardFormSchema = z.object({
  cardNumber:z.string().regex(/^\d{4} \d{4} \d{4} \d{4}$/,"Invalid card number"),
  // month:z.number().int().min(1).max(12),
  // year:z.number().int().min(new Date().getFullYear()).max(9999),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/(20)\d{2}$/,"Invalid date"),
  cvv:z.string().min(3).max(3,"Invalid Code"),
  name:z.string().min(1).max(20,"Invalid")
})