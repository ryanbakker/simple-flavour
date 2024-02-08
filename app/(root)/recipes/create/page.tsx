import RecipeForm from "@/components/forms/RecipeForm";
import { auth } from "@clerk/nextjs";

const CreateRecipe = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  return (
    <div className="bg-neutral-100 h-full border-t border-gray-200 py-6">
      <section className="wrapper">
        <h1 className="text-3xl font-bold text-slate-700">Create Recipe</h1>
      </section>

      <section>
        <RecipeForm type="Create" userId={userId} />
      </section>
    </div>
  );
};

export default CreateRecipe;
