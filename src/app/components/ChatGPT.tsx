"use client";
import { set } from "mongoose";
// Import the necessary hooks from React
import React, { useState, useEffect } from "react";

// Define the interfaces for your types
interface Message {
  role: string;
  content: string;
}

interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    message: Message;
    index: number;
    logprobs: any; // Replace 'any' with a more specific type if you know the structure
    finish_reason: string;
  }>;
}

export default function ChatGPT({
  userDietPrefArr,
}: {
  userDietPrefArr: string[];
}) {
  const [chatCompObj, setChatCompObj] = useState<OpenAIResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Message[]>([
    {
      role: "system",
      content:
        "You are a stuck up chef that is better than all other chefs. You like to mock others. However, you give clear step-by-step instruction concerning ingredients and methods for your recipes. Your replies are short and concise.",
    },
  ]);
  // console.log("CONVERSATION HISTORY: ", conversationHistory);
  const [currentContent, setCurrentContent] = useState("");

  useEffect(() => {
    // Your user diet preference string could be derived from userDietPrefArr here
    // and then set currentContent to that string
    let userDietPref = `Please give me 5 ${userDietPrefArr[2]} ${userDietPrefArr[0]} ${userDietPrefArr[4]} recipes to choose from. I am ${userDietPrefArr[1]} and I have ${userDietPrefArr[3]} to prepare the complete recipe.`;
    // const userDietPref = `Please give me 8 ${userDietPrefArr[2]} dinner semi-healthy recipes to choose from. I am meat eater and I have 1 hour to prepare the complete recipe.`;
    setCurrentContent(userDietPref);
    const userDietPrefStr = userDietPrefArr;
  }, [userDietPrefArr]);

  const handleAPISubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
    setIsLoading(true);

    const requestBody = {
      currentUserInput: { role: "user", content: currentContent },
      conversationHistory,
    };
    console.log("CURRENT USER INPUT: ", requestBody.currentUserInput);
    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`, // Make sure your API key is exposed to the client safely
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result: OpenAIResponse = await response.json();
      console.log("RESULT: ", result);
      setChatCompObj(result);

      setConversationHistory((prevHistory) => {
        // Construct a new array with the previous history and the new user input
        const newHistory = [
          ...prevHistory,
          { role: result.choices[0].message.role, content: currentContent }, // currentUserInput is replaced by its definition
          ...result.choices.map((choice) => {
            // Ensure that the role is one of the specific allowed string literals

            return {
              role: choice.message.role,
              content: choice.message.content,
            };
          }),
        ];
        return newHistory;
      });
    } catch (error) {
      console.error("Fetching error:", error);
    }
    setIsLoading(false);
  };

  // console.log("CHAT COMPLETION OBJECT: ", chatCompObj);
  const { choices } = chatCompObj || { choices: [] };
  const message = chatCompObj?.choices[0]?.message?.content;
  console.log("CHOICES: ", chatCompObj?.choices[0].message.content);

  // This regular expression matches any number in the string
  const regex = /(\d\.)/g;

  // Split the string into an array divided by numbers
  const splitArray = message?.split(regex);

  return (
    <>
      {!isSubmitted ? (
        <>
          <div className="flex justify-center items-center">
            <button
              className="my-20 p-2 bg-black text-white rounded-3xl text-2xl font-md px-[5%] shadow-2xl active:scale-[.99] active:shadow-none transform transition duration-150 hover:bg-gray-900"
              onClick={handleAPISubmit}
            >
              GET RECIPE IDEAS
            </button>
          </div>
        </>
      ) : (
        <>
          {isLoading ? (
            <>
              <p className="mt-10 text-left p-4 bg-white text-2xl font-light">
                Loading the BEST RECIPE GENERATOR 9000...
              </p>
              <svg
                className="h-[15vh] w-[15vw] animate-spin mx-auto mt-10 mb-[20vh]"
                width={700}
                height={700}
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
          ) : (
            <>
              <div className="mt-10 mb-[20vh] p-4 bg-white text-2xl font-md">
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

              <div className="flex flex-col justify-center items-center mb-[20vh]">
                <textarea
                  name="message"
                  className="border rounded-xl text-center border-black h-10 p-1 mb-5 text-xl"
                  placeholder="Enter recipe #"
                  onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setCurrentContent(event.target.value)
                  }
                ></textarea>

                <button
                  className="p-2 bg-black text-white rounded-3xl text-2xl font-md px-[5%] shadow-2xl active:scale-[.99] active:shadow-none transform transition duration-150 hover:bg-gray-900"
                  onClick={handleAPISubmit}
                >
                  GET RECIPE
                </button>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
