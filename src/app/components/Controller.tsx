"use client";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import ResponseData from "../types/ResponseData";
import SelectionCard from "./SelectionCards";

export default function Controller({
  onLoadData,
}: {
  onLoadData: ResponseData;
}) {
  const mealTimeItems = onLoadData.mealTimeData;
  const restrictionItems = onLoadData.restrictionData;
  const countryFlagItems = onLoadData.countryFlagData;
  const prepTimeData = onLoadData.prepTimeData;

  const [childKey, setChildKey] = useState<string | null>();
  const [childValue, setChildValue] = useState<string | null>();

  console.log("CHILD KEY: ", childKey);
  console.log("CHILD VALUE: ", childValue);

  function handleChildClick(keyFromChild: string, valueFromChild: string) {
    setChildKey(keyFromChild);
    setChildValue(valueFromChild);
  }

  const gptArray: string[] = new Array(4).fill("");
  let gptSting = "";

  useEffect(() => {
    if (childKey === "mealTime" && childValue) {
      gptArray[0] = childValue;
    }
    if (childKey === "restriction" && childValue) {
      gptArray[1] = childValue;
    }
    if (childKey === "country" && childValue) {
      gptArray[2] = childValue;
    }
    if (childKey === "prepTime" && childValue) {
      gptArray[3] = childValue;
    }
  }, [childKey, childValue]);

  return (
    <>
      <hr />
      <div className="mx-10 my-20">
        <h1 className="text-6xl font-bold">Meal Time</h1>
        <SelectionCard items={mealTimeItems} onChildClick={handleChildClick} />
      </div>
      <hr />
      <div className="mx-10 my-20">
        <h1 className="text-6xl font-bold">Dietary Restrictions</h1>
        <SelectionCard
          items={restrictionItems}
          onChildClick={handleChildClick}
        />
      </div>
      <hr />
      <div className="mx-10 my-20">
        <h1 className="text-6xl font-bold">Cultural Selection</h1>
        <SelectionCard
          items={countryFlagItems}
          onChildClick={handleChildClick}
        />
      </div>
      <hr />
      <div className="mx-10 my-20">
        <h1 className="text-6xl font-bold">Prep Time</h1>
        <SelectionCard items={prepTimeData} onChildClick={handleChildClick} />
      </div>
      <hr />
    </>
  );
}
