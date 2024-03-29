import { notFound } from "next/navigation";
import Controller from "../components/Controller";
import logo from "../../public/fork_knife_logo.svg";
import ResponseData from "../types/ResponseData";
import GetUsersRecipe from "../components/GetUsersRecipe";

import { authOptions } from "@/lib/nextauthOptions";
import { getServerSession } from "next-auth/next";
import React from "react";
import { redirect } from "next/navigation";

// *************************  USER'S PAGE !!! ****************************************************** //
export default async function Members() {


  async function getOnLoadData(): Promise<ResponseData> {
    const mealTimeRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/mealTimes`
    );
    if (!mealTimeRes) return notFound();
    const mealTimeData = await mealTimeRes.json();

    const restrictionRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/restrictions`
    );
    if (!restrictionRes) return notFound();
    const restrictionData = await restrictionRes.json();

    const countryFlagRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/countryFlags`
    );
    if (!countryFlagRes) return notFound();
    const countryFlagData = await countryFlagRes.json();

    const prepTimeRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/prepTime`
    );
    if (!prepTimeRes) return notFound();
    const prepTimeData = await prepTimeRes.json();

    const nutritionRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/nutrition`
    );
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

  const session = await getServerSession(authOptions);
// console.log("SESSION, ",session)
  // redirect to signin if there is no session.
  if (!session?.user) {
    const url = new URL("/api/auth/signin", process.env.NEXT_PUBLIC_BASE_URL);
    url.searchParams.append("callbackUrl", "/members");
    redirect(url.toString());
  }
  // display the page
  // return (
  //   <div>
  //     <h1>Welcome to the Restricted Page, {session?.user?.name}</h1>
  //   </div>
  // );
// }
return (
  <>
    <h1 className="text-center mt-5 p-4 bg-white text-xs font-light">
      WELCOME TO THE MEMBERS PAGE
    </h1>
    <GetUsersRecipe />
    <div className="mx-10 my-10 flex-col justify-center items center">
      <Controller onLoadData={onLoadData} />
    </div>
  </>
);
}
