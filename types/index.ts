export type Ingredient = {
  measurement: string;
  name: string;
};

export type Step = {
  step: string;
};

// User Params
export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

// Recipe Params
export type CreateRecipeParams = {
  userId: string;
  recipe: {
    title: string;
    description: string;
    imageUrl: string;
    ingredients: Ingredient[];
    instructions: Step[];
    prepTime: string;
    cookTime: string;
    servingSize: string;
    isVegetarian: boolean;
    isVegan: boolean;
    notes: string;
    categoryId: string;
  };
  path: string;
};

export type UpdateRecipeParams = {
  userId: string;
  recipe: {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    ingredients: Ingredient[];
    instructions: Step[];
    prepTime: string;
    cookTime: string;
    servingSize: string;
    isVegetarian: boolean;
    isVegan: boolean;
    notes: string;
    categoryId: string;
  };
  path: string;
};

export type DeleteRecipeParams = {
  recipeId: string;
  path: string;
};

export type GetAllRecipesParams = {
  query: string;
  category: string;
  limit: number;
  page: number;
};

export type GetRecipesByUserParams = {
  userId: string;
  limit?: number;
  page: number;
};

export type GetRelatedRecipesByCategoryParams = {
  categoryId: string;
  recipeId: string;
  limit?: number;
  page: number | string;
};

export type Recipe = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  ingredients: Ingredient[];
  instructions: Step[];
  prepTime: string;
  cookTime: string;
  servingSize: string;
  isVegetarian: boolean;
  isVegan: boolean;
  notes: string;
  category: {
    _id: string;
    label: string;
  };
  author: {
    _id: string;
    username: string;
    photoUrl: string;
  };
};

// Category Params
export type CreateCategoryParams = {
  categoryLabel: string;
};

// Query Params
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
