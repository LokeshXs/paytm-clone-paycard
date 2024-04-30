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
import { SignUpSchema } from "@repo/schemas/authenticationSchema";
import { useState, useTransition } from "react";
import SuccessMsg from "./SuccessMsg";
import ErrorMsg from "./ErrorMsg";

export default function SignUpForm({
  action,
}: {
  action: (value: z.infer<typeof SignUpSchema>) => Promise<{
    status: string;
    message: string;
  }>;
}) {
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      fullname: "",
      phonenumber: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof SignUpSchema>) {
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
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-[400px] w-full  mx-auto"
      >
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter your name" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter your email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phonenumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Enter your phone number"
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput field={field} isPending={false} />
              </FormControl>
              <FormDescription>Password must contain at least one Uppercast letter, Lowercase letter and digit</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2">
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Signing up" : "Sign Up"}
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
