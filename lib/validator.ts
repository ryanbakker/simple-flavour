import * as z from "zod";

const stepSchema = z.object({
  step: z.string().min(3, "min 3 char").max(500, "max 500 char"),
});

const ingredientSchema = z.object({
  measurement: z.string(),
  name: z.string(),
});

export const recipeFormSchema = z.object({
  title: z.string().min(3, "min 3 char").max(100, "max 100 char"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(200, "Description must be less than 200 characters"),
  imageUrl: z.string(),
  ingredients: z.array(ingredientSchema),
  instructions: z.array(stepSchema),
  prepTime: z.string(),
  cookTime: z.string(),
  servingSize: z.string(),
  isVegetarian: z.boolean(),
  isVegan: z.boolean(),
  notes: z.string(),
  categoryId: z.string(),
});
