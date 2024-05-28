import { z } from "zod";
import { UpdateCustomProfileSchema } from "@repo/schemas/authenticationSchema";
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
import {updateProfile} from "@repo/web/updateProfile";
import { useState, useTransition } from "react";
import SuccessMsg from "./SuccessMsg";
import ErrorMsg from "./ErrorMsg";

type Props = {
    profileDetails:
    | {
        name: string | null;
        email: string;
        phoneNumber: string | null;
      }
    | null
    | undefined;
}

export default function CustomProfileUpdateForm({profileDetails}:Props) {

    const [successMsg, setSuccessMsg] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UpdateCustomProfileSchema>>({
    resolver: zodResolver(UpdateCustomProfileSchema),
    defaultValues: {
      name: profileDetails?.name || "",
      email: profileDetails?.email || "",
      phonenumber: profileDetails?.phoneNumber || "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof UpdateCustomProfileSchema>) => {

    setSuccessMsg("");
    setErrorMsg("");
    startTransition(() => {
      updateProfile(values).then((response) => {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input  {...field} disabled={isPending} />
              </FormControl>            
              {/* todo: Remove the Form Message no use here */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input  {...field} disabled={isPending} />
              </FormControl>            
              {/* todo: Remove the Form Message no use here */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phonenumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PhoneNumber</FormLabel>
              <FormControl>
                <Input  {...field} disabled={isPending} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input  placeholder="************" {...field} disabled={isPending} />
              </FormControl>            
              {/* todo: Remove the Form Message no use here */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>{isPending?'Updating':'Update'}</Button>
        {successMsg && <SuccessMsg message={successMsg} />}
          {errorMsg && <ErrorMsg message={errorMsg} />}
      </form>
    </Form>
  );
}
