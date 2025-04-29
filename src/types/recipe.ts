export interface Recipe {
  title: string;
  description: string[];
  ingredients: string[];
  image: string;
  _id: string;
}

export interface GeneratedRecipes {
  recipes: Recipe[];
}

export interface GenerateRecipePayload {
  ingredients: string[];
}
