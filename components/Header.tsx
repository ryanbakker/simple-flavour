import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import Logo from "./Logo";
import { CircleUser } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full">
      <div className="wrapper flex justify-between items-center">
        <Logo />

        {/* Menu */}

        <div>
          <SignedOut>
            <Button asChild size="lg">
              <Link href="/sign-in" className="flex gap-1.5 items-center">
                <CircleUser size={20} /> Sign In
              </Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Header;
