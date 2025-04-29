import mongoose, { Schema } from "mongoose";
import { Recipe } from "@/types/recipe";
import { v4 as uuidv4 } from "uuid";

const generatedRecipeSchema: Schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    title: String,
    ingredients: [
      {
        type: String,
      },
    ],
    image: String,
    description: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
);

const generatedRecipe =
  mongoose.models.generatedRecipe ||
  mongoose.model<Recipe>("generatedRecipe", generatedRecipeSchema);

export default generatedRecipe;
