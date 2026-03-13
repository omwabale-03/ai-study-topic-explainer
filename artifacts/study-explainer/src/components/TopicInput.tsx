import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Loader2 } from "lucide-react";

interface TopicInputProps {
  onSubmit: (topic: string) => void;
  isPending: boolean;
  error?: string | null;
}

const EXAMPLE_TOPICS = [
  "Newton's Laws",
  "Photosynthesis",
  "Binary Search",
  "World War II",
  "Quantum Computing"
];

export function TopicInput({ onSubmit, isPending, error }: TopicInputProps) {
  const [topic, setTopic] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (topic.trim() && !isPending) {
      onSubmit(topic.trim());
      inputRef.current?.blur();
    }
  };

  const handleChipClick = (exampleTopic: string) => {
    setTopic(exampleTopic);
    onSubmit(exampleTopic);
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-6 z-10 relative">
      <motion.form 
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="w-full relative group"
      >
        <div 
          className={`
            relative flex items-center w-full bg-white rounded-2xl overflow-hidden transition-all duration-300
            ${isFocused ? 'shadow-xl shadow-primary/10 ring-4 ring-primary/20 border-primary' : 'shadow-lg shadow-black/5 border-border'}
            border-2
          `}
        >
          <div className="pl-6 text-muted-foreground flex-shrink-0">
            {isPending ? (
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            ) : (
              <Search className={`w-6 h-6 transition-colors duration-300 ${isFocused ? 'text-primary' : ''}`} />
            )}
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="What do you want to learn about?"
            disabled={isPending}
            className="w-full py-5 px-4 text-lg bg-transparent text-foreground placeholder:text-muted-foreground/70 focus:outline-none disabled:opacity-50"
          />

          <div className="pr-3 flex-shrink-0">
            <button
              type="submit"
              disabled={!topic.trim() || isPending}
              className={`
                p-3 rounded-xl flex items-center justify-center transition-all duration-300
                ${topic.trim() && !isPending 
                  ? 'bg-primary text-white shadow-md hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer' 
                  : 'bg-muted text-muted-foreground cursor-not-allowed'}
              `}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -bottom-8 left-0 text-sm font-medium text-destructive px-2"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-wrap items-center justify-center gap-2 mt-2"
      >
        <span className="text-sm text-muted-foreground mr-2 font-medium">Try:</span>
        {EXAMPLE_TOPICS.map((example, idx) => (
          <button
            key={example}
            type="button"
            onClick={() => handleChipClick(example)}
            disabled={isPending}
            className="px-4 py-2 text-sm font-medium rounded-full bg-white border border-border text-foreground shadow-sm hover:border-primary/50 hover:bg-accent hover:text-accent-foreground hover:shadow transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {example}
          </button>
        ))}
      </motion.div>
    </div>
  );
}
