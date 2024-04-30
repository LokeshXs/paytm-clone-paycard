import Link from "next/link";
import { Button } from "./ui/button";
import MobileNav from "./MobileNav";
import AnimatedHamburgerButton from "./AnimatedHamburger";
import MobileNavContextProvider from "@repo/web/mobilenavcontext";

export default function NavBar() {
  return (
    <nav className="flex justify-between bg-background sticky top-0 py-4 max-sm:py-2 z-[99] ">
      <p className="text-2xl font-bold text-primary">PayCard</p>

      <ul className="flex gap-8 max-md:hidden">
        <li className="text-lg font-medium text-primary">
          <Link href="/">Home</Link>
        </li>
        <li className="text-lg font-medium text-primary">
          <Link href="/">Services</Link>
        </li>
        <li className="text-lg font-medium text-primary">
          <Link href="/">About</Link>
        </li>
        <li className="text-lg font-medium text-primary">
          <Link href="/">Blog</Link>
        </li>
      </ul>

      <div className="flex gap-4 max-sm:gap-2">
        <div className="flex gap-4 max-sm:gap-2">
          <Button
            className="px-8 max-sm:px-4  bg-background text-primary border-2 border-primary hover:bg-background"
            asChild
          >
            <Link href="/auth/signin">Login</Link>
          </Button>
          <Button
            className="px-8 max-sm:px-4   bg-secondary text-primary hover:bg-secondary"
            asChild
          >
            <Link href="/auth/signup">Sign up</Link>
          </Button>
        </div>
        <MobileNavContextProvider>
          <MobileNav />
          <AnimatedHamburgerButton />
        </MobileNavContextProvider>
      </div>
    </nav>
  );
}
