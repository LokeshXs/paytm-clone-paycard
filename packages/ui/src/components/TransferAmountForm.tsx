"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { p2pTranferFormSchema } from "@repo/schemas/moneySchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { useState, useTransition } from "react";
import SuccessMsg from "./SuccessMsg";
import ErrorMsg from "./ErrorMsg";

export default function TransferAmountForm({
  action,
}: {
  action: (values: z.infer<typeof p2pTranferFormSchema>) => Promise<{
    status: string;
    message: string;
}>;
}) {

  const [successMsg, setSuccessMsg] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof p2pTranferFormSchema>>({
    resolver: zodResolver(p2pTranferFormSchema),
    defaultValues: {
      phonenumber: "",
      amount: "",
    },
  });

  const onSubmit = (values: z.infer<typeof p2pTranferFormSchema>) => {
    setSuccessMsg("");
    setErrorMsg("");
    startTransition(() => {
      action(values).then((response) => {
        if (response.status === "success") {
          setSuccessMsg(response.message);
        }
        if (response.status === "error") {
          setErrorMsg(response.message);
        }
      });
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8  bg-primary py-4 px-8 rounded-2xl min-w-[300px]  "
      >
        <FormField
          control={form.control}
          name="phonenumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary-foreground text-base">
                PhoneNumber
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="xxxxxxxxxx"
                  className="bg-background text-primary text-lg "
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary-foreground text-base">Amount</FormLabel>
              <FormControl>
                <Input
                  placeholder="xx.xx"
                  className="bg-background text-primary text-lg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-secondary text-primary hover:bg-secondary text-base"
        >
           {isPending ? "In Progress..." : "Send"}
        </Button>
        {successMsg && <SuccessMsg message={successMsg} />}
          {errorMsg && <ErrorMsg message={errorMsg} />}
      </form>
    </Form>
  );
}
