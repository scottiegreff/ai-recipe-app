// "use client";
// import React, { useState } from "react";
// import { createContext, useContext } from "react";
// import Message from "../interfaces/Message";
// import OpenAIResponse from "@/app/interfaces/OpenAIResponse";

// interface ConversationHistoryContextType {
//   conversationHistory: Message[];
// }

// const ConversationHistoryContext =
//   createContext<ConversationHistoryContextType>({
//     conversationHistory: [],
//   });

// export default function ConversationHistory() {
//   const conversationHistory = (
//     { result }: { result: OpenAIResponse },
//     { children }: { children: any }
//   ) => {
  
//     let conversationHistory: Message[] = [
//       {
//         role: "system",
//         content:
//           "You are a stuck up chef amd like to mock others. However, when once you do give a recipe you give technical instructions concerning ingredients and methods. Once in a blue moon, you will give a little bit of history lesson on one of the ingredients.",
//       },
//     ];

//     function spreadConversationHistory(conversationHistory: Message[]) {
//       // Construct a new array with the previous history and the new user input
//       // console.log("PREV HISTORY: ", prevHistory);
//       const newHistory = [
//         ...conversationHistory,
//         ...(result?.choices ?? []).map((choice) => {
//           return {
//             role: choice.message.role,
//             content: choice.message.content,
//           };
//         }),
//       ];
//       // console.log("NEW HISTORY: ", newHistory);
//       return newHistory;
//     }
//     conversationHistory = spreadConversationHistory(conversationHistory);

//     return (
//       <ConversationHistoryContext.Provider value={{ conversationHistory }}>
//         {children}
//       </ConversationHistoryContext.Provider>
//     );
//   };
// }
