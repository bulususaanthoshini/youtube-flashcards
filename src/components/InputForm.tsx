"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";

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
      {/* Main Input Container */}
      <div 
        className={`input-field relative rounded-2xl p-2 transition-all duration-200 ${
          isFocused ? "ring-4 ring-[var(--pop-vermillion)]/10" : ""
        }`}
      >
        <div className="flex items-center gap-3">
          {/* YouTube Icon */}
          <div className="flex-shrink-0 pl-4">
            <motion.div
              animate={isFocused ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <svg className="w-7 h-7 youtube-red" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </motion.div>
          </div>

          {/* Input Field */}
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Paste your YouTube URL here..."
            disabled={isLoading}
            className="flex-1 bg-transparent border-none outline-none text-lg py-4 placeholder:text-[var(--ink-light)] disabled:opacity-50"
            style={{ color: "var(--ink-black)" }}
          />

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={!url.trim() || isLoading}
            className="btn-primary flex items-center gap-2 mr-1"
            whileHover={!isLoading && url.trim() ? { scale: 1.02 } : {}}
            whileTap={!isLoading && url.trim() ? { scale: 0.98 } : {}}
          >
            {isLoading ? (
              <>
                <LoadingSpinner />
                <span>Creating...</span>
              </>
            ) : (
              <>
                <SparkleIcon />
                <span>Generate</span>
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Helper Text */}
      <p className="mt-4 text-center text-sm" style={{ color: "var(--ink-light)" }}>
        Works with any public YouTube video — lectures, tutorials, interviews, and more
      </p>

      {/* Example URLs */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs" style={{ color: "var(--ink-light)" }}>Try:</span>
        {[
          { label: "TED Talk", url: "https://www.youtube.com/watch?v=example1" },
          { label: "Tutorial", url: "https://www.youtube.com/watch?v=example2" },
        ].map((example) => (
          <button
            key={example.label}
            type="button"
            onClick={() => setUrl(example.url)}
            className="text-xs px-3 py-1.5 rounded-full transition-colors hover:bg-[var(--bg-warm)]"
            style={{ 
              color: "var(--pop-vermillion)",
              background: "rgba(232, 69, 60, 0.08)"
            }}
          >
            {example.label}
          </button>
        ))}
      </div>
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
        strokeWidth="3"
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
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
    </svg>
  );
}
