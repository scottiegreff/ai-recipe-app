import { getServerSession } from "next-auth";
import React from "react";
import { notFound } from "next/navigation";
import ChatGPT from "./components/ChatGPT";
import Controller from "./components/Controller";

import ResponseData from "./types/ResponseData";

export default async function Home() {
  const session = await getServerSession();

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

    const responseData = {
      mealTimeData,
      restrictionData,
      countryFlagData,
      prepTimeData,
    };
    return responseData;
  }

  const onLoadData: ResponseData = await getOnLoadData();

  return (
    <>
      <div className="mx-10 my-20">
        {/* <h1 className="text-6xl font-bold">Selections</h1> */}
        <Controller onLoadData={onLoadData} />
      </div>

      <div className="flex flex-col min-h-50 items-center justify-between p-24"></div>
      <div className="bg-slate-800 p-3 w-[800px] rounded-md text-white">
        <h2 className="text-2x">ChatGPT Streaming Chat App</h2>
        <ChatGPT />
      </div>
    </>
  );
}
