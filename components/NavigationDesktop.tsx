"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { SignedIn } from "@clerk/nextjs";
import {
  DollarSign,
  Dumbbell,
  Heart,
  Moon,
  Sun,
  User,
  Utensils,
  Zap,
} from "lucide-react";

const NavigationDesktop = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" passHref legacyBehavior>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Recipes</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid grid-cols-3 gap-2 p-2 min-w-[450px] lg:w-[500px]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    href="/recipes"
                    className="flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md hover:text-rose-500 transition-all bg-neutral-100"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      <Utensils />
                    </div>
                    <div className="text-sm leading-tight">All Recipes</div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <Link
                  href="/"
                  className="flex flex-col gap-1 hover:bg-neutral-100 p-2 rounded-md"
                >
                  <div>
                    <Heart size={20} />
                  </div>
                  <p className="text-sm text-gray-700">Dinner for 2</p>
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="flex flex-col gap-1 hover:bg-neutral-100 p-2 rounded-md"
                >
                  <div>
                    <DollarSign size={20} />
                  </div>
                  <p className="text-sm text-gray-700">Affordable</p>
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="flex flex-col gap-1 hover:bg-neutral-100 p-2 rounded-md"
                >
                  <div>
                    <Sun size={20} />
                  </div>
                  <p className="text-sm text-gray-700">Lunch</p>
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="flex flex-col gap-1 hover:bg-neutral-100 p-2 rounded-md"
                >
                  <div>
                    <Moon size={20} />
                  </div>
                  <p className="text-sm text-gray-700">Dinner</p>
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="flex flex-col gap-1 hover:bg-neutral-100 p-2 rounded-md"
                >
                  <div>
                    <Zap size={20} />
                  </div>
                  <p className="text-sm text-gray-700">Fast</p>
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="flex flex-col gap-1 hover:bg-neutral-100 p-2 rounded-md"
                >
                  <div>
                    <Dumbbell size={20} />
                  </div>
                  <p className="text-sm text-gray-700">Healthy</p>
                </Link>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <SignedIn>
          <NavigationMenuItem>
            <Link href="/recipes/create" passHref legacyBehavior>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Create Recipe
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </SignedIn>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavigationDesktop;
