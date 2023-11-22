"use client";
import { useRef, useState } from "react";
import User from "../../app/types/User";
import { signIn, signOut, useSession } from "next-auth/react";

export default function GetUsersRecipe() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const recipeDisplay = useRef<HTMLDivElement>(null);
  const closeRecipesBtn = useRef<HTMLButtonElement>(null);

  const { data: session } = useSession();
  console.log("SESSION!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!, ",session)

  const handleFetchUser = async () => {
    try {
      const userId = "6557f9b9e90e3269ce077bb0"; // Replace with the ID of the user you want to fetch
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const userData: User = await response.json();
      setUser(userData);
      setError(null);
    } catch (error: any) {
      setError(error.message);
      setUser(null);
    }
    recipeDisplay.current?.classList.remove("hidden");
    recipeDisplay.current?.classList.add("flex");

    // closeRecipesBtn.current?.classList.remove("hidden");
    closeRecipesBtn.current?.classList.add("flex");
    closeRecipesBtn.current?.classList.add("flex-col");
 
  };

  const closeRecipes = () => {
    recipeDisplay.current?.classList.remove("flex");
    recipeDisplay.current?.classList.add("hidden");
    closeRecipesBtn.current?.classList.remove("flex");
    closeRecipesBtn.current?.classList.add("hidden");
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <button
          className="mb-10 py-2 px-7 bg-black text-white rounded-3xl text-md font-md shadow-2xl active:scale-[.99] active:shadow-none transform transition duration-150 hover:bg-gray-900"
          onClick={handleFetchUser}
        >
          GET YOUR SAVED RECIPES
        </button>
        {error && <p>Error: {error}</p>}
      </div>

      {user && (
        <div
          ref={recipeDisplay}
          className="flex flex-col justify-center items-center mt-10 mb-10"
        >
          {user.recipes.map((r, index) => (
            <div
              className="flex flex-col justify-center items-center pb-20"
              key={index}
            >
              {" "}
              {/* It's better to use a unique ID if available, instead of the index */}
              <p className="p-4 text-md md:text-3xl font-bold">{r.name}</p>
              <p className="p-4 text-md md:text-xl font-md">{r.recipe}</p>
            </div>
          ))}

          <button
            // ref={closeRecipesBtn}
            className="mb-20 py-2 px-7 bg-black text-red-400 rounded-3xl text-md font-md shadow-2xl active:scale-[.99] active:shadow-none transform transition duration-150 hover:bg-gray-900"
            onClick={closeRecipes}
          >
            CLOSE RECIPES
          </button>
        </div>
      )}
    </>
  );
}
