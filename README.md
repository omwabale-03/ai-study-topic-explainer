# 📚 AI Study Topic Explainer

AI Study Topic Explainer is a simple web application that helps students understand complex study topics quickly.
Users can enter any topic (for example *Photosynthesis*, *Binary Search*, or *World War II*), and the app generates a **clear, student-friendly explanation using AI**.

The application uses **Next.js, TypeScript, Tailwind CSS, and Google Gemini AI** to provide fast and easy explanations.

---

## 🚀 Live Demo

🔗 Live Application
https://ai-study-topic-explainer-delta.vercel.app/

🔗 GitHub Repository
https://github.com/omwabale-03/ai-study-topic-explainer

---

## ✨ Features

* Enter any study topic
* AI generates a **simple explanation suitable for students**
* Clean and responsive UI using Tailwind CSS
* Loading indicator while AI generates the explanation
* Error handling for empty input or API errors
* Serverless API route using Next.js
* Deployed on Vercel

---

## 🛠 Tech Stack

Framework
Next.js 15 (App Router)

Language
TypeScript

Styling
Tailwind CSS

AI
Google Gemini API (gemini-2.5-flash)

Deployment
Vercel

---

## 📂 Project Structure

```
app/
 ├ api/
 │   └ explain/
 │       └ route.ts        # AI API endpoint
 ├ globals.css             # Tailwind styles
 ├ layout.tsx              # Root layout
 └ page.tsx                # Main UI page

components/
 ├ TopicInput.tsx          # Topic input field + button
 └ ExplanationCard.tsx     # AI explanation display

lib/
 └ aiClient.ts             # Gemini AI client

public/
 └ opengraph.jpg

package.json
tailwind.config.ts
tsconfig.json
next.config.ts
```

---

## ⚙️ Installation

Clone the repository:

```
git clone https://github.com/omwabale-03/ai-study-topic-explainer.git
```

Navigate into the project folder:

```
cd ai-study-topic-explainer
```

Install dependencies:

```
npm install
```

Run the development server:

```
npm run dev
```

Open your browser:

```
http://localhost:3000
```

---

## 🔑 Environment Variables

Create a `.env.local` file in the project root and add:

```
GEMINI_API_KEY=your_api_key_here
```

You can generate a Gemini API key from:

https://aistudio.google.com/app/apikey

---

## 🤖 How AI Is Used

When a student enters a topic and clicks **Explain Topic**:

1. The topic is sent to a Next.js API route (`/api/explain`)
2. The server calls the **Gemini AI model**
3. Gemini generates a simplified explanation
4. The explanation is returned and displayed in the UI

---

## 🚀 Deployment

This project is deployed on **Vercel**.

Steps to deploy:

1. Push the project to GitHub
2. Import the repository into Vercel
3. Add environment variable `GEMINI_API_KEY`
4. Deploy the application

---

## 👨‍💻 Author

Om Wabale
