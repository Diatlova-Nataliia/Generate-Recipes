"use client";
import React from "react";
import { allIngredients } from "@/config/ingredients";
import DropDownInput from "@/components/DropDownInput";
import Tag from "@/components/Tag";
import Button from "@/components/Button";
import { Fade } from "@mui/material";
import { useRouter } from "next/navigation";
import { generateRecipe } from "@/services/recipe-service";
import Spinner from "@/components/Spinner";

const GenerateRecipesForm = () => {
  const [selectedIngredients, setSelectedIngredients] = React.useState<
    string[]
  >([]);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  async function handleGenerateRecipesClick() {
    setLoading(true);
    try {
      await generateRecipe({ ingredients: selectedIngredients });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
    router.push("/recipes");
  }

  if (loading) {
    return (
      <div role="status" className="flex justify-center items-center pt-4">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <DropDownInput
        onChange={(e, newValue) => setSelectedIngredients(newValue)}
        options={allIngredients}
        value={selectedIngredients}
      />
      <div className="flex flex-start gap-4 px-4">
        {selectedIngredients.map((option: string) => (
          <Tag
            key={option}
            label={option}
            onDelete={() => {
              setSelectedIngredients(
                selectedIngredients.filter((entry) => entry !== option),
              );
            }}
          />
        ))}
      </div>
      {selectedIngredients.length > 0 && (
        <Fade in={selectedIngredients.length > 0} timeout={500}>
          <div className="flex items-center justify-center p-4">
            <Button
              className="cursor-pointer p-2 text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2"
              onClick={handleGenerateRecipesClick}
            >
              Generate recipes
            </Button>
          </div>
        </Fade>
      )}
    </>
  );
};

export default GenerateRecipesForm;
