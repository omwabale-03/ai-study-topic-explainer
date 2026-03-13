"use client";

import { useState } from "react";
import TopicInput from "@/components/TopicInput";
import ExplanationCard from "@/components/ExplanationCard";

interface ExplainResult {
  topic: string;
  explanation: string;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ExplainResult | null>(null);
  const [apiError, setApiError] = useState("");

  const handleExplain = async (topic: string) => {
    setIsLoading(true);
    setApiError("");
    setResult(null);

    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();

      if (!res.ok) {
        setApiError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setResult({ topic, explanation: data.explanation });
    } catch {
      setApiError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <span className="inline-block text-4xl mb-4">🎓</span>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            AI Study Topic Explainer
          </h1>
          <p className="text-gray-500 text-lg">
            Enter any study topic and get a simple, student-friendly explanation
            powered by Gemini AI.
          </p>
        </div>

        <TopicInput onExplain={handleExplain} isLoading={isLoading} />

        {isLoading && (
          <div className="mt-6 flex items-center justify-center gap-3 text-violet-600 font-medium">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            Generating explanation...
          </div>
        )}

        {apiError && !isLoading && (
          <div
            className="mt-6 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm font-medium"
            role="alert"
          >
            {apiError}
          </div>
        )}

        {result && !isLoading && (
          <ExplanationCard
            topic={result.topic}
            explanation={result.explanation}
          />
        )}

        <p className="text-center text-xs text-gray-400 mt-10">
          Powered by{" "}
          <span className="font-semibold text-violet-400">Gemini AI</span>{" "}
          &middot; Built with Next.js &amp; Tailwind CSS
        </p>
      </div>
    </main>
  );
}
