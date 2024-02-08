import RecipeForm from "@/components/forms/RecipeForm";
import { getRecipeById } from "@/lib/actions/recipe.actions";
import { auth } from "@clerk/nextjs";

type UpdateRecipeProps = {
  params: {
    id: string;
  };
};

const UpdateRecipe = async ({ params: { id } }: UpdateRecipeProps) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  const recipe = await getRecipeById(id);

  return (
    <div className="bg-neutral-100 h-full border-t border-gray-200 py-6">
      <section className="wrapper">
        <h1 className="text-3xl font-bold text-slate-700">Update Recipe</h1>
      </section>

      <section>
        <RecipeForm
          type="Update"
          recipe={recipe}
          recipeId={recipe._id}
          userId={userId}
        />
      </section>
    </div>
  );
};

export default UpdateRecipe;
