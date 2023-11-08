"use client";
import React, { useState, useEffect, MouseEventHandler } from "react";

import GptApiCall from "./GptApiCall";
import ChatCompletion from "../types/ChatCompletion";

export default function ChatGPT({ gptArray }: { gptArray: string[] }) {
  const [chatCompObj, setChatCompObj] = useState<ChatCompletion>();
  const [isLoading, setIsLoading] = useState(true);
  const [recipeEntered, setRecipeEntered] = useState<string>("");
  console.log("RECIPE ENTERED: ", recipeEntered);
  // let messages = {"content": "", "role": ""};
  // useEffect(() => {
  //   console.log("GPT STRING FROM CHAT GPT COMPONENT: ", gptString);
  // }, [gptArray]);

  const gptString = `Please give me 8 ${gptArray[2]} ${gptArray[0]} ${gptArray[4]} recipes to choose from. I am ${gptArray[1]} and I have ${gptArray[3]} to prepare the complete recipe.`;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await GptApiCall({ gptString: recipeEntered });
  //     setChatCompObj(result);
  //     setIsLoading(false);
  //   };

  //   fetchData();
  // }, []);

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    // setRecipeEntered(recipeEntered);
    useEffect(() => {
      const fetchData = async () => {
        const result = await GptApiCall({ gptString: recipeEntered });
        setChatCompObj(result);
        if (result.choices[0].message.content !== "") setIsLoading(false);
      };

      fetchData();
    }, []);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await GptApiCall({ gptString });
      setChatCompObj(result);
      if (result.choices[0].message.content !== "") setIsLoading(false);
    };

    fetchData();
  }, []);

  console.log("CHAT COMPLETION OBJECT: ", chatCompObj);
  const { choices } = chatCompObj || { choices: [] };
  const message = chatCompObj?.choices[0]?.message?.content;
  console.log("CHOICES: ", chatCompObj?.choices[0].message.content);

  // This regular expression matches any number in the string
  const regex = /(\d\.)/g;

  // Split the string into an array divided by numbers
  const splitArray = message?.split(regex);

  return (
    <>
      {isLoading ? (
        <>
          <p className="mt-7 mb-[20vh] text-left p-4 bg-white text-2xl font-light">
            * Loading the BEST RECIPE GENERATOR 9000...
          </p>
        </>
      ) : (
        <>
          <div className="mt-10 mb-[20vh] p-4 bg-white text-2xl font-md">
            PLEASE CHOOSE A RECIPE BELOW:
            <ul className="mt-10 font-light">
              {splitArray?.map((item, index) => {
                // Check if 'item' is a number using the regex
                if (/(\d\.)/g.test(item)) {
                  // Render item as a list element if it's a number
                  return (
                    <li className="font-bold mt-10" key={index}>
                      {item}
                    </li>
                  );
                } else {
                  // Just return the text if it's not a number
                  return (
                    <span className="ms-5" key={index}>
                      {item}
                    </span>
                  );
                }
              })}
            </ul>
          </div>
          {/* <form method="POST" target="_blank"> */}
          <div className="flex flex-col justify-center items-center mb-[20vh]">
            <textarea
              name="message"
              className="border rounded-xl text-center border-black h-10 p-1 mb-5 text-xl"
              placeholder="Enter recipe #"
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                setRecipeEntered(event.target.value)
              }
            ></textarea>

            <button
              className="p-2 bg-black text-white rounded-3xl text-2xl font-md px-[5%] shadow-2xl active:scale-[.99] active:shadow-none transform transition duration-150 hover:bg-gray-900"
              onClick={handleSubmit}
            >
              GET RECIPE
            </button>
          </div>
          {/* </form> */}
        </>
      )}
    </>
  );
}

{
  /* <div className="mt-20 text-3xl leading-[3rem]">{message}</div> */
}
