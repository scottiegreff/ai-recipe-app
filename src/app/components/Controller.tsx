"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import ResponseData from "../types/ResponseData";
import SelectionCard from "./SelectionCards";
import Accordion from "./Accordion";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import ChatGPT from "./ChatGPT";

const gptTempArray: string[] = new Array(5).fill("");
let userDietPrefArr: string[] = new Array(5).fill("");

export default function Controller({
  onLoadData,
}: {
  onLoadData: ResponseData;
}) {
  const mealTimeItems = onLoadData.mealTimeData;
  const restrictionItems = onLoadData.restrictionData;
  const countryFlagItems = onLoadData.countryFlagData;
  const prepTimeData = onLoadData.prepTimeData;
  const nutritionData = onLoadData.nutritionData;

  const [parent, setParent] = useState<string | null>();
  const [userDietPref, setUserDietPref] = useState<string | null>();

  function handleChildClick(parent: string | null, userDietPref: string | null) {
    setParent(parent);
    setUserDietPref(userDietPref);
    if (parent === "mealTime" && userDietPref) {
      gptTempArray[0] = userDietPref;
      userDietPrefArr = [
        ...gptTempArray.slice(0, 0),
        userDietPref,
        ...gptTempArray.slice(1),
      ];
    }
    if (parent === "restriction" && userDietPref) {
      gptTempArray[1] = userDietPref;
      userDietPrefArr = [
        ...gptTempArray.slice(0, 1),
        userDietPref,
        ...gptTempArray.slice(2),
      ];
    }
    if (parent === "country" && userDietPref) {
      gptTempArray[2] = userDietPref;
      userDietPrefArr = [
        ...gptTempArray.slice(0, 2),
        userDietPref,
        ...gptTempArray.slice(3),
      ];
    }
    if (parent === "prepTime" && userDietPref) {
      gptTempArray[3] = userDietPref;
      userDietPrefArr = [
        ...gptTempArray.slice(0, 3),
        userDietPref,
        ...gptTempArray.slice(4),
      ];
    }
    if (parent === "nutrition" && userDietPref) {
      gptTempArray[4] = userDietPref;
      userDietPrefArr = [
        ...gptTempArray.slice(0, 4),
        userDietPref,
        ...gptTempArray.slice(5),
      ];
    }
  }

  return (
    <>
      <hr />
      <Accordion title="Meal Time">
        <SelectionCard items={mealTimeItems} onChildClick={handleChildClick} />
      </Accordion>

      <hr />
      <Accordion title="Dietary Restrictions">
        <SelectionCard
          items={restrictionItems}
          onChildClick={handleChildClick}
        />
      </Accordion>
      <hr />
      <Accordion title="Country">
        <SelectionCard
          items={countryFlagItems}
          onChildClick={handleChildClick}
        />
      </Accordion>
      <hr />
      <Accordion title="Preparation Time">
        <SelectionCard items={prepTimeData} onChildClick={handleChildClick} />
      </Accordion>
      <hr />
      <Accordion title="Healthiness">
        <SelectionCard items={nutritionData} onChildClick={handleChildClick} />
      </Accordion>
      <hr />

      {
      userDietPrefArr[0] === "" ||
      userDietPrefArr[1] === "" ||
      userDietPrefArr[2] === "" ||
      userDietPrefArr[3] === "" ||
      userDietPrefArr[4] === "" 
      ? (
        <p className="mt-7 text-left p-4 bg-white text-2xl font-light">
          * Please input your preferences...
        </p>
      ) : (
        <>
       
          <ChatGPT userDietPrefArr={userDietPrefArr} />
        </>
      )}
    </>
  );
}
