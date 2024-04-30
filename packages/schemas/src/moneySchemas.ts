
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
  bank:z.enum(["hdfc","axis","sbi"],{required_error:"Invalid Bank!"})
})

export const p2pTranferFormSchema = z.object({
  phonenumber: z.string().regex(/^[789][0-9]{9}$/,"Invalid Number!"),
  amount: z.string().regex(/^[0-9]+$/,"Invalid Amount!"),
})