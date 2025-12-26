# 🎴 Flashcard Lab

Transform any YouTube video into interactive study flashcards instantly using AI.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-brightgreen?style=for-the-badge)](https://youtube-flashcards-alpha.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green)

## 🌐 Live Demo

**👉 [https://youtube-flashcards-alpha.vercel.app](https://youtube-flashcards-alpha.vercel.app)**

## ✨ Features

- 🎬 **YouTube Integration** - Paste any public YouTube video URL
- 🤖 **AI-Powered** - Automatically extracts key concepts and generates Q&A cards
- 🔄 **Interactive Cards** - Beautiful 3D flip animations for active recall
- ⚡ **Instant Results** - Cards ready in under 60 seconds
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- ⌨️ **Keyboard Navigation** - Use arrow keys to browse cards
- 🎨 **Unique Design** - Warm, stationery-inspired aesthetic (not another dark AI app!)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google AI API Key ([Get one free](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/priyanshuchawda/youtube-flashcards.git
   cd youtube-flashcards
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
youtube-flashcards/
├── src/
│   ├── app/
│   │   ├── api/generate/    # API route for flashcard generation
│   │   ├── globals.css      # Global styles & CSS variables
│   │   ├── layout.tsx       # Root layout with metadata
│   │   └── page.tsx         # Main page component
│   ├── components/
│   │   ├── Flashcard.tsx    # Individual flashcard with flip animation
│   │   ├── FlashcardList.tsx # Card carousel with navigation
│   │   └── InputForm.tsx    # YouTube URL input form
│   ├── lib/
│   │   ├── gemini.ts        # AI client configuration
│   │   └── utils.ts         # Utility functions
│   └── types/
│       └── index.ts         # TypeScript type definitions
├── .env.example             # Environment variables template
├── package.json
└── README.md
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **AI**: [Google AI SDK](https://ai.google.dev/)

## 📝 Environment Variables

Create a `.env.local` file based on `.env.example`:

```env
# ===========================================
# Flashcard Lab - Environment Variables
# ===========================================

# Google AI API Key (Required)
# Get your free API key from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_api_key_here
```

## 🎨 Design Philosophy

This app intentionally avoids the generic "dark mode + neon gradients" look that most AI apps use. Instead, it features:

- **Warm paper background** - Feels like a real study desk
- **Bold accent colors** - Vermillion, Teal, Amber, Violet
- **Tactile interactions** - Cards feel like physical index cards
- **Dot grid pattern** - Subtle graph paper texture
- **Playful animations** - Spring physics, smooth transitions

## 📜 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🚢 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/priyanshuchawda/youtube-flashcards)

**Live Deployment**: [https://youtube-flashcards-alpha.vercel.app](https://youtube-flashcards-alpha.vercel.app)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add your `GEMINI_API_KEY` in the Environment Variables section
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- [Netlify](https://www.netlify.com/)
- [Railway](https://railway.app/)
- [AWS Amplify](https://aws.amazon.com/amplify/)
- [Docker](https://www.docker.com/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- AI powered by [Google AI](https://ai.google.dev/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

<p align="center">
  Made with ❤️ for learners everywhere
</p>

