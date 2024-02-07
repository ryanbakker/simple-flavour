import { LogIn, Plus, UtensilsCrossed } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const CreateRecipes = () => {
  return (
    <section className="py-10 bg-gradient-to-tr from-slate-900 to-slate-600">
      <div className="wrapper flex flex-row justify-between items-center">
        <div className="flex flex-col gap-8">
          <div>
            <h3 className="text-2xl font-semibold text-slate-100">
              Create Recipes
            </h3>
            <p className="text-slate-300 font-light pt-2 max-w-[600px]">
              Sign up today and share your favourite recipes for anyone to use,
              and use your profile to share all your recipes.
            </p>
          </div>

          <div className="flex flex-row gap-3 items-center">
            <Button size="lg" asChild>
              <Link
                href="/recipes/create"
                className=" flex flex-row items-center gap-1.5"
              >
                <Plus size={20} /> Create Recipe
              </Link>
            </Button>
            <Button size="lg" asChild>
              <Link
                href="/sign-in"
                className="bg-white text-rose-600 hover:bg-gray-200 transition-all flex flex-row items-center gap-1.5"
              >
                <LogIn size={20} /> Sign In
              </Link>
            </Button>
          </div>
        </div>
        <div>
          <UtensilsCrossed size={150} className="text-slate-500" />
        </div>
      </div>
    </section>
  );
};

export default CreateRecipes;
