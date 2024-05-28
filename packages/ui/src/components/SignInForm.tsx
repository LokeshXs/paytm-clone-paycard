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
import { Input } from "./ui/input";
import Link from "next/link";
import PasswordInput from "./PasswordInput";
import { SignInSchema } from "@repo/schemas/authenticationSchema";
import { useState, useTransition } from "react";
import SuccessMsg from "./SuccessMsg";
import ErrorMsg from "./ErrorMsg";

export default function SignInForm({
  action,
}: {
  action: (value: z.infer<typeof SignInSchema>) => Promise<{
    status: string;
    message: string;
  }>;
}) {
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
     
      phonenumber: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof SignInSchema>) {
    setSuccessMsg("");
    setErrorMsg("");
    startTransition(() => {
      action(values);
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-[400px] min-w-[300px] max-sm:min-w-[260px] w-full  mx-auto"
      >
        <FormField
          control={form.control}
          name="phonenumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Phone number" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
     
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput field={field} isPending={false} />
              </FormControl>
          
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2">
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Signing in" : "Sign In"}
          </Button>
          {successMsg && <SuccessMsg message={successMsg} />}
          {errorMsg && <ErrorMsg message={errorMsg} />}
          {/* <p>
            Forgot Password? <Link href="/">Click here</Link>
          </p> */}
        </div>
      </form>
    </Form>
  );
}
