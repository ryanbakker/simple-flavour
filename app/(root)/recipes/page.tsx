import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const RecipesPage = () => {
  return (
    <div>
      <section className="wrapper">
        <div className="flex flex-row justify-between items-end">
          <h1 className="text-3xl font-bold text-slate-700">All Recipes</h1>
          <Button size="lg" asChild>
            <Link href="/recipes/create">
              <Plus /> Create Recipe
            </Link>
          </Button>
        </div>

        <div>{/* Filters & Search */}</div>
      </section>

      <section>
        {/* Recipes Grid */}

        {/* Pagination */}
      </section>
    </div>
  );
};

export default RecipesPage;
