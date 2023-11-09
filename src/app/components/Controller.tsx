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
let gptArray: string[] = new Array(5).fill("");

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
  const [gptValue, setGPTValue] = useState<string | null>();

  function handleChildClick(parent: string | null, gptValue: string | null) {
    setParent(parent);
    setGPTValue(gptValue);
    if (parent === "mealTime" && gptValue) {
      gptTempArray[0] = gptValue;
      gptArray = [
        ...gptTempArray.slice(0, 0),
        gptValue,
        ...gptTempArray.slice(1),
      ];
    }
    if (parent === "restriction" && gptValue) {
      gptTempArray[1] = gptValue;
      gptArray = [
        ...gptTempArray.slice(0, 1),
        gptValue,
        ...gptTempArray.slice(2),
      ];
    }
    if (parent === "country" && gptValue) {
      gptTempArray[2] = gptValue;
      gptArray = [
        ...gptTempArray.slice(0, 2),
        gptValue,
        ...gptTempArray.slice(3),
      ];
    }
    if (parent === "prepTime" && gptValue) {
      gptTempArray[3] = gptValue;
      gptArray = [
        ...gptTempArray.slice(0, 3),
        gptValue,
        ...gptTempArray.slice(4),
      ];
    }
    if (parent === "nutrition" && gptValue) {
      gptTempArray[4] = gptValue;
      gptArray = [
        ...gptTempArray.slice(0, 4),
        gptValue,
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

      {gptArray[0] === "" ||
      gptArray[1] === "" ||
      gptArray[2] === "" ||
      gptArray[3] === "" ||
      gptArray[4] === "" ? (
        <p className="mt-7 text-left p-4 bg-white text-2xl font-light">
          * Please input your preferences...
        </p>
      ) : (
        <>
          <ChatGPT gptArray={gptArray} />
        </>
      )}
    </>
  );
}
