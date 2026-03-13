import { NextRequest, NextResponse } from "next/server";
import { model } from "@/lib/aiClient";

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json(
        { error: "Please enter a topic to continue." },
        { status: 400 }
      );
    }

    const prompt = `Explain the topic "${topic}" in simple terms for a school student in about 5 sentences.`;

    const result = await model.generateContent(prompt);
    const explanation = result.response.text();

    return NextResponse.json({ explanation });

  } catch (error) {
    console.error("Gemini API error:", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}