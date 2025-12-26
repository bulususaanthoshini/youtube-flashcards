"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flashcard } from "./Flashcard";
import { cn } from "@/lib/utils";
import type { Flashcard as FlashcardType } from "@/types";

interface FlashcardListProps {
  cards: FlashcardType[];
  onReset: () => void;
}

export function FlashcardList({ cards, onReset }: FlashcardListProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : cards.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < cards.length - 1 ? prev + 1 : 0));
  };

  const goToCard = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header with count and reset */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📚</span>
          <h2 className="text-xl font-semibold">
            {cards.length} Flashcard{cards.length !== 1 ? "s" : ""} Generated
          </h2>
        </div>
        <button
          onClick={onReset}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium",
            "bg-white/10 hover:bg-white/20",
            "transition-colors duration-200",
            "flex items-center gap-2"
          )}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          New Video
        </button>
      </div>

      {/* Current card display */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Flashcard card={cards[currentIndex]} index={currentIndex} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation controls */}
      <div className="mt-6 flex items-center justify-between">
        {/* Previous button */}
        <button
          onClick={goToPrevious}
          className={cn(
            "p-3 rounded-full",
            "bg-white/10 hover:bg-white/20",
            "transition-colors duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
          aria-label="Previous card"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Progress indicators */}
        <div className="flex items-center gap-2 flex-wrap justify-center max-w-md">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => goToCard(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-200",
                index === currentIndex
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 scale-125"
                  : "bg-white/30 hover:bg-white/50"
              )}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={goToNext}
          className={cn(
            "p-3 rounded-full",
            "bg-white/10 hover:bg-white/20",
            "transition-colors duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
          aria-label="Next card"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Card counter */}
      <div className="mt-4 text-center text-sm text-gray-400">
        Card {currentIndex + 1} of {cards.length}
      </div>

      {/* Keyboard hint */}
      <div className="mt-6 text-center text-xs text-gray-500">
        <span className="inline-flex items-center gap-2">
          <kbd className="px-2 py-1 rounded bg-white/10">←</kbd>
          <kbd className="px-2 py-1 rounded bg-white/10">→</kbd>
          to navigate
        </span>
      </div>
    </div>
  );
}
