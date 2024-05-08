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

type Props = {
  action: (values: z.infer<typeof addMoneyFormSchema>) => void;
  savedCards: {
    id: string;
    cardNumber: string;
    expirymonth: number;
    expiryYear: number;
    holderName: string;
    provider: string;
    cvv: number;
    TimeStamp: Date;
    UserId: string;
  }[];
};

export default function AddMoneyform({ action, savedCards }: Props) {
  const form = useForm<z.infer<typeof addMoneyFormSchema>>({
    resolver: zodResolver(addMoneyFormSchema),
    defaultValues: {
      amount: "",
      bank: "",
    },
  });

  const onSubmit = (values: any) => {

    console.log(values);
    action(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-background text-base">
                Amount
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Amount"
                  type="text"
                  className="bg-background text-primary text-lg"
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
              <FormLabel className="text-background text-base">Bank</FormLabel>
              <Select  onValueChange={field.onChange} >
                <FormControl className="bg-background text-primary text-lg">
                  <SelectTrigger>
                    <SelectValue placeholder= {savedCards.length !== 0?"Select a bank":"Add a card to proceed"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {savedCards.map((card) => {
                    return (
                      <SelectItem key={card.id} value={card.cardNumber}>
                        {`${card.provider}(${card.cardNumber.slice(-4)})`}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-secondary text-primary hover:bg-secondary text-base"
        >
          Add Money
        </Button>
      </form>
    </Form>
  );
}
