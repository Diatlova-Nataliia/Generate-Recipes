"use client";

import RecipeCard from "@/components/RecipeCard";
import React, { useEffect } from "react";
import { Recipe } from "@/types/recipe";
import Pagination from "@/components/Pagination";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

const CardsContainer = () => {
  const [expanded, setExpanded] = React.useState<string | null>(null);
  const [recipesCount, setRecipesCount] = React.useState(0);
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [page, setPage] = React.useState(1);
  const perPage = 3;
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/api/recipes-count");
      const data = await response.json();
      setRecipesCount(data.recipesCount);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `/api/recipes?page=${page}&limit=${perPage}`,
      );
      const data = await response.json();
      setRecipes(data.items);
    };
    getData();
  }, [page]);

  function handleExpanded(id: string) {
    if (expanded === id) {
      setExpanded(null);
    } else {
      setExpanded(id);
    }
  }

  return (
    <>
      <div className="flex justify-center pt-4 ">
        <Button
          className="cursor-pointer p-2 text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => router.push("/")}
        >
          Cook Up Something New
        </Button>
      </div>
      <div className="grid md:grid-cols-3 md:grid-rows-1 md:items-start gap-4 p-4 ">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            expanded={expanded === recipe._id}
            onClick={() => handleExpanded(recipe._id)}
          />
        ))}
      </div>
      <div className="flex justify-center align-middle gap-4">
        <Pagination
          incrementPage={() => setPage(page + 1)}
          decrementPage={() => setPage(page - 1)}
          disabledEnd={page * perPage + 1 > recipesCount}
          disabledStart={page <= 1}
          className={"cursor-pointer p-2"}
        />
      </div>
    </>
  );
};
export default CardsContainer;
