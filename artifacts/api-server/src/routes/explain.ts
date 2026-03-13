import { Router, type IRouter } from "express";
import { ExplainTopicBody } from "@workspace/api-zod";
import { ai } from "@workspace/integrations-gemini-ai";

const router: IRouter = Router();

router.post("/explain", async (req, res) => {
  const parseResult = ExplainTopicBody.safeParse(req.body);

  if (!parseResult.success) {
    res.status(400).json({ error: "Please enter a topic to continue." });
    return;
  }

  const { topic } = parseResult.data;

  if (!topic || topic.trim().length === 0) {
    res.status(400).json({ error: "Please enter a topic to continue." });
    return;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Explain the topic "${topic.trim()}" in simple terms for a school student in about 5 sentences.`,
            },
          ],
        },
      ],
      config: { maxOutputTokens: 8192 },
    });

    const explanation = response.text ?? "";

    res.json({ explanation });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

export default router;
