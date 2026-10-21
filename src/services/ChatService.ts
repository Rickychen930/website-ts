/**
 * Chat Service — talks to the portfolio assistant ("Kobi") at /api/chat
 */

export interface ChatResponse {
  success: boolean;
  reply: string;
  suggested_chips: string[];
  escalate: boolean;
  session_id?: string;
  source?: "faq" | "ai" | "guard" | "fallback";
}

export const CHAT_MAX_LENGTH = 1000;

/** Never leave the typing indicator spinning: give up and say so */
const REQUEST_TIMEOUT_MS = 15_000;

const OFFLINE_REPLY: ChatResponse = {
  success: false,
  reply:
    "I can't reach my field notes right now — give it a moment and try again. You can still browse /projects or reach Ricky via /#contact.",
  suggested_chips: ["Show me recent projects", "How do I contact him?"],
  escalate: false,
};

export class ChatService {
  private readonly apiUrl: string;

  constructor() {
    this.apiUrl = process.env.REACT_APP_API_URL || "http://localhost:4000";
  }

  public async send(
    message: string,
    sessionId?: string,
  ): Promise<ChatResponse> {
    const controller = new AbortController();
    const timer = window.setTimeout(
      () => controller.abort(),
      REQUEST_TIMEOUT_MS,
    );
    try {
      const res = await fetch(`${this.apiUrl}/api/chat/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, session_id: sessionId }),
        signal: controller.signal,
      });
      const data = (await res.json().catch(() => null)) as
        | (Partial<ChatResponse> & { error?: string })
        | null;
      if (!res.ok || !data?.reply) {
        return data?.error
          ? { ...OFFLINE_REPLY, reply: data.error }
          : OFFLINE_REPLY;
      }
      return {
        success: true,
        reply: data.reply,
        suggested_chips: Array.isArray(data.suggested_chips)
          ? data.suggested_chips.slice(0, 4)
          : [],
        escalate: data.escalate === true,
        session_id: data.session_id,
        source: data.source,
      };
    } catch {
      return OFFLINE_REPLY;
    } finally {
      window.clearTimeout(timer);
    }
  }
}

export const chatService = new ChatService();
