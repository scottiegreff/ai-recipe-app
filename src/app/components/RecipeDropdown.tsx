"use client";

import { useState, useEffect } from "react";

export default function recipeDropdown({
  data,
}: {
  data: Record<string, { _id: string; name: string }>;
}) {
  const recipeArray = Object.values(data);
  const [selectedRecipe, setSelectedRecipe] = useState("");
  
  useEffect(() => {
    console.log("CHANGED RECIPE NAME", selectedRecipe);
  }, [selectedRecipe]);

  return (
    <>
      <select
        value={selectedRecipe}
        onChange={(e) => setSelectedRecipe(e.target.value)}
        name="recipe"
        className="p-1 border rounded-lg border-black"
      >
        {recipeArray &&
          recipeArray.map((data: { _id: string; name: string }) => (
            <option key={data._id}>{data?.name}</option>
          ))}
      </select>
    </>
  );
}
