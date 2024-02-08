import CategoryFilter from "@/components/recipes/CategoryFilter";
import Collection from "@/components/recipes/Collection";
import Search from "@/components/recipes/Search";
import { Button } from "@/components/ui/button";
import { getAllRecipes } from "@/lib/actions/recipe.actions";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Link from "next/link";

const RecipesPage = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const recipes = await getAllRecipes({
    query: searchText,
    category,
    page: page,
    limit: 6,
  });

  return (
    <div>
      <section className="wrapper !pb-6">
        <div className="flex flex-row justify-between items-end">
          <h1 className="text-3xl font-bold text-slate-700">All Recipes</h1>
          <Button size="lg" asChild>
            <Link href="/recipes/create">
              <Plus /> Create Recipe
            </Link>
          </Button>
        </div>

        <div className="flex w-full flex-col gap-5 md:flex-row items-center mt-6">
          <Search />
          <CategoryFilter />
        </div>
      </section>

      <section className="bg-neutral-100">
        <div className="wrapper !py-14 !pb-24">
          <Collection
            data={recipes?.data}
            emptyTitle="No Recipes Found"
            emptyStateSubtext="Come back later"
            collectionType="All_Recipes"
            limit={6}
            page={page}
            totalPages={recipes?.totalPages}
          />
        </div>
      </section>
    </div>
  );
};

export default RecipesPage;
