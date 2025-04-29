import { GeneratedRecipes, GenerateRecipePayload } from "@/types/recipe";

export async function generateRecipe(
  payload: GenerateRecipePayload,
): Promise<GeneratedRecipes> {
  const response = await fetch("/api/recipes", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return response.json();
}
