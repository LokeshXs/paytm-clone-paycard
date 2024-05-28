import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/avatar";
import { auth } from "../../../auth";

import DashboardPanel from "@repo/ui/DashboardPanel";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: Props) {
  const session = await auth();
  const user = session?.user;

  return (
    <main className="h-screen w-screen  flex flex-col">
      <SessionProvider session={session}>
        <div className="flex-1 h-full flex">
          <DashboardPanel user={{ name: user?.name, image: user?.image }} />
          <div className="flex-1  flex flex-col overflow-hidden h-full">
            <div className="flex-1  overflow-auto  ">
              <div className="w-full h-full z-10 pt-2">{children}</div>
            </div>
          </div>
        </div>
      </SessionProvider>
    </main>
  );
}
