/** sessionStorage helpers — every access guarded (private mode, blocked storage) */

export interface StoredMessage {
  id: string;
  role: "bot" | "user";
  text: string;
}

export interface StoredChat {
  messages: StoredMessage[];
  chips: string[];
}

const SESSION_KEY = "kobi_session";
const STATE_KEY = "kobi_state";
const GREETED_KEY = "kobi_greeted";
const MAX_STORED = 60;

const read = (key: string): string | null => {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
};

const write = (key: string, value: string) => {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    // storage unavailable — chat still works in memory
  }
};

export const loadSessionId = () => read(SESSION_KEY) ?? undefined;
export const storeSessionId = (id: string) => write(SESSION_KEY, id);

export const loadChat = (): StoredChat | null => {
  const raw = read(STATE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as StoredChat;
    return Array.isArray(parsed.messages) ? parsed : null;
  } catch {
    return null;
  }
};

export const storeChat = (chat: StoredChat) =>
  write(
    STATE_KEY,
    JSON.stringify({ ...chat, messages: chat.messages.slice(-MAX_STORED) }),
  );

export const wasGreeted = () => read(GREETED_KEY) === "1";
export const markGreeted = () => write(GREETED_KEY, "1");
