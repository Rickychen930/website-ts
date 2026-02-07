/**
 * AI utilities - OpenAI-compatible API (no extra dependency, uses fetch)
 * Set OPENAI_API_KEY in .env. Works with OpenAI or compatible endpoints (e.g. Azure OpenAI).
 */

const OPENAI_API_URL =
  process.env.OPENAI_API_URL || "https://api.openai.com/v1";
const DEFAULT_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

export function isAiConfigured(): boolean {
  return !!process.env.OPENAI_API_KEY?.trim();
}

export async function chatCompletion(
  messages: Array<{ role: "system" | "user" | "assistant"; content: string }>,
  options?: { model?: string; maxTokens?: number },
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY is not set. Add it to .env to use AI features.",
    );
  }

  const res = await fetch(`${OPENAI_API_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: options?.model ?? DEFAULT_MODEL,
      messages,
      max_tokens: options?.maxTokens ?? 1500,
    }),
  });

  if (!res.ok) {
    const err = await res
      .json()
      .catch(() => ({ error: { message: res.statusText } }));
    throw new Error(err?.error?.message || `OpenAI API error: ${res.status}`);
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data?.choices?.[0]?.message?.content?.trim();
  if (!content) throw new Error("Empty response from AI");
  return content;
}
