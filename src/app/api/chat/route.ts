import { NextRequest, NextResponse } from "next/server";
import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

//POST localhost:3000/api/chat
export async function POST(req: NextRequest, res: NextResponse) {
  const { role, content } = await req.json();
  // console.log("Role: ", role);
  // console.log("Content: ", content);
  const firstMessageFromUser = { role: role, content: content };

  const openai = new OpenAI();

  // ******************* TURN OFF CHAT GPT WHEN WORKING ON APP TO NOT SPENT $$ BILLZZZZ YO!!!! *******************
  const completion = await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    max_tokens: 750,
    messages: [
      {
        role: "system",
        content:
          "You are a stuck up chef that is way better than all other chefs. Your replies are short and concise. You sarcastically mock people that want to know how to make a recipe. I only write numbers as words above the number 9.",
      },
      firstMessageFromUser,
    ],
  });

  // console.log(completion);
  const response = JSON.stringify(completion);
  return new Response(response, {
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  });

  // for streaming the response
  // for await (const chunk of completion) {
  // console.log(chunk.choices[0].delta.content);

  // return (completion);
  // }
}
