import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YouTube Flashcards | AI-Powered Study Cards Generator",
  description: "Transform YouTube videos into interactive study flashcards using Google Gemini AI. Learn faster and remember more with AI-generated Q&A cards.",
  keywords: ["YouTube", "flashcards", "study", "AI", "Gemini", "learning", "education"],
  authors: [{ name: "YouTube Flashcards" }],
  openGraph: {
    title: "YouTube Flashcards | AI-Powered Study Cards Generator",
    description: "Transform YouTube videos into interactive study flashcards using AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
