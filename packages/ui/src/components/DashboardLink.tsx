"use client";

import { type ClassValue, clsx } from "clsx";
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const DashboardLink = ({icon,name}:{icon:React.ReactNode,name:string}) => {
const path = usePathname();
console.log(path);
  return (
    <Link href={`/myaccount/${name.toLowerCase().replace(/\s/g,"")}`} className={clsx(" py-3 px-4 rounded-2xl  font-medium flex items-center gap-4",{
      "text-primary-foreground bg-primary ": path === `/myaccount/${name.toLowerCase().replace(/\s/g,"")}`,
      "text-muted-foreground hover:bg-muted ": path !== `/myaccount/${name.toLowerCase().replace(/\s/g,"")}`,
    })}>
     {icon} {name}
    </Link>
  );
};

export default DashboardLink;