"use server";

import {
  CreateRecipeParams,
  UpdateRecipeParams,
  DeleteRecipeParams,
  GetAllRecipesParams,
  GetRecipesByUserParams,
  GetRelatedRecipesByCategoryParams,
} from "@/types";
import Category from "../database/models/category.model";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database";
import Recipe from "../database/models/recipe.model";
import { revalidatePath } from "next/cache";

const getCategoryByLabel = async (label: string) => {
  return Category.findOne({ label: { $regex: label, $options: "i" } });
};

const populateRecipe = (query: any) => {
  return query
    .populate({
      path: "author",
      model: User,
      select: "_id username photoUrl",
    })
    .populate({ path: "category", model: Category, select: "_id label" });
};

// Create Recipe
export async function createRecipe({
  userId,
  recipe,
  path,
}: CreateRecipeParams) {
  try {
    await connectToDatabase();

    const author = await User.findById(userId);
    if (!author) throw new Error("Author not found");

    const newRecipe = await Recipe.create({
      ...recipe,
      category: recipe.categoryId,
      author: userId,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newRecipe));
  } catch (error) {
    console.log(error);
  }
}

// Get recipe by ID
export async function getRecipeById(recipeId: string) {
  try {
    try {
      await connectToDatabase();

      const recipe = await populateRecipe(Recipe.findById(recipeId));

      if (!recipe) throw new Error("Recipe not found");

      return JSON.parse(JSON.stringify(recipe));
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}

// Update Recipe
export async function updateRecipe({
  userId,
  recipe,
  path,
}: UpdateRecipeParams) {
  try {
    await connectToDatabase();

    const recipeToUpdate = await Recipe.findById(recipe._id);
    if (!recipeToUpdate || recipeToUpdate.author.toHexString() !== userId) {
      throw new Error("Unauthorized or recipe not found");
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipe._id,
      { ...recipe, category: recipe.categoryId },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedRecipe));
  } catch (error) {
    console.log(error);
  }
}

// Delete Recipe
export async function deleteRecipe({ recipeId, path }: DeleteRecipeParams) {
  try {
    await connectToDatabase();

    const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
    if (deletedRecipe) revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

// Get All Recipes
export async function getAllRecipes({
  query,
  limit = 9,
  page,
  category,
}: GetAllRecipesParams) {
  try {
    await connectToDatabase();

    const titleCondition = query
      ? { title: { $regex: query, $options: "i" } }
      : {};
    const categoryCondition = category
      ? await getCategoryByLabel(category)
      : null;
    const conditions = {
      $and: [
        titleCondition,
        categoryCondition ? { category: categoryCondition._id } : {},
      ],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const recipesQuery = Recipe.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const recipes = await populateRecipe(recipesQuery);
    const recipesCount = await Recipe.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(recipes)),
      totalPages: Math.ceil(recipesCount / limit),
    };
  } catch (error) {
    console.log(error);
  }
}

// Get Recipes by Author
export async function getRecipesByUser({
  userId,
  limit = 9,
  page,
}: GetRecipesByUserParams) {
  try {
    await connectToDatabase();

    const conditions = { author: userId };
    const skipAmount = (page - 1) * limit;

    const recipesQuery = Recipe.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const recipes = await populateRecipe(recipesQuery);
    const recipesCount = await Recipe.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(recipes)),
      totalPages: Math.ceil(recipesCount / limit),
    };
  } catch (error) {
    console.log(error);
  }
}

// Get Related Recipes By Category
export async function getRelatedRecipesByCategory({
  categoryId,
  recipeId,
  limit = 3,
  page = 1,
}: GetRelatedRecipesByCategoryParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = {
      $and: [{ category: categoryId }, { _id: { $ne: recipeId } }],
    };

    const recipesQuery = Recipe.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const recipes = await populateRecipe(recipesQuery);
    const recipesCount = await Recipe.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(recipes)),
      totalPages: Math.ceil(recipesCount / limit),
    };
  } catch (error) {
    console.log(error);
  }
}
