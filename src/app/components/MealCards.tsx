"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import MealTime from "../types/MealTime";

export default function MealCards({ items }: { items: MealTime[] }) {

  const [selectedMeal, setSelectedMeal] = useState("");

  const handleButtonClick = (mealTimeName: string) => {
    console.log("MEAL NAME: ", mealTimeName);
    setSelectedMeal(mealTimeName);
  };

  return (
    <>
      <div className="flex flex-wrap mt-10">
        {Object.keys(items).map((key) => {
          // console.log("KEY: ", key);
          // console.log("ITEMS: ", items[key]);
          return (
            <div
              key={key}
              className="m-5 bg-white border rounded rounded-b-2xl shadow-xl transition-transform duration-200 ease-in-out transform hover:scale-[1.01] active:scale-[1.0] active:shadow-lg active:rounded-t-none"
              style={{
                width: 250,
                height: 250,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <button
                className="p-3"
                value={items[key].mealTimeName}
                onClick={() => handleButtonClick(items[key].mealTimeName)}
              >
                <Image
                  src={`/mealTimes/${items[key].mealTimeImage}.jpg`}
                  width={150}
                  height={200}
                  alt={`${items[key].mealTimeName}`}
                  priority={true}
                  className="shadow-lg rounded-3xl"
                />
              </button>
              <p className="mb-5 font-light">{items[key].mealTimeName}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
