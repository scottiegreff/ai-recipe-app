import { notFound } from "next/navigation";
import RecipeDropdown from "../components/RecipeDropdown";
import AddRecipe from "../components/AddRecipe";

const ApiFromServer = async () => {
  const recipesReq = await fetch("http://localhost:3000/api/recipes");
  if (!recipesReq.ok) return notFound();
  const recipesObj = await recipesReq.json();

  return (
    <>
      
      <div className="flex justify-center item-center mt-10">
      <div className="ms-10 me-20">
        API Route From <span className="font-bold underline">Server</span>
      </div>
        <div className="ms-10 me-20">
          <div className="flex items-center gap-3">
            <label htmlFor="culture">RECIPES</label>
            <RecipeDropdown data={recipesObj} />
          </div>
        </div>
        <div>
          <AddRecipe />
        </div>
      </div>
    </>
  );
};
export default ApiFromServer;

