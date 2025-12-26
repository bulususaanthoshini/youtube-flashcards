"use client";

import { useState, FormEvent } from "react";
import { cn } from "@/lib/utils";

interface InputFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export function InputForm({ onSubmit, isLoading }: InputFormProps) {
  const [url, setUrl] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (url.trim() && !isLoading) {
      onSubmit(url.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        {/* Gradient border effect */}
        <div
          className={cn(
            "absolute -inset-0.5 rounded-xl opacity-75 blur-sm transition-opacity duration-300",
            isFocused
              ? "bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
              : "bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-purple-500/50"
          )}
        />

        {/* Input container */}
        <div className="relative flex items-center gap-3 bg-[#1a1a2e] rounded-xl p-2">
          {/* YouTube icon */}
          <div className="flex-shrink-0 pl-3">
            <svg
              className="w-6 h-6 text-red-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </div>

          {/* Input field */}
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Paste a YouTube URL..."
            disabled={isLoading}
            className={cn(
              "flex-1 bg-transparent border-none outline-none text-white placeholder-gray-400",
              "text-lg py-3",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          />

          {/* Submit button */}
          <button
            type="submit"
            disabled={!url.trim() || isLoading}
            className={cn(
              "flex-shrink-0 px-6 py-3 rounded-lg font-semibold text-white",
              "bg-gradient-to-r from-purple-500 to-pink-500",
              "hover:from-purple-600 hover:to-pink-600",
              "transition-all duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "flex items-center gap-2"
            )}
          >
            {isLoading ? (
              <>
                <LoadingSpinner />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <SparkleIcon />
                <span>Generate</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Helper text */}
      <p className="mt-3 text-center text-sm text-gray-400">
        Paste any public YouTube video URL to generate study flashcards
      </p>
    </form>
  );
}

function LoadingSpinner() {
  return (
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
  );
}

function SparkleIcon() {
  return (
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
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    </svg>
  );
}
