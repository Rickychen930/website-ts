/**
 * AI Controller - Admin-only AI features (cover letter, JD summary, interview questions)
 */

import { Request, Response } from "express";
import { chatCompletion, isAiConfigured } from "../utils/ai";

export class AiController {
  /** Improve cover letter body with AI based on job description */
  public async enhanceCoverLetter(req: Request, res: Response): Promise<void> {
    if (!isAiConfigured()) {
      res.status(503).json({
        error: "AI not configured",
        message: "Set OPENAI_API_KEY in .env to use this feature.",
      });
      return;
    }
    try {
      const { bodyText, jobDescription, companyName, position } =
        req.body || {};
      if (!bodyText || typeof bodyText !== "string") {
        res.status(400).json({
          error: "Validation error",
          message: "bodyText is required",
        });
        return;
      }
      const company = companyName || "the company";
      const role = position || "the role";
      const jd = jobDescription?.trim() || "";

      const systemPrompt = `You are a professional career coach. Improve the following cover letter body to be more professional, concise, and impactful. Keep the same structure (2-3 paragraphs). Do not add greeting or sign-off. Output only the improved body text.${jd ? " Tailor the content to match the job description where relevant." : ""}`;
      const userPrompt = jd
        ? `Company: ${company}. Role: ${role}.\n\nJob description (excerpt):\n${jd.slice(0, 2000)}\n\nCurrent cover letter body:\n${bodyText.slice(0, 3000)}`
        : `Company: ${company}. Role: ${role}.\n\nCurrent cover letter body:\n${bodyText.slice(0, 3000)}`;

      const result = await chatCompletion(
        [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        { maxTokens: 1000 },
      );
      res.json({ improved: result });
    } catch (err) {
      console.error("AI enhanceCoverLetter error:", err);
      res.status(500).json({
        error: "AI request failed",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  /** Summarize job description into key requirements and skills */
  public async summarizeJobDescription(
    req: Request,
    res: Response,
  ): Promise<void> {
    if (!isAiConfigured()) {
      res.status(503).json({
        error: "AI not configured",
        message: "Set OPENAI_API_KEY in .env to use this feature.",
      });
      return;
    }
    try {
      const { jobDescription } = req.body || {};
      if (!jobDescription || typeof jobDescription !== "string") {
        res.status(400).json({
          error: "Validation error",
          message: "jobDescription is required",
        });
        return;
      }
      const text = jobDescription.slice(0, 6000);

      const result = await chatCompletion(
        [
          {
            role: "system",
            content:
              "You are a career advisor. Summarize the job description into: (1) Key requirements (bullet points), (2) Key skills/tech mentioned, (3) Brief tips to highlight in application. Use clear headings and bullet points. Keep it concise (under 200 words). Output plain text only.",
          },
          { role: "user", content: text },
        ],
        { maxTokens: 500 },
      );
      res.json({ summary: result });
    } catch (err) {
      console.error("AI summarizeJobDescription error:", err);
      res.status(500).json({
        error: "AI request failed",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  /** Generate likely interview questions for the role */
  public async generateInterviewQuestions(
    req: Request,
    res: Response,
  ): Promise<void> {
    if (!isAiConfigured()) {
      res.status(503).json({
        error: "AI not configured",
        message: "Set OPENAI_API_KEY in .env to use this feature.",
      });
      return;
    }
    try {
      const { companyName, position, jobDescription } = req.body || {};
      const company = companyName || "the company";
      const role = position || "the role";
      const jd = jobDescription?.trim()?.slice(0, 3000) || "";

      const userPrompt = jd
        ? `Company: ${company}. Role: ${role}.\n\nJob description:\n${jd}\n\nGenerate 8-10 likely interview questions (mix of technical, behavioral, and role-specific). Number them. Output only the list, one question per line.`
        : `Company: ${company}. Role: ${role}.\n\nGenerate 8-10 likely interview questions (mix of technical, behavioral, and role-specific). Number them. Output only the list, one question per line.`;

      const result = await chatCompletion(
        [
          {
            role: "system",
            content:
              "You are an interview coach. Generate realistic interview questions that hiring managers might ask for this role. Be specific to the company and role when possible. Output only the numbered list, no extra text.",
          },
          { role: "user", content: userPrompt },
        ],
        { maxTokens: 800 },
      );
      res.json({ questions: result });
    } catch (err) {
      console.error("AI generateInterviewQuestions error:", err);
      res.status(500).json({
        error: "AI request failed",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  /** Check if AI is configured (for frontend to show/hide AI buttons) */
  public async status(req: Request, res: Response): Promise<void> {
    res.json({ configured: isAiConfigured() });
  }
}
