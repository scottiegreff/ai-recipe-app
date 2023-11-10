import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { notFound } from "next/navigation";
import Controller from "../components/Controller";
import logo from "../../public/fork_knife_logo.svg";
import ResponseData from "../types/ResponseData";

// *************************  USER'S PAGE !!! ****************************************************** //
export default async function Users() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/");
  }
  console.log("SESSION", session);
  

  async function getOnLoadData(): Promise<ResponseData> {
    const mealTimeRes = await fetch("http://localhost:3000/api/mealTimes");
    if (!mealTimeRes) return notFound();
    const mealTimeData = await mealTimeRes.json();

    const restrictionRes = await fetch(
      "http://localhost:3000/api/restrictions"
    );
    if (!restrictionRes) return notFound();
    const restrictionData = await restrictionRes.json();

    const countryFlagRes = await fetch(
      "http://localhost:3000/api/countryFlags"
    );
    if (!countryFlagRes) return notFound();
    const countryFlagData = await countryFlagRes.json();

    const prepTimeRes = await fetch("http://localhost:3000/api/prepTime");
    if (!prepTimeRes) return notFound();
    const prepTimeData = await prepTimeRes.json();

    const nutritionRes = await fetch("http://localhost:3000/api/nutrition");
    if (!nutritionRes) return notFound();
    const nutritionData = await nutritionRes.json();

    const responseData = {
      mealTimeData,
      restrictionData,
      countryFlagData,
      prepTimeData,
      nutritionData,
    };
    return responseData;
  }

  const onLoadData: ResponseData = await getOnLoadData();

  return (
    <>
      <h1 className="text-center mt-5 p-4 bg-white text-xs font-light">
        WELCOME TO THE MEMBERS PAGE
      </h1>
      <div className="flex justify-center items-center">
        <button
          className="mb-10 py-2 px-7 bg-black text-white rounded-3xl text-md font-md shadow-2xl active:scale-[.99] active:shadow-none transform transition duration-150 hover:bg-gray-900"
          // onClick={handleSubmit}
        >
          GET YOUR SAVED RECIPES
        </button>
      </div>

      <div className="mx-10 my-10 flex-col justify-center items center">
        <Controller onLoadData={onLoadData} />
      </div>
    </>
  );
}
