"use client";

import * as z from "zod";
import { recipeDefaultValues } from "@/constants";
import { IRecipe } from "@/lib/database/models/recipe.model";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { recipeFormSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { createRecipe, updateRecipe } from "@/lib/actions/recipe.actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { FileUploader } from "./FileUploader";
import { Plus, Trash2 } from "lucide-react";
import CategoryDropdown from "./CategoryDropdown";

type RecipeFormProps = {
  userId: string;
  type: "Create" | "Update";
  recipe?: IRecipe;
  recipeId?: string;
};

interface Ingredient {
  measurement: string;
  name: string;
}

interface Instruction {
  step: string;
}

const RecipeForm = ({ userId, type, recipe, recipeId }: RecipeFormProps) => {
  const maxIngredients = 15;
  const maxInstructions = 10;

  const [files, setFiles] = useState<File[]>([]);

  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { measurement: "", name: "" },
  ]);
  const [instructions, setInstructions] = useState<Instruction[]>([
    { step: "" },
  ]);
  const router = useRouter();

  const handleAddIngredient = () => {
    if (ingredients.length < maxIngredients) {
      setIngredients([...ingredients, { measurement: "", name: "" }]);
    }
  };

  const handleRemoveIngredient = (indexToRemove: number) => {
    // Ensure that there is at least one ingredient
    if (ingredients.length > 1) {
      setIngredients((prevIngredients) =>
        prevIngredients.filter((_, index) => index !== indexToRemove)
      );
    }
  };

  const handleAddInstruction = () => {
    if (instructions.length < maxInstructions) {
      setInstructions([...instructions, { step: "" }]);
    }
  };

  const handleRemoveInstruction = (indexToRemove: number) => {
    // Ensure that there is at least one instruction
    if (instructions.length > 1) {
      setInstructions((prevInstructions) =>
        prevInstructions.filter((_, index) => index !== indexToRemove)
      );
    }
  };

  const handleInputChange = (
    index: number,
    field: keyof Ingredient | keyof Instruction,
    value: string
  ) => {
    if (field === "measurement" || field === "name") {
      setIngredients((prevIngredients) => {
        const updatedIngredients = [...prevIngredients];
        updatedIngredients[index][field] = value;
        return updatedIngredients;
      });
    } else if (field === "step") {
      setInstructions((prevInstructions) => {
        const updatedInstructions = [...prevInstructions];
        updatedInstructions[index][field] = value;
        return updatedInstructions;
      });
    }
  };

  const initialValues =
    recipe && type === "Update"
      ? {
          ...recipe,
        }
      : recipeDefaultValues;

  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof recipeFormSchema>>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof recipeFormSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === "Create") {
      try {
        const newRecipe = await createRecipe({
          recipe: {
            ...values,
            imageUrl: uploadedImageUrl,
            ingredients: ingredients,
            instructions: instructions,
          },
          userId,
          path: "/profile",
        });

        if (newRecipe) {
          form.reset();
          router.push(`/recipes/${newRecipe._id}`);
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (type === "Update") {
      if (!recipeId) {
        router.back();
        return;
      }

      try {
        const updatedRecipe = await updateRecipe({
          userId,
          recipe: {
            ...values,
            imageUrl: uploadedImageUrl,
            _id: recipeId,
            ingredients: ingredients,
            instructions: instructions,
          },
          path: `/recipes/${recipeId}`,
        });

        if (updatedRecipe) {
          form.reset();
          router.push(`/recipes/${updatedRecipe._id}`);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  function onCancel() {
    form.reset();
    router.back();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="wrapper flex flex-col gap-8"
      >
        <div className="flex flex-row justify-between items-start gap-5">
          <div className="flex flex-col gap-5 w-full justify-between h-full">
            <div className="flex flex-col gap-1">
              <h3 className="pb-3 font-medium text-xl text-slate-600">Title</h3>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div>
                        <Input
                          placeholder="Spicy Paprika Chicken..."
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="pb-3 font-medium text-xl text-slate-600">
                Description
              </h3>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div>
                        <Textarea
                          placeholder="Perfect for any number of servings..."
                          {...field}
                          className="h-[145px] resize-none overflow-auto"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row gap-5">
          <div className="flex flex-col gap-1 w-full">
            <h3 className="pb-3 font-medium text-xl text-slate-600">Details</h3>

            <div className="flex flex-col gap-5">
              <FormField
                control={form.control}
                name="prepTime"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col gap-0.5">
                        <label className="text-sm text-neutral-600 pb-1.5">
                          Preperation Time
                        </label>
                        <Input type="number" placeholder="10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cookTime"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col gap-0.5">
                        <label className="text-sm text-neutral-600 pb-1.5">
                          Cooking Time
                        </label>
                        <Input type="number" placeholder="30" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="servingSize"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col gap-0.5">
                        <label className="text-sm text-neutral-600 pb-1.5">
                          Serving Size
                        </label>
                        <Input type="number" placeholder="2" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-1 mt-5">
              <h3 className="pb-3 font-medium text-xl text-slate-600">
                Category
              </h3>

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <CategoryDropdown
                          onChangeHandler={field.onChange}
                          value={field.value}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-1 mt-5">
              <h3 className="pb-3 font-medium text-xl text-slate-600">
                Dietary Information
              </h3>

              <FormField
                control={form.control}
                name="isVegetarian"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          onCheckedChange={field.onChange}
                          checked={field.value}
                          id="isVegetarian"
                        />
                        <label>This Recipe is Vegetarian</label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isVegan"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          onCheckedChange={field.onChange}
                          checked={field.value}
                          id="isVegan"
                        />
                        <label>This Recipe is Vegan</label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <h3 className="font-medium text-xl text-slate-600">Ingredients</h3>
            <p className="py-1.5 text-sm text-neutral-600">
              Add up to 20 Ingredients:
            </p>

            <div className="flex flex-col gap-5 ">
              <div>
                <FormField
                  control={form.control}
                  name="ingredients"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-col gap-3 h-full overflow-auto p-3 bg-neutral-100 rounded-lg border border-gray-200 shadow-sm max-h-[445px]">
                          {ingredients.map((ingredient, index) => (
                            <div key={index} className="flex flex-row gap-2">
                              <Input
                                placeholder="1 Cup"
                                value={ingredient.measurement}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "measurement",
                                    e.target.value
                                  )
                                }
                                name={`ingredients.${index}.measurement`}
                                className="w-fit max-w-[150px]"
                              />
                              <Input
                                placeholder="Chicken Stock"
                                value={ingredient.name}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "name",
                                    e.target.value
                                  )
                                }
                                name={`ingredients.${index}.name`}
                                className="w-full"
                              />
                              {index !== 0 && (
                                <Button
                                  type="button"
                                  size="icon"
                                  onClick={() => handleRemoveIngredient(index)}
                                  className="px-2 text-rose-600"
                                  variant="outline"
                                >
                                  <Trash2 size={20} />
                                </Button>
                              )}
                            </div>
                          ))}
                          {ingredients.length < maxIngredients && (
                            <Button
                              type="button"
                              onClick={handleAddIngredient}
                              className="w-fit flex flex-row items-center gap-1"
                            >
                              <Plus size={20} /> Add
                            </Button>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 w-full">
          <h3 className="font-medium text-xl text-slate-600">Instructions</h3>
          <p className="py-1.5 text-sm text-neutral-600">
            Add up to 10 Steps to make the Recipe:
          </p>

          <div className="flex flex-col gap-5 ">
            <div>
              <FormField
                control={form.control}
                name="instructions"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col gap-3 h-full overflow-auto p-3 bg-neutral-100 rounded-lg border border-gray-200 shadow-sm">
                        {instructions.map((instruction, index) => (
                          <div key={index} className="flex flex-row gap-2">
                            <Textarea
                              placeholder={`Step ${index + 1}`}
                              value={instruction.step}
                              onChange={(e) =>
                                handleInputChange(index, "step", e.target.value)
                              }
                              name={`instructions.${index}.step`}
                              className="w-full resize-none"
                            />
                            {index !== 0 && (
                              <Button
                                type="button"
                                size="icon"
                                onClick={() => handleRemoveInstruction(index)}
                                className="px-2 text-rose-600 h-[60px]"
                                variant="outline"
                              >
                                <Trash2 size={20} />
                              </Button>
                            )}
                          </div>
                        ))}
                        {instructions.length < maxInstructions && (
                          <Button
                            type="button"
                            onClick={handleAddInstruction}
                            className="w-fit flex flex-row items-center gap-1"
                          >
                            <Plus size={20} /> Add Step
                          </Button>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="pb-3 font-medium text-xl text-slate-600">
            Other Notes
          </h3>

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Beef can be substituted with chicken..."
                    {...field}
                    className="h-[100px] resize-none overflow-auto"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row gap-3 mt-5">
          <Button
            size="lg"
            disabled={form.formState.isSubmitting}
            onClick={onCancel}
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            size="lg"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Submitting..." : `${type} Recipe`}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RecipeForm;
