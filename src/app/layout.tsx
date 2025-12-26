import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Flashcard Lab | Transform YouTube into Study Cards",
  description: "Turn any YouTube video into interactive flashcards instantly. AI-powered learning tool that extracts key concepts and creates study cards in seconds. Free, no signup required.",
  keywords: ["YouTube", "flashcards", "study", "AI", "learning", "education", "active recall", "spaced repetition"],
  authors: [{ name: "Flashcard Lab" }],
  openGraph: {
    title: "Flashcard Lab | Transform YouTube into Study Cards",
    description: "Turn any YouTube video into interactive flashcards instantly using AI",
    type: "website",
    siteName: "Flashcard Lab",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flashcard Lab | Transform YouTube into Study Cards",
    description: "Turn any YouTube video into interactive flashcards instantly using AI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
