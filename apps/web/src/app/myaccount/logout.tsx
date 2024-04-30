"use client";

import { signOut } from "next-auth/react";

import { Button } from "@repo/ui/button";

export default function LogoutButton() {
  return (
    <Button
      onClick={() => {
        signOut();
      }}

      className="w-full"
    >
      Logout
    </Button>
  );
}
