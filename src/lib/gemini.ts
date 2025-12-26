import { GoogleGenAI } from "@google/genai";

/**
 * Singleton Gemini client wrapper
 * Uses the GEMINI_API_KEY environment variable
 */

let geminiClient: GoogleGenAI | null = null;

/**
 * Get or create the Gemini AI client instance
 */
export function getGeminiClient(): GoogleGenAI {
  if (!geminiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not set");
    }
    
    geminiClient = new GoogleGenAI({ apiKey });
  }
  
  return geminiClient;
}

/**
 * Default model for flashcard generation
 * Using gemini-2.5-flash for optimal performance with video understanding
 */
export const DEFAULT_MODEL = "gemini-2.5-flash";
