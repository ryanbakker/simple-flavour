import { Document, Schema, model, models } from "mongoose";

export interface IIngredient {
  name: string;
  measurement: string;
}

export interface IStep {
  step: string;
}

export interface IRecipe extends Document {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  ingredients: IIngredient[];
  instructions: IStep[];
  prepTime: string;
  cookTime: string;
  servingSize: string;
  isVegetarian: boolean;
  isVegan: boolean;
  notes?: string;
  createdAt: Date;
  category: { _id: string; label: string };
  author: {
    _id: string;
    username: string;
    photoUrl: string;
  };
}

const IngredientSchema = new Schema({
  name: { type: String, required: true },
  measurement: { type: String, required: true },
});

const StepSchema = new Schema({
  step: { type: String, required: true },
});

const RecipeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  ingredients: [IngredientSchema],
  instructions: [StepSchema],
  prepTime: { type: String, required: true },
  cookTime: { type: String, required: true },
  servingSize: { type: String, required: true },
  isVegetarian: { type: Boolean, default: false },
  isVegan: { type: Boolean, default: false },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

const Recipe = models.Recipe || model<IRecipe>("Recipe", RecipeSchema);

export default Recipe;
