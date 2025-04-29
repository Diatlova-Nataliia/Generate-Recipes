import openai from "@/lib/openai";
import { getImages } from "@/lib/serpApi";
import generatedRecipe from "@/lib/models/GeneratedRecipes";
import { dbConnect } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  const { ingredients: selectedIngredients } = await request.json();
  let repeatedTitles = [];

  try {
    await dbConnect();
    const repeatedRecipes = await generatedRecipe
      .find({
        ingredients: { $in: selectedIngredients },
      })
      .limit(20);
    repeatedTitles = repeatedRecipes.map((recipe) => recipe.title);
    Response.json(repeatedTitles);
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    return NextResponse.json(
      { error: "Failed to retrieve tasks" },
      { status: 500 },
    );
  }

  const completion = await openai.responses.create({
    max_output_tokens: 1500,
    model: "gpt-4o-mini",
    input: [
      {
        role: "system",
        content: `You are a recipe generator.Using only the provided ingredients, generate 3 unique recipes. Don't repeat recipes with ${repeatedTitles.join(",")}`,
      },
      {
        role: "user",
        content: `Ingredients: ${selectedIngredients.join(", ")}`,
      },
    ],
    text: {
      format: {
        type: "json_schema",
        name: "generated_recipes",
        schema: {
          type: "object",
          properties: {
            recipes: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                  },
                  description: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                },
                required: ["title", "description"],
                additionalProperties: false,
              },
            },
          },
          required: ["recipes"],
          additionalProperties: false,
        },
      },
    },
  });

  try {
    const res = JSON.parse(completion.output_text);

    const recipes = res.recipes;

    for (const recipe of recipes) {
      recipe._id = uuidv4();
      recipe.image = await getImages(recipe.title);
      console.log(recipe.title);
      recipe.ingredients = selectedIngredients;
    }
    console.log(recipes);
    await dbConnect();
    const saved = await generatedRecipe.insertMany(recipes);

    return Response.json({ success: true, recipes: saved }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        { success: false, message: error.message },
        { status: 500 },
      );
    }
  }
}

export async function GET(req: NextRequest) {
  const page = parseInt(req.nextUrl.searchParams.get("page") as string);
  const perPage = parseInt(req.nextUrl.searchParams.get("limit") as string);

  try {
    await dbConnect();
    const items = await generatedRecipe
      .find()
      .sort({ createdAt: -1, _id: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage);

    return Response.json({ items });
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    return NextResponse.json(
      { error: "Failed to retrieve tasks" },
      { status: 500 },
    );
  }
}
