import { NextRequest, NextResponse } from "next/server";
import { getGeminiClient, DEFAULT_MODEL } from "@/lib/gemini";
import { isValidYouTubeUrl } from "@/lib/utils";
import type { GenerationResponse, Flashcard } from "@/types";

/**
 * System prompt for flashcard generation
 * Instructs the model to analyze the video and create study flashcards
 */
const SYSTEM_PROMPT = `You are an expert educator who creates effective study flashcards from educational content.

Your task is to analyze the provided YouTube video and generate a set of study flashcards that capture the key concepts, facts, and ideas presented.

Guidelines for creating flashcards:
1. Create 5-15 flashcards depending on content density
2. Each flashcard should focus on ONE concept or fact
3. Questions should be clear and specific
4. Answers should be concise but complete
5. Cover the main topics and key takeaways
6. Include both factual recall and conceptual understanding questions
7. Avoid trivial or overly complex questions

You MUST respond with valid JSON in this exact format:
{
  "cards": [
    {
      "question": "What is the main concept discussed?",
      "answer": "The answer explaining the concept."
    }
  ]
}`;

/**
 * POST /api/generate
 * Generate flashcards from a YouTube video URL using Gemini AI
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { url } = body;

    // Validate URL
    if (!url || typeof url !== "string") {
      return NextResponse.json<GenerationResponse>(
        { cards: [], error: "URL is required" },
        { status: 400 }
      );
    }

    if (!isValidYouTubeUrl(url)) {
      return NextResponse.json<GenerationResponse>(
        { cards: [], error: "Invalid YouTube URL. Please provide a valid YouTube video link." },
        { status: 400 }
      );
    }

    // Get Gemini client
    const ai = getGeminiClient();

    // Build the request with YouTube URL using Gemini's native support
    const contents = [
      {
        fileData: {
          fileUri: url,
        },
      },
      {
        text: "Analyze this video and create study flashcards based on its content. Focus on the key concepts, important facts, and main takeaways. Return the flashcards in JSON format.",
      },
    ];

    // Generate content with structured output
    const response = await ai.models.generateContent({
      model: DEFAULT_MODEL,
      contents: contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
      },
    });

    // Extract text response
    const responseText = response.text;

    if (!responseText) {
      return NextResponse.json<GenerationResponse>(
        { cards: [], error: "No response from AI model" },
        { status: 500 }
      );
    }

    // Parse the JSON response
    let parsedResponse: { cards: Flashcard[] };
    try {
      parsedResponse = JSON.parse(responseText);
    } catch {
      console.error("Failed to parse AI response:", responseText);
      return NextResponse.json<GenerationResponse>(
        { cards: [], error: "Failed to parse AI response" },
        { status: 500 }
      );
    }

    // Validate the response structure
    if (!parsedResponse.cards || !Array.isArray(parsedResponse.cards)) {
      return NextResponse.json<GenerationResponse>(
        { cards: [], error: "Invalid response structure from AI" },
        { status: 500 }
      );
    }

    // Validate each flashcard
    const validCards = parsedResponse.cards.filter(
      (card): card is Flashcard =>
        typeof card === "object" &&
        typeof card.question === "string" &&
        typeof card.answer === "string" &&
        card.question.trim().length > 0 &&
        card.answer.trim().length > 0
    );

    if (validCards.length === 0) {
      return NextResponse.json<GenerationResponse>(
        { cards: [], error: "No valid flashcards generated" },
        { status: 500 }
      );
    }

    return NextResponse.json<GenerationResponse>({ cards: validCards });
  } catch (error) {
    console.error("Error generating flashcards:", error);

    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        return NextResponse.json<GenerationResponse>(
          { cards: [], error: "API key configuration error" },
          { status: 500 }
        );
      }
      if (error.message.includes("rate limit") || error.message.includes("quota")) {
        return NextResponse.json<GenerationResponse>(
          { cards: [], error: "API rate limit exceeded. Please try again later." },
          { status: 429 }
        );
      }
    }

    return NextResponse.json<GenerationResponse>(
      { cards: [], error: "Failed to generate flashcards. Please try again." },
      { status: 500 }
    );
  }
}
