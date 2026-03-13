import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { BookOpen, RefreshCw, Sparkles } from "lucide-react";

interface ExplanationCardProps {
  topic: string;
  explanation: string;
  onReset: () => void;
}

export function ExplanationCard({ topic, explanation, onReset }: ExplanationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
      className="w-full max-w-4xl mx-auto mt-12 bg-white rounded-3xl shadow-xl shadow-primary/5 border border-border overflow-hidden z-10 relative"
    >
      <div className="bg-gradient-to-r from-accent/50 to-white px-8 py-6 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Explaining</h3>
            <h2 className="text-2xl font-bold text-foreground capitalize-first">{topic}</h2>
          </div>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="hidden sm:inline">Ask Another</span>
        </button>
      </div>
      
      <div className="p-8 md:p-10 relative">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Sparkles className="w-32 h-32 text-primary" />
        </div>
        
        <div className="prose prose-slate prose-lg max-w-none prose-headings:font-display prose-headings:text-foreground prose-h3:text-primary prose-a:text-primary prose-strong:text-foreground">
          <ReactMarkdown>
            {explanation}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
}
