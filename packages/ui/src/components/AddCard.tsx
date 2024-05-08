"use client";

import { CreditCard } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { addNewCardFormSchema } from "@repo/schemas/moneySchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useState, useTransition } from "react";
import SuccessMsg from "./SuccessMsg";
import ErrorMsg from "./ErrorMsg";

type Props = {
  action: (values: z.infer<typeof addNewCardFormSchema>) => Promise<{
    status: string;
    message: string;
  }>;
};

export default function AddCard({ action }: Props) {
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof addNewCardFormSchema>>({
    resolver: zodResolver(addNewCardFormSchema),
    defaultValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof addNewCardFormSchema>) => {
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
    <>
      <Dialog>
        <DialogTrigger className="w-full">
          <Button className="flex gap-4 text-xl items-center border-dashed border-2 rounded-2xl text-primary w-full h-16 justify-center bg-background shadow-none hover:bg-muted  ">
            <CreditCard className="w-8 h-8" /> <p>Add Card</p>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className=" space-y-6">
            <DialogTitle className=" text-2xl text-primary">
              Add New Card
            </DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className=" space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="xxxx xxxx xxxx xxxx"
                            {...field}
                            onChange={(event): void => {
                              field.onChange(event, "cardNumber");

                              console.log(event.target.value);

                              const input = event.target.value.replace(
                                /[^\d]/g,
                                ""
                              );
                              let formattedInput = input.replace(
                                /(\d{4})(?=\d)/g,
                                "$1 "
                              );

                              if (formattedInput.length >= 19) {
                                formattedInput = `${formattedInput.slice(0, 19)}`;
                              }
                              form.setValue("cardNumber", formattedInput);
                            }}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-12">
                    <FormField
                      control={form.control}
                      name="expiryDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expiry Date</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="MM/YYYY"
                              {...field}
                              onChange={(event): void => {
                                field.onChange(event, "expiryDate");

                                console.log(event.target.value);

                                const input = event.target.value.replace(
                                  /[^\d]/g,
                                  ""
                                );
                                // form.setValue("expiryDate", input);
                                let formattedInput = input;

                                if (input.length > 2) {
                                  formattedInput =
                                    input.slice(0, 2) + "/" + input.slice(2);
                                }

                                // Limit input to 7 characters
                                if (input.length >= 7) {
                                  formattedInput = `${input.slice(0, 2)}/${input.slice(2, 6)}`;
                                }

                                form.setValue("expiryDate", formattedInput);
                              }}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cvv"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVV</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="..."
                              {...field}
                              onChange={(event): void => {
                                field.onChange(event, "expiryDate");

                                let input = event.target.value;

                                if (input.length >= 3) {
                                  input = input.slice(0, 3);
                                }

                                form.setValue("cvv", input);
                              }}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cardholder Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Name" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Add</Button>
                  {successMsg && <SuccessMsg message={successMsg} />}
                  {errorMsg && <ErrorMsg message={errorMsg} />}
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
