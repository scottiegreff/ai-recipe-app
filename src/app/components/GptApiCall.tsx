import { get } from "http";
import ChatCompletion from "../types/ChatCompletion"
async function GptApiCall({ gptString }: { gptString: string }) {

  let chatCompObj: ChatCompletion = {id: "", object: "", created: 0, model: "", choices:[ { index: 0, message: { role: "", content: ""}, finish_reason: ""}], usage: {prompt_tokens: 0, completion_tokens: 0, total_tokens: 0}};

  async function getChatGptApiCall(gptString : String) : Promise<ChatCompletion> {
  try {
    const res = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },

      body: JSON.stringify({ role: "user", content: gptString }),
    });
    const data: ChatCompletion = await res.json();
    // console.log("DATA: ", data);
    chatCompObj = data;
  } catch (err) {
    console.log("ERROR: ", err);
  }
  return chatCompObj;
  
}
  
    chatCompObj = await getChatGptApiCall(gptString);
    return chatCompObj;
  }




export default GptApiCall;
