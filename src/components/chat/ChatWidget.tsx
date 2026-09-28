import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "@/lib/motion";
import { chatService, CHAT_MAX_LENGTH } from "@/services/ChatService";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ChatMessageText } from "./ChatMessageText";
import { MascotAvatar } from "./MascotAvatar";
import {
  loadChat,
  loadSessionId,
  markGreeted,
  storeChat,
  storeSessionId,
  wasGreeted,
  type StoredMessage,
} from "./chatStorage";
import styles from "./ChatWidget.module.css";

const GREETING_DELAY_MS = 6000;
const SESSION_RE = /^[A-Za-z0-9_-]{8,64}$/;
const STARTER_CHIPS = [
  "What does Ricky build?",
  "Show me recent projects",
  "Is he open to work?",
  "How do I contact him?",
];
const WELCOME: StoredMessage = {
  id: "welcome",
  role: "bot",
  text: "G'day! I'm Kobi, a quokka from Rottnest Island and Ricky's site guide. Ask me about his work, skills, experience or how to get in touch.",
};

const createId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path
      d="M6 6l12 12M18 6L6 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path
      d="M4 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Floating site assistant — Kobi the quokka (Web Architech "Archie" pattern) */
export const ChatWidget: React.FC = () => {
  const stored = useRef(loadChat());
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<StoredMessage[]>(
    stored.current?.messages?.length ? stored.current.messages : [WELCOME],
  );
  const [chips, setChips] = useState<string[]>(
    stored.current?.chips ?? STARTER_CHIPS,
  );
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [announce, setAnnounce] = useState("");
  const sessionId = useRef<string | undefined>(loadSessionId());

  const phone = useMediaQuery("(max-width: 767px)");
  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Persist the conversation for this tab
  useEffect(() => {
    storeChat({ messages, chips });
  }, [messages, chips]);

  // Greeting teaser once per session
  useEffect(() => {
    if (wasGreeted()) return;
    const t = setTimeout(() => {
      setTeaser(true);
      markGreeted();
    }, GREETING_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  // Keep the newest message in view
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTo({ top: list.scrollHeight, behavior: "smooth" });
  }, [messages, busy, open]);

  // Phone sheet: lock page scroll and follow the visual viewport (keyboard)
  useEffect(() => {
    if (!open || !phone) return;
    const root = document.documentElement;
    const vv = window.visualViewport;
    const sync = () =>
      root.style.setProperty(
        "--kobi-vvh",
        `${vv?.height ?? window.innerHeight}px`,
      );
    sync();
    vv?.addEventListener("resize", sync);
    root.classList.add(styles.scrollLock);
    window.__lenis?.stop();
    return () => {
      vv?.removeEventListener("resize", sync);
      root.classList.remove(styles.scrollLock);
      root.style.removeProperty("--kobi-vvh");
      window.__lenis?.start();
    };
  }, [open, phone]);

  // Focus management + Esc to close
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      if (window.matchMedia("(pointer: coarse)").matches) {
        panelRef.current?.focus();
      } else {
        inputRef.current?.focus();
      }
    }, 120);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    launcherRef.current?.focus();
  }, []);

  const toggle = () => {
    setTeaser(false);
    if (open) close();
    else setOpen(true);
  };

  const pushBot = (text: string) => {
    setMessages((prev) => [...prev, { id: createId(), role: "bot", text }]);
    setAnnounce(`Kobi: ${text}`);
  };

  const send = async (raw: string) => {
    const text = raw.trim().slice(0, CHAT_MAX_LENGTH);
    if (!text || busy) return;
    setMessages((prev) => [...prev, { id: createId(), role: "user", text }]);
    setChips([]);
    setInput("");
    setBusy(true);

    const res = await chatService.send(text, sessionId.current);
    if (res.session_id && SESSION_RE.test(res.session_id)) {
      sessionId.current = res.session_id;
      storeSessionId(res.session_id);
    }
    setBusy(false);
    pushBot(res.reply);
    setChips(res.suggested_chips);
    if (res.escalate) {
      pushBot(
        "Want to talk to Ricky directly? Leave a message at /#contact — he replies personally.",
      );
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send(input);
    }
  };

  // Auto-grow textarea (max ~5 lines)
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
  }, [input]);

  const remaining = CHAT_MAX_LENGTH - input.length;
  const onNavigate = () => {
    if (phone) close();
  };

  return (
    <div className={styles.dock}>
      <AnimatePresence>
        {teaser && !open && !phone && (
          <motion.div
            className={styles.teaser}
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              className={styles.teaserBody}
              onClick={toggle}
            >
              G'day! Ask me about Ricky's work, skills or availability.
            </button>
            <button
              type="button"
              className={styles.teaserClose}
              onClick={() => setTeaser(false)}
              aria-label="Dismiss greeting"
            >
              <CloseIcon />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        ref={panelRef}
        id="kobi-panel"
        role="dialog"
        aria-modal={phone ? "true" : undefined}
        aria-label="Chat with Kobi, the site assistant"
        tabIndex={-1}
        className={[styles.panel, open && styles.panelOpen]
          .filter(Boolean)
          .join(" ")}
        inert={!open}
      >
        <header className={styles.head}>
          <span className={styles.headAvatar}>
            <MascotAvatar />
            <span className={styles.online} aria-hidden="true" />
          </span>
          <span className={styles.headText}>
            <strong>Kobi</strong>
            <span>Ricky's site guide · replies instantly</span>
          </span>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={close}
            aria-label="Close chat"
          >
            <CloseIcon />
          </button>
        </header>

        <div
          ref={listRef}
          className={styles.list}
          data-lenis-prevent=""
          aria-busy={busy}
        >
          {messages.map((m, i) => {
            if (m.id === "welcome") {
              return (
                <div key={m.id} className={`${styles.intro} ${styles.pop}`}>
                  <MascotAvatar variant="full" />
                  <p>
                    <ChatMessageText text={m.text} onNavigate={onNavigate} />
                  </p>
                </div>
              );
            }
            const lastOfGroup =
              m.role === "bot" && messages[i + 1]?.role !== "bot";
            return (
              <div
                key={m.id}
                className={[styles.row, styles[`row_${m.role}`], styles.pop]
                  .filter(Boolean)
                  .join(" ")}
              >
                {m.role === "bot" && (
                  <span className={styles.rowAvatar} aria-hidden="true">
                    {lastOfGroup && <MascotAvatar />}
                  </span>
                )}
                <p className={`${styles.bubble} ${styles[`bubble_${m.role}`]}`}>
                  <ChatMessageText text={m.text} onNavigate={onNavigate} />
                </p>
              </div>
            );
          })}

          {busy && (
            <div className={`${styles.row} ${styles.row_bot}`}>
              <span className={styles.rowAvatar} aria-hidden="true">
                <MascotAvatar />
              </span>
              <span className={styles.typing} role="status">
                <span className={styles.srOnly}>Kobi is typing</span>
                <i />
                <i />
                <i />
              </span>
            </div>
          )}

          {!busy && chips.length > 0 && (
            <div
              className={styles.chips}
              role="group"
              aria-label="Suggested questions"
            >
              {chips.map((c, i) => (
                <button
                  key={c}
                  type="button"
                  className={styles.chip}
                  style={{ animationDelay: `${i * 60}ms` }}
                  onClick={() => void send(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

        <form
          className={styles.composer}
          onSubmit={(e) => {
            e.preventDefault();
            void send(input);
          }}
        >
          <label htmlFor="kobi-input" className={styles.srOnly}>
            Message Kobi
          </label>
          <textarea
            id="kobi-input"
            ref={inputRef}
            className={styles.input}
            rows={1}
            value={input}
            maxLength={CHAT_MAX_LENGTH}
            placeholder="Ask about Ricky's work…"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <button
            type="submit"
            className={styles.send}
            disabled={busy || !input.trim()}
            aria-label="Send message"
          >
            <SendIcon />
          </button>
        </form>
        <p className={styles.foot}>
          {remaining <= 200
            ? `${remaining} characters left`
            : "AI assistant · answers from Ricky's portfolio notes"}
        </p>
        <div className={styles.srOnly} aria-live="polite">
          {announce}
        </div>
      </div>

      <button
        ref={launcherRef}
        type="button"
        className={[
          styles.launcher,
          open && styles.launcherOpen,
          teaser && phone && styles.ping,
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={toggle}
        aria-expanded={open}
        aria-controls="kobi-panel"
        aria-label={open ? "Close chat" : "Chat with Kobi, the site assistant"}
      >
        <span className={styles.face}>
          <MascotAvatar className={styles.bob} />
        </span>
        <span className={styles.closeGlyph}>
          <CloseIcon />
        </span>
        {!open && <span className={styles.status} aria-hidden="true" />}
      </button>
    </div>
  );
};
