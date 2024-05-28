"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { ControllerRenderProps } from "react-hook-form";
import { Button } from "./ui/button";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  isPending: boolean;
  isdisabled? : boolean;
  field: ControllerRenderProps<
    {
      email: string;
      fullname: string;
      phonenumber: string;
      password: string;
    },
    "password"
  > | ControllerRenderProps<
  {
    
    phonenumber: string;
    password: string;
  },
  "password"
>;
};

export default function PasswordInput({ isPending, field,isdisabled }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        placeholder="Password"
        type={showPassword ? "text" : "password"}
        className=" pr-12"
        disabled={isPending || isdisabled}
        {...field}
      />
      <Button
        type="button"
        size="icon"
        variant="ghost"
        disabled={isPending}
        className="absolute right-0 top-0 hover:bg-transparent "
        onClick={() => {
          setShowPassword((prev) => !prev);
        }}
      >
        {showPassword ? (
          <Eye width={24} height={24} />
        ) : (
          <EyeOff width={24} height={24} />
        )}
      </Button>
    </div>
  );
}
