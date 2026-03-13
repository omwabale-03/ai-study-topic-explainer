# AI Study Topic Explainer

A full-stack web application that helps students understand any study topic with AI-generated explanations powered by Gemini AI.

## Features

- Enter any study topic and get a clear, simple explanation
- Example topic chips for quick exploration (Newton's Laws, Photosynthesis, Binary Search, World War II)
- Loading state while AI generates the explanation
- Error handling for empty input and API failures
- Beautiful, responsive UI with smooth animations

## Tech Stack

- **Frontend**: React, Vite, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, TypeScript
- **AI**: Google Gemini AI (gemini-2.5-flash)
- **Monorepo**: pnpm workspaces

## How Gemini AI Is Used

When a user submits a topic, the app sends a POST request to `/api/explain`. The backend calls Gemini AI with the prompt:

> "Explain the topic '<topic>' in simple terms for a school student in about 5 sentences."

Gemini generates a concise, student-friendly explanation which is returned to the frontend and displayed in the explanation card.

## Setup Instructions

### Prerequisites

- Node.js 18+
- pnpm

### Install Dependencies

```bash
pnpm install
```

### Environment Variables

The app uses Replit AI Integrations for Gemini access. If running locally, set:

```
AI_INTEGRATIONS_GEMINI_BASE_URL=<your-gemini-proxy-url>
AI_INTEGRATIONS_GEMINI_API_KEY=<your-api-key>
```

Or use your own Gemini API key by modifying `lib/integrations-gemini-ai/src/client.ts`.

## How to Run Locally

Start the API server:

```bash
pnpm --filter @workspace/api-server run dev
```

Start the frontend:

```bash
pnpm --filter @workspace/study-explainer run dev
```

## API

### POST /api/explain

**Request:**
```json
{ "topic": "Photosynthesis" }
```

**Response:**
```json
{ "explanation": "Photosynthesis is the process by which plants make their own food..." }
```

## Deployment

This app is deployable on Replit. Use the Deploy button in the Replit UI to publish to production.

For Vercel deployment:
1. Set the `AI_INTEGRATIONS_GEMINI_BASE_URL` and `AI_INTEGRATIONS_GEMINI_API_KEY` environment variables in your Vercel project settings
2. Configure the build command: `pnpm build`
3. Set the output directory for the frontend: `artifacts/study-explainer/dist`
