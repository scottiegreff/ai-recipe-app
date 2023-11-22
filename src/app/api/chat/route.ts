
// pages/api/chat.ts
import type { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch';
import OpenAIResponse from '@/app/interfaces/OpenAIResponse';
import Message from '@/app/interfaces/Message';
import ChatRequestBody from '@/app/interfaces/ChatRequestBody';

export async function POST(
  req: NextRequest,
  res: NextResponse<OpenAIResponse | { message: string }>
) {
  

  // Ensure the request body is structured correctly
  const { currentUserInput, conversationHistory } = await req.json();
  // console.log("User Input: ", currentUserInput);
  // console.log("Conversation History: ", conversationHistory);
  const openApiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  const data = {
    model: "gpt-4-1106-preview",
    max_tokens: 50, //750
    messages: [...conversationHistory, currentUserInput]
  };

  try {
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Authorization': `Bearer ${openApiKey}`
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