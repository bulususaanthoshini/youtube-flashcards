"use client";

import { useState, useCallback, useEffect } from "react";
import { InputForm } from "@/components/InputForm";
import { FlashcardList } from "@/components/FlashcardList";
import type { Flashcard, GenerationResponse } from "@/types";
import { cn } from "@/lib/utils";

export default function Home() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (url: string) => {
    setIsLoading(true);
    setError(null);
    setCards([]);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data: GenerationResponse = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to generate flashcards");
        return;
      }

      if (data.error) {
        setError(data.error);
        return;
      }

      if (data.cards.length === 0) {
        setError("No flashcards were generated from this video");
        return;
      }

      setCards(data.cards);
    } catch (err) {
      console.error("Error generating flashcards:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setCards([]);
    setError(null);
  }, []);

  // Keyboard navigation for flashcards
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle keyboard navigation when flashcards are shown
      if (cards.length === 0) return;
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cards.length]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-6 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-3">
          <span className="text-3xl">🎬</span>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            YouTube Flashcards
          </h1>
          <span className="text-3xl">📝</span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {cards.length === 0 ? (
          /* Input section */
          <div className="w-full max-w-2xl">
            {/* Hero text */}
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Turn Videos Into
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Study Flashcards
                </span>
              </h2>
              <p className="text-lg text-gray-400 max-w-xl mx-auto">
                Paste a YouTube URL and let AI generate interactive flashcards to help you learn and remember key concepts.
              </p>
            </div>

            {/* Input form */}
            <InputForm onSubmit={handleGenerate} isLoading={isLoading} />

            {/* Error message */}
            {error && (
              <div className="mt-6">
                <ErrorMessage message={error} onDismiss={() => setError(null)} />
              </div>
            )}

            {/* Loading skeleton */}
            {isLoading && (
              <div className="mt-10">
                <LoadingSkeleton />
              </div>
            )}
          </div>
        ) : (
          /* Flashcard display section */
          <FlashcardList cards={cards} onReset={handleReset} />
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 text-center text-sm text-gray-500">
        <p>
          Powered by{" "}
          <span className="text-purple-400">Google Gemini AI</span>
        </p>
      </footer>
    </div>
  );
}

function ErrorMessage({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 p-4 rounded-xl",
        "bg-red-500/10 border border-red-500/20"
      )}
    >
      <div className="flex items-center gap-3">
        <svg
          className="w-5 h-5 text-red-400 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-red-300">{message}</p>
      </div>
      <button
        onClick={onDismiss}
        className="text-red-400 hover:text-red-300 transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="w-full max-w-2xl mx-auto animate-pulse">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-3 text-gray-400">
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Analyzing video and generating flashcards...</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">This may take up to 60 seconds for longer videos</p>
      </div>
      
      {/* Skeleton card */}
      <div className="bg-gradient-to-br from-purple-600/20 via-purple-700/20 to-indigo-800/20 rounded-2xl p-6 h-72">
        <div className="flex justify-between items-start mb-4">
          <div className="w-8 h-8 rounded-full bg-white/10" />
          <div className="w-16 h-4 rounded bg-white/10" />
        </div>
        <div className="space-y-3 mt-8">
          <div className="h-6 bg-white/10 rounded w-3/4 mx-auto" />
          <div className="h-6 bg-white/10 rounded w-2/3 mx-auto" />
          <div className="h-6 bg-white/10 rounded w-1/2 mx-auto" />
        </div>
      </div>
    </div>
  );
}
