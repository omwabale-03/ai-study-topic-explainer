"use client";

import { useState, FormEvent } from "react";

interface TopicInputProps {
  onExplain: (topic: string) => void;
  isLoading: boolean;
}

const EXAMPLE_TOPICS = [
  "Newton's Laws",
  "Photosynthesis",
  "Binary Search",
  "World War II",
];

export default function TopicInput({ onExplain, isLoading }: TopicInputProps) {
  const [topic, setTopic] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError("Please enter a topic to continue.");
      return;
    }
    setError("");
    onExplain(topic.trim());
  };

  const handleChipClick = (t: string) => {
    setTopic(t);
    setError("");
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
              setError("");
            }}
            placeholder="e.g. Photosynthesis, Newton's Laws..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
            disabled={isLoading}
            aria-label="Study topic"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-violet-600 hover:bg-violet-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-sm transition-colors text-base whitespace-nowrap"
          >
            {isLoading ? "Generating..." : "Explain Topic"}
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-sm font-medium" role="alert">
            {error}
          </p>
        )}
      </form>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-sm text-gray-500">Try:</span>
        {EXAMPLE_TOPICS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => handleChipClick(t)}
            disabled={isLoading}
            className="px-3 py-1.5 rounded-full border border-gray-200 bg-white hover:bg-violet-50 hover:border-violet-300 text-sm text-gray-700 hover:text-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
