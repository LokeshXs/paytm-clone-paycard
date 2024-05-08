"use client";

import {
  Home,
  PanelLeftOpen,
  PanelRightOpen,
  Rotate3D,
  Wallet,
} from "lucide-react";
import { Button } from "./ui/button";
import DashboardLink from "./DashboardLink";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import LogoutButton from "./LogoutButton";
import { useState } from "react";
import clsx from "clsx";

type Props = {
  user: {
    image: string | null | undefined;
    name: string | null | undefined;
  };
};

export default function DashboardPanel({ user }: Props) {
  const [isPanelOpen, setPanelOpen] = useState(true);

  return (
    <>
      <nav
        className={`${isPanelOpen ? "w-60" : "w-12"} ${isPanelOpen ? "p-4" : "p-1"} pt-12  h-full  flex flex-col justify-between bg-muted transition-all duration-500 max-sm:absolute max-sm:z-50 `}
      >
        <div className=" space-y-2">
          <Button
            className="w-fit bg-muted shadow-none hover:bg-muted p-0 "
            onClick={() => setPanelOpen((prev) => !prev)}
          >
            {isPanelOpen ? (
              <PanelRightOpen className=" text-primary" />
            ) : (
              <PanelLeftOpen className=" text-primary" />
            )}
          </Button>

          <div
            className={`mt-12 flex flex-col gap-2 ${isPanelOpen || "hidden"}`}
          >
            <DashboardLink icon={<Home />} name="Dashboard" />
            <DashboardLink icon={<Wallet />} name="My Wallet" />
            <DashboardLink icon={<Rotate3D />} name="P2P Transfer" />
          </div>
        </div>

        <div
          className={`flex flex-col items-center justify-center gap-2 ${isPanelOpen || "hidden"}`}
        >
          <Avatar className="w-16 h-16 ">
            <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
            <AvatarFallback className="bg-secondary text-primary">
              {user?.name?.toUpperCase().slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <Button className="w-full">My Profile</Button>
          <LogoutButton />
        </div>
      </nav>
      <div
        className={clsx(
          " fixed top-0 left-0 bg-black/40  h-screen transition-all duration-300 sm:hidden  ",
          {
            "w-screen": isPanelOpen,
            "w-0": !isPanelOpen,
          }
        )}
      ></div>
    </>
  );
}
