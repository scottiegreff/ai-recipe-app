import { notFound } from "next/navigation";
import RecipeDropdown from "../components/RecipeDropdown";
import AddRecipe from "../components/AddRecipe";
import ArrayDropdown from "../components/ArrayDropdown";
import Recipe from "@/app/types/Recipe";
import Restriction from "@/app/types/Restriction";
import Country from "@/app/types/Country";

const ApiFromServer = async () => {
  async function getRecipes(): Promise<Recipe[]> {
    const recipesRes = await fetch("http://localhost:3000/api/recipes");
    if (!recipesRes.ok) return notFound();
    return recipesRes.json();
  }

  async function getRestrictions(): Promise<Restriction[]> {
    const restrictionsRes = await fetch(
      "http://localhost:3000/api/restrictions"
    );
    if (!restrictionsRes.ok) return notFound();
    return restrictionsRes.json();
  }

  async function getCountries(): Promise<Country[]> {
    const countriesRes = await fetch("http://localhost:3000/api/countries");
    if (!countriesRes.ok) return notFound();
    return countriesRes.json();
  }

  const recipeData: Recipe[] = await getRecipes();

  const restrictionItems: string[] = await getRestrictions().then(
    (data) => data[0].restrictionType
  );

  const countryItems: string[] = await getCountries().then(
    (data) => data[0].countryNames
  );

  return (
    <>
      <div className="flex justify-center item-center mt-10">
        <div className="ms-10 me-20">
          API Route From <span className="font-bold underline">Server</span>
        </div>
        <label className="me-2" htmlFor="restriction">
          Restrictions:
        </label>
        <div className="me-10">
          <ArrayDropdown items={restrictionItems} />
        </div>
        <label className="me-2" htmlFor="restriction">
          Countries:
        </label>
        <div className="me-10">
          <ArrayDropdown items={countryItems} />
        </div>
        <div className="me-10">
          <RecipeDropdown data={recipeData} />
        </div>

        <div>
          <AddRecipe />
        </div>
      </div>
    </>
  );
};
export default ApiFromServer;
