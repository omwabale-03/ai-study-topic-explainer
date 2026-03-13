# AI Study Topic Explainer

## Overview

A Next.js 15 App Router web application where students can enter any study topic and receive a simple AI-generated explanation powered by Gemini AI.

## Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **AI**: Google Gemini AI (`gemini-2.5-flash`) via Replit AI Integrations
- **Package manager**: pnpm

## Structure

```
artifacts/nextjs-study-explainer/
├── app/
│   ├── api/explain/route.ts   ← POST /api/explain — calls Gemini AI
│   ├── layout.tsx
│   ├── page.tsx               ← Main page (client component)
│   └── globals.css
├── components/
│   ├── TopicInput.tsx         ← Input field + example topic chips
│   └── ExplanationCard.tsx    ← Styled explanation result card
├── lib/
│   └── aiClient.ts            ← Gemini AI client (uses env vars)
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
└── tsconfig.json
```

## Environment Variables

- `AI_INTEGRATIONS_GEMINI_BASE_URL` — Gemini proxy base URL (auto-set by Replit)
- `AI_INTEGRATIONS_GEMINI_API_KEY` — Gemini API key (auto-set by Replit)

## Running

```bash
pnpm --filter @workspace/nextjs-study-explainer run dev
```

Or from the workspace root:

```bash
pnpm dev
```

The app runs on port 3000.
