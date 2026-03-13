import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/lib/aiClient";

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Please enter a topic to continue." },
      { status: 400 }
    );
  }

  const topic =
    body && typeof body === "object" && "topic" in body
      ? (body as { topic: unknown }).topic
      : undefined;

  if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
    return NextResponse.json(
      { error: "Please enter a topic to continue." },
      { status: 400 }
    );
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Explain the topic "${topic.trim()}" in simple terms for a school student in about 5 sentences.`,
            },
          ],
        },
      ],
      config: { maxOutputTokens: 8192 },
    });

    const explanation = response.text ?? "";
    return NextResponse.json({ explanation });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
