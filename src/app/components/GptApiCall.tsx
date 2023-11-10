// import { get } from "http";
// import ChatCompletion from "../types/ChatCompletion";
// import MessagesArray from "../types/MessagesArray";

// async function GptApiCall({ messageArray }: { messageArray: MessagesArray }) {
//   let chatCompObj: ChatCompletion = {
//     id: "",
//     object: "",
//     created: 0,
//     model: "",
//     choices: [
//       { index: 0, message: { role: "", content: "" }, finish_reason: "" },
//     ],
//     usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
//   };
//   console.log("MESSAGE ARRAY: ", messageArray.message[0].content);
//   if (messageArray) {
//     messageArray.model = "gpt-4-1106-preview";
//     {
//       try {
//         const res = await fetch("http://localhost:3000/api/chat", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "Access-Control-Allow-Origin": "*",
//             Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//           },

//           body: JSON.stringify(messageArray),
//         });
//         const data: ChatCompletion = await res.json();
//         console.log("DATA: ", data);
//         chatCompObj = data;
//       } catch (err) {
//         console.log("ERROR: ", err);
//       }
//       return chatCompObj;
//     }
//     // // might be wrong
//     // if (messageArray) {
//     //   chatCompObj = await getChatGptApiCall(messageArray);
//     // }
//     return chatCompObj;
//   }
// }
// export default GptApiCall;
