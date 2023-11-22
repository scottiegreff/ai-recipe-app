"use client";
import SaveRecipe from "./SaveRecipe";
import React, { useState, useEffect, useRef } from "react";
import ChatGptApiCall from "./ChatGptApiCall";
import Message from "../interfaces/Message";
import OpenAIResponse from "@/app/interfaces/OpenAIResponse";
import RecipeDisplay from "./RecipeDisplay";

export default function ChatGPT({
  userDietPrefArr,
}: {
  userDietPrefArr: string[];
}) {
  const submitGptBtnRef = useRef(null);
  let result: OpenAIResponse | undefined = undefined;
  const [chatCompObj, setChatCompObj] = useState<OpenAIResponse | undefined>();
  let newHistory = [];
  const [isFetching, setIsFetching] = useState(false);
  const [isGettingRecipes, setIsGettingRecipes] = useState(false);
  // const [user, setUser] = useState<string>();
  const [conversationHistory, setConversationHistory] = useState<Message[]>([
    {
      role: "system",
      content:
        "You are a stuck up chef amd like to mock others. You are to the point. Once in a while, you like to give a history lesson of an ingredient.",
        // "A helpful recipe generator that gives technical and historical information about the ingredients and cooking techniques."
    },
  ]);
  const [currentContent, setCurrentContent] = useState("");

  useEffect(() => {
    // let userDietPref = `Please give me 5 ${userDietPrefArr[2]} ${userDietPrefArr[0]} ${userDietPrefArr[4]} recipes to choose from. I am ${userDietPrefArr[1]} and I have ${userDietPrefArr[3]} to prepare the complete recipe.`;
    const userDietPref = "Please give me a list of 5 Italian dinner recipes. I am meat eater that is looking for comfort food and I have 1 hour to prepare the complete recipe.";
    setCurrentContent(userDietPref);
    
  }, [userDietPrefArr]);

  const handleAPISubmit = async () =>  {
    // event.preventDefault();
    setIsGettingRecipes(true);
    setIsFetching(true);

    const requestBody = {
      currentUserInput: { role: "user", content: currentContent },
      conversationHistory,
    };
    result = await ChatGptApiCall({ requestBody });
    // console.log("RESULT OF CHATGPT!", result);
    setChatCompObj(result);
    setConversationHistory((prevHistory) => {
      // Construct a new array with the previous history and the new user input
      newHistory = [
        ...prevHistory,
        ...(result?.choices ?? []).map((choice) => {
          return {
            role: choice.message.role,
            content: choice.message.content,
          };
        }),
      ];
      return newHistory;
    });
  };

  useEffect(() => {
    if (chatCompObj) {
      setIsFetching(false);
    }
  }, [chatCompObj]);

  // Event handler for key down in textarea
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Check if the Enter key was pressed
    if (event.key === 'Enter') {
      // Prevent the default action to avoid form submission or newline insertion
      event.preventDefault();
      
      // Call the button click handler
      handleAPISubmit();
    }
  };


  if (!isGettingRecipes && !isFetching && !chatCompObj) {
    return (
      <div className="flex justify-center items-center">
        <button
          className="my-20 p-2 bg-black text-white rounded-3xl text-lg font-light px-[5%] shadow-2xl active:scale-[.99] active:shadow-none transform transition duration-150 hover:bg-gray-900"
          onClick={handleAPISubmit}
        >
          GET RECIPE IDEAS
        </button>
      </div>
    );
  }
  if ((isGettingRecipes && isFetching) || !chatCompObj) {
    return (
      <>
        {/* shows LOADING and spinner */}
        <p className="mt-10 text-left p-4 bg-white text-md md:text-xl font-light">
          Loading the RECIPE GENERATOR 9000...
        </p>
        <svg
          className="h-[4vh] w-[4vw] animate-spin mx-auto mt-10 mb-[20vh]"
          width={300}
          height={300}
          version="1.1"
          viewBox="0 0 700 700"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fillRule="evenodd">
            <path d="m449.61 275.88c-270.51 269.86-304.19 347.87-341.11 384.79-10.551 10.551-31.402 8.2422-59.129-6.3828-14.625-27.727-16.934-48.578-6.3828-59.129 36.918-36.918 114.93-70.605 384.79-341.11 0.035156-0.035156 0.070312-0.070313 0.10547-0.10938 25.477-25.477-18.195-54.59 36.395-109.18 54.594-54.594 133.27-111.43 134.66-112.82 1.3945-1.3945 4.5508 0.91016 2.7305 2.7266-1.8203 1.8203-104.64 106.46-108.28 110.1s-1.8203 9.0977 0.91016 11.828l1.8203 1.8203c2.8164 2.8164 8.1875 4.5469 11.828 0.91016 3.6406-3.6406 115.55-106.46 117.38-108.28 1.8203-1.8203 5.457 1.8203 3.6406 3.6406-1.8203 1.8203-108.28 113.73-111.92 117.38-3.6367 3.6367-1.707 9.2109 0.91016 11.828l1.8203 1.8203c2.9062 2.9062 8.1875 4.5469 11.828 0.91016 3.6406-3.6406 115.55-110.1 117.38-111.92 1.8203-1.8203 5.4609 1.8203 3.6406 3.6406-1.8203 1.8203-104.64 113.73-108.28 117.38s-1.7852 9.1289 0.91016 11.828l1.8203 1.8203c2.7305 2.7305 8.1875 4.5469 11.828 0.91016 3.6406-3.6406 108.28-106.46 110.09-108.28 1.8203-1.8203 4.5508 0.91016 2.7305 2.7305-1.8203 1.8203-71.828 93.664-112.82 134.66-54.594 54.594-83.711 10.922-109.19 36.398-0.035156 0.035156-0.070313 0.070312-0.10547 0.10547z" />
            <path d="m344.82 322.94c-17.848-17.324-36.723-35.879-56.68-55.773-35.969-35.969-84.844-84.855-137.69-137.7-87.121-87.121-96.141-86.242-112.14-70.234-30.855 30.855 110.34 207.95 164.93 262.54 51.891 51.891 85.391-1.1875 110.46 15.309 2.5586 2.625 5.0938 5.2305 7.5977 7.8125 7.6523-7.0781 15.492-14.395 23.527-21.957zm36.133 34.723c185.16 176.1 246.61 205.26 278.12 236.77 10.547 10.551 8.2383 31.402-6.3828 59.129-27.727 14.625-48.582 16.934-59.129 6.3828-31.465-31.465-60.582-92.777-235.96-277.27 7.5078-8.125 15.285-16.461 23.348-25.02z" />
          </g>
        </svg>
      </>
    );
  }
  if (isGettingRecipes && !isFetching && chatCompObj) {
    return (
      // shows the recipe ideas
      <>
        <div className="flex flex-col justify-center items-center mb-[20vh]">
          <RecipeDisplay
            replyMessage={chatCompObj?.choices?.[0]?.message.content}
          />

          <textarea
            name="message"
            className="border rounded-xl text-center border-black w-80 h-10 md:h-10 md:w-[30vw] p-1 mb-5 md:text-xl"
            placeholder="Enter Recipe # or Recipe Questions"
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
              setCurrentContent(event.target.value)
            }
            onKeyDown={handleKeyDown}
          ></textarea>

          <button
            className="p-2 mb-5 bg-black text-white rounded-3xl text-md font-md px-[6%] shadow-2xl active:scale-[.99] active:shadow-none transform transition duration-150 hover:bg-gray-900"
            onClick={handleAPISubmit}
           
          >
            GET RECIPE
          </button>
          {chatCompObj === undefined ? (
            <>
            {/* {console.log("chatCompObj1: ", chatCompObj)} */}
            </>
          ) : (
            <>
              {/* {console.log("chatCompObj2: ", chatCompObj)} */}
              <SaveRecipe chatCompObj={chatCompObj} />
            </>
          )}
        </div>
      </>
    );
  }
}
