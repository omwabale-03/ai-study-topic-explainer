interface ExplanationCardProps {
  topic: string;
  explanation: string;
}

export default function ExplanationCard({
  topic,
  explanation,
}: ExplanationCardProps) {
  return (
    <div className="w-full bg-white rounded-2xl border border-violet-100 shadow-md p-6 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-violet-100 text-violet-600 text-lg">
          📚
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-500">
            Topic
          </p>
          <h2 className="text-lg font-bold text-gray-900">{topic}</h2>
        </div>
      </div>
      <hr className="border-violet-100 mb-4" />
      <p className="text-xs font-semibold uppercase tracking-wide text-violet-500 mb-2">
        Explanation
      </p>
      <p className="text-gray-700 leading-relaxed text-base">{explanation}</p>
    </div>
  );
}
