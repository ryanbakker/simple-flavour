import Collection from "@/components/recipes/Collection";
import DeleteRecipeBtn from "@/components/recipes/DeleteRecipeBtn";
import {
  getRelatedRecipesByCategory,
  getRecipeById,
} from "@/lib/actions/recipe.actions";
import { IIngredient, IStep } from "@/lib/database/models/recipe.model";
import { formatDateString, multiFormatDateString } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { Clock, CookingPot, FileEdit, Utensils } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const RecipePage = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const recipe = await getRecipeById(id);
  const isRecipeAuthor = userId === recipe.author._id.toString();

  const relatedRecipes = await getRelatedRecipesByCategory({
    categoryId: recipe.category._id,
    recipeId: recipe._id,
    page: searchParams.page as string,
  });

  const hasURL = recipe.url != "";

  return (
    <article className="bg-neutral-100 h-full border-t border-gray-200">
      <section className="shadow-lg">
        <div className="max-w-7xl lg:mx-auto px-5 md:px-10 xl:px-0 w-full grid grid-cols-1 md:grid-cols-2">
          <div className="py-10 pr-12 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl pb-3 font-semibold text-slate-700 font-serif">
                {recipe.title}
              </h1>
              <div className="flex flex-row gap-3">
                <p className="bg-gradient-to-tr from-slate-300 to-slate-100 w-fit px-3 py-1 rounded-md font-medium text-neutral-700">
                  {recipe.category.label}
                </p>
                {recipe.isVegetarian === true && (
                  <p className="bg-gradient-to-tr from-green-300 to-green-100 w-fit px-3 py-1 rounded-md font-medium text-emerald-700">
                    Vegetarian
                  </p>
                )}
                {recipe.isVegan === true && (
                  <p className="bg-gradient-to-tr from-green-300 to-green-100 w-fit px-3 py-1 rounded-md font-medium text-emerald-700">
                    Vegan
                  </p>
                )}
              </div>
              <p className="font-light text-slate-600 font-serif pt-7 line-clamp-3">
                {recipe.description}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-row gap-3">
                <div className="flex flex-row items-center gap-3 bg-neutral-200 w-fit rounded-lg px-5 py-1.5">
                  <Clock size={26} />
                  <div className="flex flex-col">
                    <p className="text-xs text-slate-600">Prep Time</p>
                    <p className="font-semibold text-slate-700 -mt-0.5">
                      {recipe.prepTime} mins
                    </p>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-3 bg-neutral-200 w-fit rounded-lg px-5 py-1.5">
                  <Utensils size={26} />
                  <div className="flex flex-col">
                    <p className="text-xs text-slate-600">Cooking Time</p>
                    <p className="font-semibold text-slate-700 -mt-0.5">
                      {recipe.cookTime} mins
                    </p>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-3 bg-neutral-200 w-fit rounded-lg px-5 py-1.5">
                  <CookingPot size={26} />
                  <div className="flex flex-col">
                    <p className="text-xs text-slate-600">Serving Size</p>
                    <p className="font-semibold text-slate-700 -mt-0.5">
                      {recipe.servingSize}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex flex-row items-center gap-3 bg-neutral-200 rounded-lg px-1.5 py-1.5 pr-4 w-[349px]">
                  <Image
                    src={recipe.author.photoUrl}
                    alt={recipe.author.username}
                    height={200}
                    width={200}
                    className="rounded-lg h-[45px] w-[45px]"
                  />

                  <div className="flex flex-col">
                    <p className="text-xs text-slate-600">Author</p>
                    <p className="font-semibold text-slate-700 -mt-0.5">
                      @{recipe.author.username}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-3 bg-neutral-200 w-fit rounded-lg px-6 py-[9.5px]">
                  <div className="flex flex-col">
                    <p className="text-xs text-slate-600">Published</p>
                    <p className="font-semibold text-slate-700 -mt-0.5">
                      {multiFormatDateString(recipe.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Image
              src={recipe.imageUrl}
              alt={recipe.title}
              width={1920}
              height={1080}
              className="h-full"
            />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="wrapper grid grid-cols-1 md:grid-cols-2 !pt-12 !pb-12">
          <div>
            <h2 className="text-xl font-serif text-slate-800 pb-5">
              Ingredients
            </h2>
            <ul className="flex flex-col gap-1">
              {recipe.ingredients.map((ingredient: IIngredient) => (
                <li
                  key={ingredient.name}
                  className="flex flex-row gap-5 border-t border-gray-200 w-fit py-2 font-serif"
                >
                  <p className="w-[80px]">{ingredient.measurement}</p>
                  <p>{ingredient.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-serif text-slate-800 pb-5">Method</h2>
            <ul className="flex flex-col gap-y-7">
              {recipe.instructions.map((instruction: IStep, index: number) => (
                <li
                  key={instruction.step}
                  className="flex flex-row justify-between w-full"
                >
                  <p className="font-light text-slate-500 font-serif w-[120px]">
                    Step {index + 1}
                  </p>
                  <p className="text-slate-800 font-serif max-w-[550px]">
                    {instruction.step}
                  </p>
                </li>
              ))}
            </ul>
            {recipe.notes && (
              <div className="wrapper !pb-20 mt-12">
                <h3 className="text-xl font-serif text-slate-800 pb-2">
                  Additional Notes
                </h3>
                <p className="font-light text-slate-600">{recipe.notes}</p>
              </div>
            )}
          </div>
        </div>

        {isRecipeAuthor && (
          <div className="wrapper flex flex-row gap-3 items-center !pb-14">
            <Link
              href={`/recipes/${recipe._id}/update`}
              className="flex flex-row gap-2 items-center bg-gradient-to-tr from-slate-800 to-slate-600 w-fit px-6 py-2 rounded-md text-slate-100 hover:from-slate-700 hover:to-slate-500 transition-all"
            >
              <FileEdit size={18} /> Edit Recipe
            </Link>

            <DeleteRecipeBtn recipeId={recipe._id} />
          </div>
        )}
      </section>

      <section className="wrapper mb-10">
        <h3 className="py-5 text-lg font-medium text-slate-800">
          Similar Recipes
        </h3>

        <Collection
          data={relatedRecipes?.data}
          emptyTitle="No Recipes Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Recipes"
          limit={3}
          page={searchParams.page as string}
          totalPages={relatedRecipes?.totalPages}
        />
      </section>
    </article>
  );
};

export default RecipePage;
