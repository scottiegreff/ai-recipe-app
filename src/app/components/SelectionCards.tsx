"use client"
import Image from "next/image";
import { useState, useEffect, use } from "react";
import CardData from "../types/CardData";

export default function SelectionCard({
  items,
  onChildClick,
}: {
  items: CardData;
  onChildClick: Function;
}) {
  const [selection, setSelection] = useState<Object>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!items) {
      setIsLoading(false);
      return;
    } else {
      setSelection([items]); // wrap items inside an array
      setIsLoading(false);
    }
  }, []);

  function handleClick(parent: string, gptValue: string) {
    // console.log("PARENT: ", parent);
    // console.log("GPT VALUE: ", gptValue);
    onChildClick(parent, gptValue);
  }

  const [activeButton, setActiveButton] = useState(null);
  useEffect(() => {
    // console.log("User's Input: ", activeButton);
  }, [activeButton]);

  return (
    <>
      {isLoading ? (
        <p>Loading Selection Cards...</p>
      ) : (
        <div className="flex flex-wrap mt-10">
          {Object.keys(items).map((key) => {
            // console.log("KEY: ", key);
            // console.log("ITEMS: ", items[key]);
            return (
              <div
                key={key}
                className="flex flex-col items-center justify-center w-[15%] h-[15%] m-5 rounded-full shadow-md transition-transform duration-200 ease-in-out transform hover:scale-[1.04] active:scale-[1.0] active:shadow-lg"
              >
                <button
                  key={key}
                  className={`relative inline-block ${
                    activeButton === items[key]
                      ? "border-[4px] border-slate-600 rounded-full"
                      : "border-none"
                  }`}
                  value={items[key].name}
                  onClick={() => {
                    setActiveButton(items[key]);
                    handleClick(items[key].parent, items[key].gptValue);
                  }}
                >
                  <img
                    key={key}
                    width={0}
                    height={0}
                    src={`/${items[key].image}.jpg`}
                    className="w-full h-auto block shadow-lg rounded-full opacity-30 transition-opacity duration-300"
                    alt={`${items[key].name}`}
                    // priority={true}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-[1rem] md:text-[2rem] text-slate-900 font-thin">
                    {items[key].name}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
