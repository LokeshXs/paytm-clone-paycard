"use client";

import {
  Home,
  PanelLeftOpen,
  PanelRightOpen,
  Rotate3D,
  Wallet,
  ArrowLeftRight,
} from "lucide-react";
import { Button } from "./ui/button";
import DashboardLink from "./DashboardLink";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import LogoutButton from "./LogoutButton";
import { useEffect, useState } from "react";
import clsx from "clsx";
import MyProfile from "./MyProfile";
import { useSession } from "next-auth/react";
import { BASE_URL } from "@repo/web/baseurl";

type Props = {
  user: {
    image: string | null | undefined;
    name: string | null | undefined;
  };
};

export default async function DashboardPanel({ user }: Props) {
  const [isPanelOpen, setPanelOpen] = useState(true);
  const session = useSession();


  const [profileDetails, setProfileDetails] = useState<{

    name: string | null;
    email: string;
    phoneNumber: string | null;


  } | null>();

  const [accountDetails, setAccountDetails] = useState<{

    provider: string;

  } | null>();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await fetch(`${BASE_URL}/api/myprofile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId:session.data?.userId
        }),
      });

      const details = await response.json();

      setProfileDetails(details.data);
    };

    const fetchOAuthAccountDetails = async () => {
      const response = await fetch(`${BASE_URL}/api/myoauthaccount`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId:session.data?.userId
        }),
      });

      const details = await response.json();

      setAccountDetails(details.data);
    };

    fetchUserDetails();
    fetchOAuthAccountDetails();
  }, []);


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
            <DashboardLink icon={<ArrowLeftRight />} name="Transactions" />
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
          <MyProfile userId={session.data?.userId!} accountDetails={accountDetails} profileDetails={profileDetails}  />
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
