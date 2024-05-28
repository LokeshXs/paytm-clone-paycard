"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { p2pTranferFormSchema } from "@repo/schemas/moneySchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { useEffect, useState, useTransition } from "react";
import SuccessMsg from "./SuccessMsg";
import ErrorMsg from "./ErrorMsg";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "../lib/lib";
import { CommandList } from "cmdk";
import db from "@repo/database/client";
import LoadingAnimation from "./Loader";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { BASE_URL } from "@repo/web/baseurl";

export default function TransferAmountForm({
  action,
}: {
  action: (values: z.infer<typeof p2pTranferFormSchema>) => Promise<{
    status: string;
    message: string;
  }>;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [searchedContact, setSearchedContact] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState<
    { name: string | null; phoneNumber: string | null; image: string | null }[]
  >([]);
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const fetchLatestFiveTransfers = async () => {
      setData([]);
      setIsFetching(true);
      const latestFiveTransfers = await fetch(
        `${BASE_URL}/api/p2ptransfers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            numberOfContacts: 5,
          }),
        }
      );

      const latestTransfers = await latestFiveTransfers.json();

      setData(latestTransfers.data);
      setIsFetching(false);
    };

    if (searchedContact === "") {
      fetchLatestFiveTransfers();
    }
  }, [searchedContact]);

  useEffect(() => {
    const fetchData = async () => {
      setData([]);
      setIsFetching(true);
      const searchedContacts = await fetch(
        `${BASE_URL}/api/contacts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            searchedContact,
          }),
        }
      );

      const fetchedContacts = await searchedContacts.json();

      setData(fetchedContacts.data);
      setIsFetching(false);
    };

    if (searchedContact !== "") {
      fetchData();
    }
  }, [searchedContact]);

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
              <FormLabel className="text-primary-foreground text-base block">
                PhoneNumber
              </FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                    >
                      {field.value
                        ? data.find(
                            (contact) => contact.phoneNumber === field.value
                          )?.name
                        : "Select contact..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className=" w-96 p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search PhoneNumber..."
                      onValueChange={(searchedValue) => {
                        // console.log(searchedValue);
                        setSearchedContact(searchedValue);
                      }}
                    />
                    <CommandEmpty>
                      {isFetching ? <LoadingAnimation /> : "No contact found"}
                    </CommandEmpty>
                    <CommandGroup className=" w-full">
                      <CommandList>
                        {data.map((contact) => (
                          <CommandItem
                            key={contact.phoneNumber}
                            value={contact.phoneNumber || ""}
                            onSelect={(currentValue) => {
                              form.setValue(
                                "phonenumber",
                                contact.phoneNumber || ""
                              );
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                contact.phoneNumber === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            <div className=" flex gap-4 items-center">
                              <Avatar className=" h-6 w-6">
                                <AvatarFallback className=" bg-secondary text-primary">
                                  {contact.name?.slice(0, 1)}
                                </AvatarFallback>
                                <AvatarImage src={contact.image || ""} />
                              </Avatar>
                              <p>
                                {" "}
                                {`${contact.name} (${contact.phoneNumber})`}
                              </p>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandList>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary-foreground text-base">
                Amount
              </FormLabel>
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
