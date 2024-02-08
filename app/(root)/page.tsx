import Carousel from "@/components/Carousel";
import CreateRecipes from "@/components/CreateRecipes";
import Welcome from "@/components/Welcome";
import Collection from "@/components/recipes/Collection";
import { getAllRecipes } from "@/lib/actions/recipe.actions";
import { SearchParamProps } from "@/types";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export default async function Home({ searchParams }: SearchParamProps) {
  const searchText = (searchParams.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const recipes = await getAllRecipes({
    query: searchText,
    category,
    page: 1,
    limit: 3,
  });

  return (
    <>
      <Carousel />
      <Welcome />

      <section className="py-8">
        <div className="wrapper">
          <h3 className="text-2xl font-semibold text-slate-800 pb-4">
            Popular Recipes
          </h3>

          <Collection
            data={recipes?.data}
            emptyTitle="Not Recipes Found"
            emptyStateSubtext="Come back later"
            collectionType="All_Recipes"
            limit={3}
            page={1}
            totalPages={1}
          />

          <Link href="/recipes" className="all-recipes-btn">
            All Recipes <MoveRight size={20} />
          </Link>
        </div>
      </section>

      <CreateRecipes />
    </>
  );
}
