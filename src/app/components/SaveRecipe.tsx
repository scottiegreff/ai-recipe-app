import React from "react";
import { getServerSession } from "next-auth";

interface Message {
  role: string;
  content: string;
}

function SaveRecipe({ recipe }: { recipe: String | null }) {
  const session = getServerSession();
console.log("RECIPE FROM SAVE RECIPE: ", recipe);
  const handleAPISubmit = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    // setIsSubmitted(true);
    // setIsLoading(true);

    // const requestBody = {
    //   currentUserInput: { role: "user", content: currentContent },
    //   conversationHistory,
    // };
    // console.log("CURRENT USER INPUT: ", requestBody.currentUserInput);
    // try {
    //   const response = await fetch("http://localhost:3000/api/chat", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`, // Make sure your API key is exposed to the client safely
    //     },
    //     body: JSON.stringify(requestBody),
    //   });

    //   if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    //   }

    //   const result: OpenAIResponse = await response.json();
    //   console.log("RESULT: ", result);
    //   setChatCompObj(result);

    //   setConversationHistory((prevHistory) => {
    //     // Construct a new array with the previous history and the new user input
    //     const newHistory = [
    //       ...prevHistory,
    //       { role: result.choices[0].message.role, content: currentContent }, // currentUserInput is replaced by its definition
    //       ...result.choices.map((choice) => {
    //         // Ensure that the role is one of the specific allowed string literals

    //         return {
    //           role: choice.message.role,
    //           content: choice.message.content,
    //         };
    //       }),
    //     ];
    //     return newHistory;
    //   });
    // } catch (error) {
    //   console.error("Fetching error:", error);
    // }
    // setIsLoading(false);
  };

  return (
    <>
      <button
        className="p-2 bg-black text-white rounded-3xl text-md font-md px-[5%] shadow-2xl active:scale-[.99] active:shadow-none transform transition duration-150 hover:bg-gray-900"
        onClick={handleAPISubmit}
      >
        GET RECIPE
      </button>
    </>
  );
}

export default SaveRecipe;
