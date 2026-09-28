/**
 * Chatbot guard — cheap checks before anything reaches the model.
 */

const INJECTION = [
  /ignore (all|any|the|previous|prior|above)[^.]{0,30}(instructions|rules|prompt)/i,
  /(system|developer) prompt/i,
  /you are now/i,
  /pretend (to be|you are)/i,
  /jailbreak|\bDAN\b/i,
  /reveal (your|the) (prompt|instructions|rules)/i,
];

const SENSITIVE = [
  /\b(password|passcode|api[\s_-]?key|secret key|private key|credit card|cvv|tfn|tax file number)\b/i,
  /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/, // card-like number
];

/** Words that make a message plausibly about the portfolio / hiring */
const ON_TOPIC =
  /\b(ricky|he|his|him|you|work|project|portfolio|skill|stack|experience|hire|job|role|contact|resume|cv|build|react|node|ai|web|app|site|freelance|studio|salary|rate|price|available|study|uni|sydney|australia)\b/i;

export type GuardReason = "injection" | "sensitive" | "off_topic";

export const GUARD_REPLIES: Record<GuardReason, string> = {
  injection:
    "I'll stick to my brief: questions about Ricky's work, skills and how to reach him.",
  sensitive:
    "Please don't share passwords, keys or card details here — I don't need them, and this chat isn't the place for them.",
  off_topic:
    "I'm only briefed on Ricky's portfolio — his work, skills, experience and availability. Try one of the suggestions below.",
};

export const checkUnsafe = (message: string): GuardReason | null => {
  if (INJECTION.some((re) => re.test(message))) return "injection";
  if (SENSITIVE.some((re) => re.test(message))) return "sensitive";
  return null;
};

export const isOnTopic = (message: string): boolean => ON_TOPIC.test(message);

/** Strip anything that looks like leaked instructions or off-site links */
export const sanitizeAiReply = (
  reply: string,
  allowedHosts: readonly string[],
): string | null => {
  const text = reply.replace(/\s+/g, " ").trim();
  if (!text || /system prompt|<visitor_message>|FACTS:/i.test(text))
    return null;
  return text.replace(/https?:\/\/[^\s)]+/gi, (url) => {
    try {
      const host = new URL(url).hostname.replace(/^www\./, "");
      return allowedHosts.some((h) => host === h || host.endsWith(`.${h}`))
        ? url
        : "";
    } catch {
      return "";
    }
  });
};
