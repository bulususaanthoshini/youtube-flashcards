"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Flashcard as FlashcardType } from "@/types";

interface FlashcardProps {
  card: FlashcardType;
  index: number;
  total: number;
}

// Card color themes for variety
const cardThemes = [
  { front: "var(--pop-vermillion)", back: "var(--pop-teal)" },
  { front: "var(--pop-teal)", back: "var(--pop-violet)" },
  { front: "var(--pop-violet)", back: "var(--pop-amber)" },
  { front: "var(--pop-amber)", back: "var(--pop-rose)" },
  { front: "var(--pop-rose)", back: "var(--pop-vermillion)" },
];

export function Flashcard({ card, index, total }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const theme = cardThemes[index % cardThemes.length];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="perspective-1500 w-full h-80 cursor-pointer select-none"
      onClick={handleFlip}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ 
          duration: 0.6, 
          type: "spring", 
          stiffness: 80,
          damping: 15 
        }}
      >
        {/* Front of card - Question */}
        <div
          className="absolute inset-0 backface-hidden rounded-2xl p-6 flex flex-col text-white overflow-hidden"
          style={{ 
            backfaceVisibility: "hidden",
            background: `linear-gradient(135deg, ${theme.front} 0%, color-mix(in srgb, ${theme.front} 85%, black) 100%)`
          }}
        >
          {/* Card Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="counter">{index + 1}</div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider opacity-70 font-medium">
                Question
              </span>
              <QuestionIcon />
            </div>
          </div>

          {/* Question Text */}
          <div className="flex-1 flex items-center justify-center py-4">
            <p className="text-xl md:text-2xl font-semibold text-center leading-relaxed">
              {card.question}
            </p>
          </div>

          {/* Flip Prompt */}
          <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
            <FlipIcon />
            <span>Tap to reveal answer</span>
          </div>

          {/* Decorative Corner */}
          <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
        </div>

        {/* Back of card - Answer */}
        <div
          className="absolute inset-0 backface-hidden rounded-2xl p-6 flex flex-col text-white overflow-hidden rotate-y-180"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `linear-gradient(135deg, ${theme.back} 0%, color-mix(in srgb, ${theme.back} 85%, black) 100%)`
          }}
        >
          {/* Card Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="counter">{index + 1}</div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider opacity-70 font-medium">
                Answer
              </span>
              <CheckIcon />
            </div>
          </div>

          {/* Answer Text */}
          <div className="flex-1 flex items-center justify-center py-4 overflow-y-auto">
            <p className="text-lg md:text-xl text-center leading-relaxed">
              {card.answer}
            </p>
          </div>

          {/* Flip Prompt */}
          <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
            <FlipIcon />
            <span>Tap to see question</span>
          </div>

          {/* Decorative Corner */}
          <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-white/10" />
        </div>
      </motion.div>
    </div>
  );
}

function FlipIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
    </svg>
  );
}

function QuestionIcon() {
  return (
    <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  );
}
