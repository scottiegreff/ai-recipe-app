"use client";
import React, { useEffect, useState } from "react";

import { redirect } from "next/navigation";
import OpenAIResponse from "../interfaces/OpenAIResponse";
import Message from "../interfaces/Message";

export default function SaveRecipe({
  chatCompObj,
}: {
  chatCompObj: OpenAIResponse | undefined;
}) {

  // const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const userId = "6557f9b9e90e3269ce077bb0"; // Replace with the ID of the user you want to fetch
  const newRecipe = {
    name: "Recipe Name",
    recipe: chatCompObj?.choices?.[0].message.content
  };
  const data = {
    id : userId,
    recipeObj: newRecipe
  } 

  const handleSaveRecipe = async (data: Object) => {
    console.log("data and clicked", data)
    try{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}`, {
      method:'PATCH',
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data),
    })
    if(!res.ok) { return new Response('Internal Server Error', {status: 500})}
    const responseBody = await res.json();
    return responseBody;
   
  } catch (error) {
    // If an error occurs, send a generic error message
    console.error(error);
  }
}

  return (
    <>
      <button
        className="p-2 bg-black text-white rounded-3xl text-md font-md px-[5%] shadow-2xl active:scale-[.99] active:shadow-none transform transition duration-150 hover:bg-gray-900"
        onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
          handleSaveRecipe(data)
        }
        // style={{
        //   color: user ? "gray" : "red",
        // }}
      >
        Save Recipe
      </button>
    </>
  );
}
