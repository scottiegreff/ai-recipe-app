import Message from "../interfaces/Message";
import OpenAIResponse from "@/app/interfaces/OpenAIResponse";
import ChatRequestBody from "@/app/interfaces/ChatRequestBody";

export default async function ChatGptApiCall({
  requestBody,
}: {
  requestBody: ChatRequestBody;
}) {
    // Ensure the request body is structured correctly
    const { currentUserInput, conversationHistory } = requestBody;
    const openApiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
;
    const data = {
      model: "gpt-4-1106-preview",
      max_tokens: 600, //600
      messages: [...conversationHistory, currentUserInput]
    };
  
    try {
      const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': `Bearer ${openApiKey}`,
        },
        body: JSON.stringify(data),
      });
  
      if (!openaiResponse.ok) {
        return new Response('Internal Server Error', {status: 500});
      }
      const responseBody = await openaiResponse.json();
      return responseBody;
     
    } catch (error) {
      // If an error occurs, send a generic error message
      console.error(error);
    }
  }
