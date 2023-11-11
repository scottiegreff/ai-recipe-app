
// pages/api/chat.ts
import type { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch';

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}
interface ChatRequestBody {
  currentUserInput: string;
  conversationHistory: Message[];
}

// Define the structure of the expected response from OpenAI API
interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    index: number;
    logprobs: any; // Replace 'any' with a more specific type if you know the structure
    finish_reason: string;
  }>;
}

export async function POST(
  req: NextRequest,
  res: NextResponse<OpenAIResponse | { message: string }>
) {
  

  // Ensure the request body is structured correctly
  const { currentUserInput, conversationHistory } = await req.json();
  console.log("User Input: ", currentUserInput);
  console.log("Conversation History: ", conversationHistory);

  const data = {
    model: "gpt-4-1106-preview",
    max_tokens: 150, //750
    messages: [...conversationHistory, currentUserInput]
  };

  try {
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify(data),
    });

    if (!openaiResponse.ok) {
      return new Response('Internal Server Errorzzzzz', {status: 500});
    }

    const responseBody = await openaiResponse.text();
    console.log("Response Body: ", responseBody); 
    return new Response(responseBody, {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    });
   
  } catch (error) {
    // If an error occurs, send a generic error message
    console.error(error);
  }
}