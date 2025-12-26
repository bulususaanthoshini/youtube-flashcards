"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InputForm } from "@/components/InputForm";
import { FlashcardList } from "@/components/FlashcardList";
import type { Flashcard, GenerationResponse } from "@/types";

export default function Home() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingSteps = [
    { emoji: "🎬", text: "Watching the video..." },
    { emoji: "📝", text: "Taking smart notes..." },
    { emoji: "✨", text: "Extracting key concepts..." },
    { emoji: "🎴", text: "Creating your cards..." },
    { emoji: "🚀", text: "Almost ready!" }
  ];

  useEffect(() => {
    if (isLoading) {
      setLoadingStep(0);
      const interval = setInterval(() => {
        setLoadingStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const handleGenerate = useCallback(async (url: string) => {
    setIsLoading(true);
    setError(null);
    setCards([]);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data: GenerationResponse = await response.json();

      if (!response.ok || data.error) {
        setError(data.error || "Failed to generate flashcards");
        return;
      }

      if (data.cards.length === 0) {
        setError("No flashcards were generated from this video");
        return;
      }

      setCards(data.cards);
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setCards([]);
    setError(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Floating color blobs */}
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 blob-1 opacity-[0.08]"
          style={{ background: "var(--pop-vermillion)" }}
          animate={{ rotate: [0, 10, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 -left-32 w-80 h-80 blob-2 opacity-[0.06]"
          style={{ background: "var(--pop-teal)" }}
          animate={{ rotate: [0, -10, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-64 h-64 blob-3 opacity-[0.05]"
          style={{ background: "var(--pop-amber)" }}
          animate={{ rotate: [0, 15, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
        
        {/* Decorative doodles */}
        <svg className="absolute top-20 right-20 w-8 h-8 text-[var(--pop-vermillion)] opacity-20" viewBox="0 0 32 32">
          <path d="M16 4l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z" fill="currentColor"/>
        </svg>
        <svg className="absolute bottom-32 left-20 w-6 h-6 text-[var(--pop-teal)] opacity-20" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="12" fill="none" stroke="currentColor" strokeWidth="3"/>
        </svg>
      </div>

      {/* Header */}
      <header className="relative z-10 py-8 px-4">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center gap-4">
            {/* Logo Mark */}
            <motion.div
              className="relative"
              whileHover={{ rotate: [-2, 2, -2, 0] }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg"
                   style={{ background: "var(--pop-vermillion)" }}>
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="5" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M10 9l5 3-5 3V9z" fill="currentColor"/>
                </svg>
              </div>
              {/* Accent dot */}
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full"
                   style={{ background: "var(--pop-amber)" }}/>
            </motion.div>

            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight" style={{ color: "var(--ink-black)" }}>
                Flashcard
                <span className="relative ml-2">
                  <span className="marker-highlight">Lab</span>
                </span>
              </h1>
              <p className="text-sm tracking-wide" style={{ color: "var(--ink-gray)" }}>
                Turn any YouTube video into study cards
              </p>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 py-8 relative z-10">
        <AnimatePresence mode="wait">
          {cards.length === 0 ? (
            <motion.div
              key="input-view"
              className="w-full max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Hero Section */}
              <div className="text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight"
                      style={{ color: "var(--ink-black)" }}>
                    Learn from
                    <br />
                    <span className="relative inline-block">
                      <span style={{ color: "var(--pop-vermillion)" }}>YouTube</span>
                      {/* Hand-drawn underline */}
                      <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" preserveAspectRatio="none">
                        <path 
                          d="M2,8 Q50,2 100,8 T198,6" 
                          fill="none" 
                          stroke="var(--pop-vermillion)" 
                          strokeWidth="4"
                          strokeLinecap="round"
                          opacity="0.3"
                        />
                      </svg>
                    </span>
                  </h2>
                </motion.div>

                <motion.p
                  className="text-xl md:text-2xl mt-6 max-w-lg mx-auto leading-relaxed"
                  style={{ color: "var(--ink-gray)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Paste a video link. Get{" "}
                  <span className="font-semibold" style={{ color: "var(--ink-black)" }}>
                    instant flashcards
                  </span>{" "}
                  powered by AI.
                </motion.p>

                {/* Feature Pills */}
                <motion.div
                  className="flex flex-wrap items-center justify-center gap-3 mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="pill">
                    <span className="w-2 h-2 rounded-full" style={{ background: "var(--pop-teal)" }}/>
                    Free to use
                  </div>
                  <div className="pill">
                    <span className="w-2 h-2 rounded-full" style={{ background: "var(--pop-vermillion)" }}/>
                    No account needed
                  </div>
                  <div className="pill">
                    <span className="w-2 h-2 rounded-full" style={{ background: "var(--pop-amber)" }}/>
                    Ready in 30 seconds
                  </div>
                </motion.div>
              </div>

              {/* Input Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <InputForm onSubmit={handleGenerate} isLoading={isLoading} />
              </motion.div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-6"
                  >
                    <div className="card-paper card-vermillion p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 pt-2">
                        <span className="text-2xl">😅</span>
                        <p className="font-medium" style={{ color: "var(--ink-black)" }}>{error}</p>
                      </div>
                      <button
                        onClick={() => setError(null)}
                        className="p-2 rounded-lg hover:bg-black/5 transition-colors"
                        style={{ color: "var(--ink-gray)" }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Loading State */}
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-12"
                  >
                    <LoadingState step={loadingSteps[loadingStep]} stepIndex={loadingStep} totalSteps={loadingSteps.length} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Feature Cards */}
              {!isLoading && (
                <motion.div
                  className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <FeatureCard
                    icon="🎯"
                    title="Smart AI"
                    description="Extracts the most important concepts automatically"
                    color="vermillion"
                  />
                  <FeatureCard
                    icon="🔄"
                    title="Flip Cards"
                    description="Interactive Q&A format for active recall"
                    color="teal"
                  />
                  <FeatureCard
                    icon="⚡"
                    title="Instant"
                    description="From video to flashcards in under a minute"
                    color="amber"
                  />
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="cards-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <FlashcardList cards={cards} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm" style={{ color: "var(--ink-light)" }}>
            <span className="inline-flex items-center gap-1">
              Made with
              <motion.span
                className="inline-block"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ❤️
              </motion.span>
              for learners everywhere
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, color }: { icon: string; title: string; description: string; color: string }) {
  return (
    <motion.div
      className={`card-paper card-${color} p-5 pt-8`}
      whileHover={{ y: -4, boxShadow: "var(--shadow-lifted)" }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-bold text-lg mb-1" style={{ color: "var(--ink-black)" }}>{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: "var(--ink-gray)" }}>{description}</p>
    </motion.div>
  );
}

function LoadingState({ step, stepIndex, totalSteps }: { step: { emoji: string; text: string }; stepIndex: number; totalSteps: number }) {
  return (
    <div className="text-center">
      {/* Animated Cards Stack */}
      <div className="relative w-28 h-36 mx-auto mb-8">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-xl shadow-lg"
            style={{
              background: i === 0 ? "var(--pop-vermillion)" : i === 1 ? "var(--pop-teal)" : "var(--pop-amber)",
              zIndex: 3 - i,
            }}
            animate={{
              rotate: [i * -6, i * -6 + 3, i * -6],
              y: [0, -4, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Sparkle */}
        <motion.span
          className="absolute -top-4 -right-4 text-2xl"
          animate={{ rotate: [0, 15, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ✨
        </motion.span>
      </div>

      {/* Loading Text */}
      <motion.div
        key={step.text}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center gap-3 mb-4"
      >
        <span className="text-2xl">{step.emoji}</span>
        <p className="text-xl font-semibold" style={{ color: "var(--ink-black)" }}>{step.text}</p>
      </motion.div>

      {/* Progress Bar */}
      <div className="w-64 h-2 rounded-full mx-auto overflow-hidden" style={{ background: "var(--bg-warm)" }}>
        <motion.div
          className="h-full shimmer-bar rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${((stepIndex + 1) / totalSteps) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      <p className="text-sm mt-4" style={{ color: "var(--ink-light)" }}>
        This usually takes 30-60 seconds
      </p>
    </div>
  );
}
