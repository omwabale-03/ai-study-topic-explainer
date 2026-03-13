import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hero } from "@/components/Hero";
import { TopicInput } from "@/components/TopicInput";
import { ExplanationCard } from "@/components/ExplanationCard";
import { useExplainTopic } from "@workspace/api-client-react";
import { Loader2 } from "lucide-react";

export function Home() {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  
  const explainMutation = useExplainTopic({
    mutation: {
      onError: (err) => {
        console.error("Failed to fetch explanation:", err);
        setValidationError("Something went wrong. Please try again.");
      }
    }
  });

  const handleTopicSubmit = (topic: string) => {
    if (!topic.trim()) {
      setValidationError("Please enter a topic to continue.");
      return;
    }
    
    setValidationError(null);
    setActiveTopic(topic);
    
    explainMutation.mutate({
      data: { topic: topic.trim() }
    });
  };

  const handleReset = () => {
    setActiveTopic(null);
    setValidationError(null);
    explainMutation.reset();
  };

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden flex flex-col font-sans">
      {/* Abstract Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none select-none">
        <img 
          src={`${import.meta.env.BASE_URL}images/bg-mesh.png`} 
          alt="" 
          className="w-full h-full object-cover opacity-60" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center">
        
        {/* Animated container for Header + Input that moves up when active */}
        <motion.div
          animate={{
            y: explainMutation.isSuccess ? -40 : 0,
            scale: explainMutation.isSuccess ? 0.95 : 1,
            opacity: explainMutation.isSuccess ? 0.8 : 1
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <Hero />
          
          <div className="mt-8">
            <TopicInput 
              onSubmit={handleTopicSubmit}
              isPending={explainMutation.isPending}
              error={validationError}
            />
          </div>
        </motion.div>

        {/* Loading State */}
        <AnimatePresence mode="wait">
          {explainMutation.isPending && activeTopic && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-16 flex flex-col items-center justify-center space-y-4 z-10"
            >
              <div className="w-16 h-16 bg-white rounded-2xl shadow-lg border border-border flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
              <p className="text-lg font-medium text-foreground animate-pulse">
                Generating explanation for <span className="font-bold">"{activeTopic}"</span>...
              </p>
              <p className="text-sm text-muted-foreground">Our AI is breaking it down to basics.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result Card */}
        <AnimatePresence mode="wait">
          {explainMutation.isSuccess && explainMutation.data && activeTopic && (
            <ExplanationCard
              key="explanation-card"
              topic={activeTopic}
              explanation={explainMutation.data.explanation}
              onReset={handleReset}
            />
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}
