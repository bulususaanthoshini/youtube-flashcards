/**
 * Flashcard entity - represents a single study card
 */
export interface Flashcard {
  /** The question/prompt on the front of the card */
  question: string;
  /** The answer on the back of the card */
  answer: string;
}

/**
 * Request payload for generating flashcards
 */
export interface GenerationRequest {
  /** Valid YouTube URL */
  url: string;
}

/**
 * Response payload from flashcard generation
 */
export interface GenerationResponse {
  /** Array of generated flashcards */
  cards: Flashcard[];
  /** Optional error message if generation failed */
  error?: string;
}
