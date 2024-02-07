import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import Logo from "./Logo";
import { CircleUser } from "lucide-react";
import NavigationDesktop from "./NavigationDesktop";
import { ThemeToggler } from "./themes/ThemeToggler";

const Header = () => {
  return (
    <header className="w-full z-50 bg-white">
      <div className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full flex justify-between items-center">
        <Logo />

        <NavigationDesktop />

        <div className="flex flex-row items-center gap-4">
          <ThemeToggler />

          <SignedOut>
            <Button asChild size="lg">
              <Link href="/sign-in" className="flex gap-1.5 items-center">
                <CircleUser size={20} /> Sign In
              </Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <div className="border border-rose-500 rounded-full p-[3px]">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Header;
