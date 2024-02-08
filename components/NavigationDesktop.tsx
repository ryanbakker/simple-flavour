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
  Apple,
  Banknote,
  Heart,
  Moon,
  Sandwich,
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
                      <Utensils size={35} />
                    </div>
                    <div className="text-sm leading-tight">All Recipes</div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <Link
                  href="/recipes?category=Dinner for 2"
                  className="flex flex-col gap-1 hover:bg-neutral-100 p-2 rounded-md hover:text-rose-500"
                >
                  <div>
                    <Heart size={20} />
                  </div>
                  <p className="text-sm text-gray-700">Dinner for 2</p>
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes?category=Affordable"
                  className="flex flex-col gap-1 hover:bg-neutral-100 p-2 rounded-md hover:text-emerald-500"
                >
                  <div>
                    <Banknote size={20} />
                  </div>
                  <p className="text-sm text-gray-700">Affordable</p>
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes?category=Lunch"
                  className="flex flex-col gap-1 hover:bg-neutral-100 p-2 rounded-md hover:text-orange-500"
                >
                  <div>
                    <Sandwich size={20} />
                  </div>
                  <p className="text-sm text-gray-700">Lunch</p>
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes?category=Dinner"
                  className="flex flex-col gap-1 hover:bg-neutral-100 p-2 rounded-md hover:text-indigo-500"
                >
                  <div>
                    <Moon size={20} />
                  </div>
                  <p className="text-sm text-gray-700">Dinner</p>
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes?category=Fast"
                  className="flex flex-col gap-1 hover:bg-neutral-100 p-2 rounded-md hover:text-yellow-500"
                >
                  <div>
                    <Zap size={20} />
                  </div>
                  <p className="text-sm text-gray-700">Fast</p>
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes?category=Healthy"
                  className="flex flex-col gap-1 hover:bg-neutral-100 p-2 rounded-md hover:text-red-500"
                >
                  <div>
                    <Apple size={20} />
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
