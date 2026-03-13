import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function Hero() {
  return (
    <div className="flex flex-col items-center text-center space-y-6 pt-16 pb-8 md:pt-24 md:pb-12 z-10 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/80 shadow-sm text-sm font-medium text-primary mb-2"
      >
        <Sparkles className="w-4 h-4" />
        <span>Powered by Gemini AI</span>
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground max-w-3xl"
      >
        Understand any topic in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">seconds.</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-lg md:text-xl text-muted-foreground max-w-2xl"
      >
        Stuck on a difficult concept? Just type it below. Our AI breaks down complex study topics into simple, easy-to-digest explanations.
      </motion.p>
    </div>
  );
}
