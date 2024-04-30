"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { addMoneyFormSchema } from "@repo/schemas/moneySchemas";

export default function AddMoneyform({
  action,
}: {
  action: (values: z.infer<typeof addMoneyFormSchema>) => void;
}) {
  const form = useForm<z.infer<typeof addMoneyFormSchema>>({
    resolver: zodResolver(addMoneyFormSchema),
    defaultValues: {
      amount: "",
      bank: "hdfc",
    },
  });

  const onSubmit = (values: any) => {
    // const data = form.getValues();
    // data.amount = Number(data.amount);
    console.log(values);
    action(values);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  placeholder="Amount"
                  type="text"
                  {...field}
                 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bank"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank</FormLabel>
              <Select onValueChange={field.onChange} defaultValue="hdfc">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a bank" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="hdfc">HDFC</SelectItem>
                  <SelectItem value="axis">AXIS</SelectItem>
                  <SelectItem value="sbi">SBI</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Add Money</Button>
      </form>
    </Form>
  );
}
