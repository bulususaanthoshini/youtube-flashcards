"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flashcard } from "./Flashcard";
import type { Flashcard as FlashcardType } from "@/types";

interface FlashcardListProps {
  cards: FlashcardType[];
  onReset: () => void;
}

export function FlashcardList({ cards, onReset }: FlashcardListProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goToPrevious = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : cards.length - 1));
  }, [cards.length]);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev < cards.length - 1 ? prev + 1 : 0));
  }, [cards.length]);

  const goToCard = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrevious, goToNext]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Header */}
      <motion.div 
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3">
          <div className="text-3xl">🎴</div>
          <div>
            <h2 className="text-xl font-bold" style={{ color: "var(--ink-black)" }}>
              Your Flashcards
            </h2>
            <p className="text-sm" style={{ color: "var(--ink-gray)" }}>
              {cards.length} card{cards.length !== 1 ? "s" : ""} generated
            </p>
          </div>
        </div>

        <motion.button
          onClick={onReset}
          className="btn-secondary flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <PlusIcon />
          <span>New Video</span>
        </motion.button>
      </motion.div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium" style={{ color: "var(--ink-gray)" }}>Progress</span>
          <span className="text-sm font-bold" style={{ color: "var(--ink-black)" }}>
            {currentIndex + 1} / {cards.length}
          </span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--bg-warm)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: "var(--pop-vermillion)" }}
            initial={false}
            animate={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Card Display */}
      <div className="relative h-80 mb-8">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0"
          >
            <Flashcard 
              card={cards[currentIndex]} 
              index={currentIndex} 
              total={cards.length}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        {/* Previous Button */}
        <motion.button
          onClick={goToPrevious}
          className="p-4 rounded-xl transition-colors"
          style={{ background: "var(--bg-warm)" }}
          whileHover={{ scale: 1.05, background: "var(--ink-black)" }}
          whileTap={{ scale: 0.95 }}
          aria-label="Previous card"
        >
          <svg className="w-6 h-6" style={{ color: "var(--ink-black)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
          </svg>
        </motion.button>

        {/* Dot Indicators */}
        <div className="flex items-center gap-2 flex-wrap justify-center max-w-sm">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => goToCard(index)}
              className={`nav-dot ${index === currentIndex ? "active" : ""}`}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <motion.button
          onClick={goToNext}
          className="p-4 rounded-xl"
          style={{ background: "var(--pop-vermillion)" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Next card"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
          </svg>
        </motion.button>
      </div>

      {/* Keyboard Hint */}
      <motion.div 
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="inline-flex items-center gap-3 text-sm" style={{ color: "var(--ink-light)" }}>
          <span className="kbd">←</span>
          <span className="kbd">→</span>
          <span>to navigate</span>
          <span className="mx-2">•</span>
          <span>click card to flip</span>
        </span>
      </motion.div>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
    </svg>
  );
}
