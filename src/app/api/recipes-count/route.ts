import { dbConnect } from "@/lib/dbConnect";
import generatedRecipe from "@/lib/models/GeneratedRecipes";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const recipes = await generatedRecipe.estimatedDocumentCount();

    return NextResponse.json({ recipesCount: recipes });
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    return NextResponse.json(
      { error: "Failed to retrieve tasks" },
      { status: 500 },
    );
  }
}
