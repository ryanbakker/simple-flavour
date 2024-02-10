import { IRecipe } from "@/lib/database/models/recipe.model";
import { auth } from "@clerk/nextjs";
import { Leaf, LeafyGreen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RecipeCategoryLabel from "./RecipeCategoryLabel";

const Card = ({ recipe }: { recipe: IRecipe }) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isMeetAuthor = userId === recipe.author._id.toString();

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-darkBlue shadow-md transition-all hover:shadow-lg md:min-h-[438px] hover:scale-[1.02]">
      <Link href={`/recipes/${recipe._id}`} className="bg-neutral-100">
        <div className="overflow-hidden object-fill">
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            height={400}
            width={600}
            className="max-h-[266px] object-fill object-center"
          />
        </div>
        <div className="p-4 flex flex-col justify-between min-h-[172px]">
          <div>
            <h4 className="text-xl font-serif font-medium text-slate-900 capitalize line-clamp-1">
              {recipe.title}
            </h4>
            <p className="pt-2 font-light text-slate-800 line-clamp-2 text-sm">
              {recipe.description}
            </p>
          </div>
          <div className="flex flex-row justify-between items-end">
            <div className="flex flex-row gap-2">
              {recipe.isVegetarian === true && (
                <p className="bg-gradient-to-tr from-green-300 to-green-100 w-fit px-3 py-1 rounded-md font-medium text-emerald-700 flex flex-row gap-1.5 items-center text-sm">
                  <Leaf size={20} /> Vegetarian
                </p>
              )}
              {recipe.isVegan === true && (
                <p className="bg-gradient-to-tr from-green-300 to-green-100 w-fit px-3 py-1 rounded-md font-medium text-emerald-700 flex flex-row gap-1.5 items-center text-sm">
                  <LeafyGreen size={20} /> Vegan
                </p>
              )}

              <RecipeCategoryLabel label={recipe.category.label} />
            </div>
            <div>
              <Image
                src={recipe.author.photoUrl}
                alt={recipe.author.username}
                height={40}
                width={40}
                className="rounded-full"
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
