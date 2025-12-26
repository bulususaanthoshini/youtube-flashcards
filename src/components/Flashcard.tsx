"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Flashcard as FlashcardType } from "@/types";

interface FlashcardProps {
  card: FlashcardType;
  index: number;
}

export function Flashcard({ card, index }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="perspective w-full h-72 cursor-pointer"
      onClick={handleFlip}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card - Question */}
        <div
          className={cn(
            "absolute inset-0 backface-hidden rounded-2xl p-6",
            "flex flex-col justify-between",
            "bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800",
            "shadow-2xl shadow-purple-900/30"
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Card number badge */}
          <div className="flex justify-between items-start">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/20 text-sm font-bold">
              {index + 1}
            </span>
            <span className="text-xs uppercase tracking-wider text-white/60">
              Question
            </span>
          </div>

          {/* Question text */}
          <div className="flex-1 flex items-center justify-center py-4">
            <p className="text-xl md:text-2xl font-medium text-center leading-relaxed">
              {card.question}
            </p>
          </div>

          {/* Flip hint */}
          <div className="flex items-center justify-center gap-2 text-white/50 text-sm">
            <FlipIcon />
            <span>Click to reveal answer</span>
          </div>
        </div>

        {/* Back of card - Answer */}
        <div
          className={cn(
            "absolute inset-0 backface-hidden rounded-2xl p-6",
            "flex flex-col justify-between",
            "bg-gradient-to-br from-pink-500 via-rose-600 to-red-700",
            "shadow-2xl shadow-rose-900/30",
            "rotate-y-180"
          )}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {/* Card number badge */}
          <div className="flex justify-between items-start">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/20 text-sm font-bold">
              {index + 1}
            </span>
            <span className="text-xs uppercase tracking-wider text-white/60">
              Answer
            </span>
          </div>

          {/* Answer text */}
          <div className="flex-1 flex items-center justify-center py-4 overflow-y-auto">
            <p className="text-lg md:text-xl text-center leading-relaxed">
              {card.answer}
            </p>
          </div>

          {/* Flip hint */}
          <div className="flex items-center justify-center gap-2 text-white/50 text-sm">
            <FlipIcon />
            <span>Click to see question</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function FlipIcon() {
  return (
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
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  );
}
