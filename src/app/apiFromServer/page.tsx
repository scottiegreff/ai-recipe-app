import { notFound } from "next/navigation";
import RecipeDropdown from "../components/RecipeDropdown";
import AddRecipe from "../components/AddRecipe";
import ArrayDropdown from "../components/CountryDropdown";
import FlagCards from "../components/FlagCards";
import MealCards from "../components/MealCards";
import Recipe from "../types/Recipe";
import Restriction from "../types/Restriction";
import Country from "../types/Country";
import CountryFlag from "../types/CountryFlag";
import MealTime from "../types/MealTime"

const ApiFromServer = async () => {

  async function getMealTimes(): Promise<MealTime[]> {
    const mealTimesRes = await fetch("http://localhost:3000/api/mealTimes")
    if(!mealTimesRes) return notFound();
    return await mealTimesRes.json();
  }

  async function getRecipes(): Promise<Recipe[]> {
    const recipesRes = await fetch("http://localhost:3000/api/recipes");
    if (!recipesRes.ok) return notFound();
    return await recipesRes.json();
  }

  async function getRestrictions(): Promise<Restriction[]> {
    const restrictionsRes = await fetch(
      "http://localhost:3000/api/restrictions"
    );
    if (!restrictionsRes.ok) return notFound();
    return await restrictionsRes.json();
  }

  async function getCountries(): Promise<Country[]> {
    const countriesRes = await fetch("http://localhost:3000/api/countries");
    if (!countriesRes.ok) return notFound();
    return await countriesRes.json();
  }

  async function getCountryFlags(): Promise<CountryFlag[]> {
    const countryFlagRes = await fetch(
      "http://localhost:3000/api/countryFlags"
    );
    if (!countryFlagRes.ok) return notFound();
    return await countryFlagRes.json();
  }

  const mealTimeData: MealTime[] = await getMealTimes();

  const recipeData: Recipe[] = await getRecipes();

  const countryFlagData: any = await getCountryFlags();
 

  // console.log("COUNTRY FLAG DATA:: ", countryFlagData)

  const restrictionItems: string[] = await getRestrictions().then(
    (data) => data[0]?.restrictionType
  );

  const countryItems: string[] = await getCountries().then(
    (data) => data[0]?.countryNames
  );

  return (
    <>
    
      <div className="flex justify-center item-center mt-10">
        {/* <div className="ms-10 me-20">
          API Route From <span className="font-bold underline">Server</span>
        </div> */}
        {/* <label className="me-2" htmlFor="restriction">
          Restrictions:
        </label>
        <div className="me-10">
          <ArrayDropdown items={restrictionItems} />
        </div> */}
       
        {/* <div className="me-10">
          <RecipeDropdown data={recipeData} />
        </div>
        <div>
          <AddRecipe />
        </div> */}
      </div>
      <div className="flex justify-center item-center">
        <MealCards items={mealTimeData} />
      </div>
      <div className="flex justify-center item-center">
        <FlagCards items={countryFlagData} />
      </div>
      <label className="me-10" htmlFor="countries">
          Countries:
        </label>
        <div id="countries" className="me-50">
          <ArrayDropdown items={countryItems} />
        </div>
    </>
  );
};
export default ApiFromServer;
