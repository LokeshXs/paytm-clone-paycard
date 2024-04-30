
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/avatar";
import { CalendarClock, MessageCircleQuestion, School } from "lucide-react";
import { auth } from "../../../auth";
import { Home, Wallet,Rotate3D } from "lucide-react";
import DashboardLink from "@repo/ui/dashboardlink";
import { Button } from "@repo/ui/button";
import LogoutButton from "./logout";


interface Props {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: Props) {
  const session = await auth();
  const user = session?.user;

  return (
    <main className="h-screen w-screen  flex flex-col">
      <div className="flex-1 h-full flex">
        <nav className="w-60 p-4 pt-12  h-full bg-muted max-md:hidden flex flex-col justify-between ">
          <div className="mt-12 flex flex-col gap-2">
            <DashboardLink icon={<Home />} name="Dashboard" />
            <DashboardLink icon={<Wallet />} name="My Wallet" />
            <DashboardLink icon={ <Rotate3D />} name="P2P Transfer" />
          </div>
          
       
        <div className="flex flex-col items-center justify-center gap-2">
          <Avatar className="w-16 h-16 " >
            <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
            <AvatarFallback className="bg-secondary text-primary">{user?.name?.toUpperCase().slice(0,2)}</AvatarFallback>
          </Avatar>
          <Button className="w-full">My Profile</Button>
        <LogoutButton />
        </div>
        </nav>
        {/* <MobileDashboard /> */}
        <div className="flex-1  flex flex-col overflow-x-hidden h-full">
          <div className="flex-1  overflow-auto  ">
            <div className="w-full h-full z-10 pt-2">{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
