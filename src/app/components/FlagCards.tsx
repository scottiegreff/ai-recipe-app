"use client";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import CountryFlag from "../types/CountryFlag";


export default function FlagCards({ items }: { items: CountryFlag }) {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryFlags, setCountryFlags] = useState<CountryFlag[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      if (!items) {
        setIsLoading(false);
        return;
      }
      else{
        setCountryFlags([items]); // wrap items inside an array
        setIsLoading(false);
      }
  }, []);

  const handleButtonClick = (flagName: string) => {
    console.log("FLAG NAME: ", flagName);
    setSelectedCountry(flagName);
  };

  return (
    <>
         {isLoading ? (
        <p>Loading country flags...</p>
      ) : (
      <div className="flex flex-wrap mt-10">
        {Object.keys(items).map((key) => {
          // console.log("KEY: ", key);
          // console.log("ITEMS: ", items[key]);
          return (
            <div
              key={key}
              className="m-5 bg-white border rounded rounded-b-2xl shadow-xl transition-transform duration-200 ease-in-out transform hover:scale-[1.01] active:scale-[1.0] active:shadow-lg active:rounded-t-none"
              style={{
                width: 125,
                height: 125,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <button
                className="w-[100px] h-[100px] flex justify-center items-center overflow-hidden "
                value={items[key].citizen}
                onClick={() => handleButtonClick(items[key].citizen)}
              >
           
                  <Image
                    src={`/flags/${items[key].flagImage}.jpg`}
                    width={100}
                    height={100}
                    alt={`${items[key].flagName} Flag`}
                    priority={true}
                    className="object-contain rounded-2xl"
                  />
         
              </button>
              <p className="mb-2 font-light">{items[key].flagName}</p>
            </div>
          );
        })}
      </div>
      )}
    </>
  );
}
