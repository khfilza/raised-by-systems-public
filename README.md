# Raised by Systems

Raised by Systems is an interactive personality quiz about how everyday systems such as movement, money, rules, social networks, and emotional environments shape the instincts people carry through life.

**Live demo:** `https://raised-by-systems.vercel.app/`

## How it works

The experience introduces six personality architectures, guides visitors through a 16-question quiz, and returns a primary archetype with supporting traits and a system metaphor.

Quiz results are calculated locally in the browser using predefined scoring and tie-breaking logic. The current application does not call Gemini or use generative AI to produce results.

## Features

- Six distinct personality archetypes
- Animated, mobile-friendly quiz experience
- Deterministic, browser-based result calculation
- Personalized result descriptions and supporting traits
- Shareable results using the browser's native sharing or clipboard features
- Downloadable result cards generated in the browser

## Technology stack

- React 19 and TypeScript
- Vite
- Framer Motion
- Tailwind CSS
- html2canvas
- Vercel Analytics

## Run locally

### Prerequisites

- Node.js
- npm

### Setup

```bash
npm install
npm run dev
```

Open the local URL shown by Vite in your terminal.

## Privacy

Quiz answers and results are held in browser memory while the application is in use. The application includes Vercel Analytics for page-view analytics, so page-view data may be transmitted to Vercel. Sharing a result invokes browser sharing or clipboard functionality only when the visitor chooses to use it.
