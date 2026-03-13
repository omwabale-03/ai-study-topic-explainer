import { GoogleGenAI } from "@google/genai";

const baseUrl = process.env.AI_INTEGRATIONS_GEMINI_BASE_URL;
const apiKey = process.env.AI_INTEGRATIONS_GEMINI_API_KEY;

if (!baseUrl) {
  throw new Error(
    "AI_INTEGRATIONS_GEMINI_BASE_URL is not set. Gemini integration is not configured."
  );
}

if (!apiKey) {
  throw new Error(
    "AI_INTEGRATIONS_GEMINI_API_KEY is not set. Gemini integration is not configured."
  );
}

export const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    apiVersion: "",
    baseUrl,
  },
});
