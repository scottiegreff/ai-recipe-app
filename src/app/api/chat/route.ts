import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge"; //Provide optimal infrastructure for our API route -> read more (https://edge-runtime.vercel.app/)

const config = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(config);

//POST localhost:3000/api/chat

export async function POST(request: Request) {
  const { messages } = await request.json(); // { messages: [] }

  // messages [{ user and he says "hello there" }]
  console.log(messages);

  //GPT-4 system message
  // system message tells GPT-4 "how to act"
  //it should always be at the front of your array

  //createChatCompletion (get response from GPT-4)
  const response = await openai.createChatCompletion({
    model: "gpt-4-0613",
    stream: true,
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant. You find many food recipes from around the world.",
      },
      ...messages,
    ],
  });

  // create a strem of data from OpenAI (stream data to the frontend)
  const stream = await OpenAIStream(response);

  // send the stream as a response to our client / frontend
  return new StreamingTextResponse(stream);
}
