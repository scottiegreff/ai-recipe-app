import connectMongoDB from "../../../../mongoose";
import Recipe from "../../models/recipe";
import { NextRequest, NextResponse } from "next/server";

export const POST = async function (req: NextRequest, res: NextResponse) {
  if (req.method == "POST") {
    try {
      const body = await req.json();
      const { name } = body;
      await connectMongoDB();
      const recipe = await Recipe.create({ name });
      console.log("Recipe:", recipe);
      return new NextResponse("POST request received", { status: 200 });
    } catch (error) {
      return new NextResponse(
        "Error in POSTING BEERS in recipes/route.ts: !!!!!!" + error,
        { status: 500 }
      );
    }
  }
};

export const GET = async function (req: NextRequest) {
  if (req.method == "GET") {
    try {
      await connectMongoDB();
      const recipe = await Recipe.find();
      if (recipe) return new NextResponse(JSON.stringify(recipe), { status: 200 });
    } catch (error) {
      return new NextResponse(
        "Error in fetching BEERS in recipes/route.ts: !!!!!!" + error,
        { status: 500 }
      );
    }
  }
};
