import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Send, ArrowUpRight } from "lucide-react";
// The knowledge base (all page text and faculty data) is loaded on the first question, not with every page.
import type { AssistantLink } from "../data/assistantKnowledge";

const SUGGESTIONS = ["OPD timings", "How to apply for MBBS?", "Contact numbers", "Bus routes", "Fee structure", "Download brochure"];

interface Message {
  from: "bot" | "user";
  text: string;
  links?: AssistantLink[];
}

/** Friendly robot face used as the assistant's logo. */
function AssistantAvatar({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <line x1="24" y1="5.5" x2="24" y2="11" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="5" r="2.6" fill="#f1f5f9" />
      <rect x="5" y="20" width="4.5" height="9" rx="2.2" fill="#ffffff" />
      <rect x="38.5" y="20" width="4.5" height="9" rx="2.2" fill="#ffffff" />
      <rect x="8.5" y="10.5" width="31" height="27" rx="12" fill="#ffffff" />
      <rect x="12.5" y="15" width="23" height="16.5" rx="7.5" fill="#0d2346" />
      <ellipse cx="19" cy="22" rx="2.3" ry="2.9" fill="#f1f5f9" />
      <ellipse cx="29" cy="22" rx="2.3" ry="2.9" fill="#f1f5f9" />
      <circle cx="19.8" cy="21" r="0.8" fill="#ffffff" />
      <circle cx="29.8" cy="21" r="0.8" fill="#ffffff" />
      <path d="M20.5 26.6 Q24 29.6 27.5 26.6" fill="none" stroke="#f1f5f9" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="15.6" cy="27.6" r="1.5" fill="#f9a8d4" opacity="0.85" />
      <circle cx="32.4" cy="27.6" r="1.5" fill="#f9a8d4" opacity="0.85" />
      <rect x="18" y="38.5" width="12" height="5" rx="2.5" fill="#ffffff" opacity="0.9" />
    </svg>
  );
}

const GREETING: Message = {
  from: "bot",
  text: "Hi! I'm the AIMS assistant. Ask me about admissions, departments, doctors, timings, transport or anything on this website, and I'll take you to the right page.",
};

/** Site-wide help chat: a round icon in the bottom-right corner that opens a small chat panel. */
export default function ChatAssistant() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const ask = async (question: string) => {
    const q = question.trim();
    if (!q) return;
    setMessages((m) => [...m, { from: "user", text: q }]);
    setInput("");
    const { matchQuestion } = await import("../data/assistantKnowledge");
    setMessages((m) => [...m, { from: "bot", ...matchQuestion(q) }]);
  };

  const go = (link: AssistantLink) => {
    if (link.external) {
      window.open(link.path, "_blank", "noopener,noreferrer");
      return;
    }
    navigate(link.path);
    // On phones the panel covers the page, so close it to show where we went.
    if (window.matchMedia("(max-width: 639px)").matches) setOpen(false);
  };

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-label="AIMS assistant"
          className="fixed inset-x-3 bottom-20 z-[60] flex h-[min(70svh,560px)] flex-col overflow-hidden rounded-2xl border border-[#cbd5e1] bg-white shadow-[0_24px_60px_rgba(8,44,76,0.28)] sm:inset-x-auto sm:right-6 sm:bottom-24 sm:w-[370px] dark:border-white/10 dark:bg-[#0b1626]"
        >
          <div className="flex items-center justify-between gap-3 bg-[#0d2346] px-4 py-3 text-white">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                <AssistantAvatar className="h-7 w-7" />
              </span>
              <p className="font-['Manrope',sans-serif] text-sm font-bold leading-tight">AIMS Assistant</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close assistant" className="rounded-full p-1.5 hover:bg-white/15">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto overscroll-contain bg-[#f8fafc] px-3.5 py-4 dark:bg-transparent">
            {messages.map((m, i) => (
              <div key={i} className={`flex items-end gap-2 ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                {m.from === "bot" && (
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0d2346] dark:bg-teal-600">
                    <AssistantAvatar className="h-5 w-5" />
                  </span>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-line ${
                    m.from === "user"
                      ? "rounded-br-md bg-[#1f3351] text-white dark:bg-teal-600"
                      : "rounded-bl-md border border-[#e2e8f0] bg-white text-[#334155] dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                  }`}
                >
                  {m.text}
                  {m.links && m.links.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {m.links.map((l) => (
                        <button
                          key={l.path}
                          type="button"
                          onClick={() => go(l)}
                          className="inline-flex items-center gap-1 rounded-full border border-[#1f3351]/20 bg-[#1f3351]/5 px-2.5 py-1 text-[11.5px] font-semibold text-[#1f3351] transition-colors hover:bg-[#1f3351] hover:text-white dark:border-teal-400/30 dark:bg-teal-400/10 dark:text-teal-300 dark:hover:bg-teal-500 dark:hover:text-[#04121f]"
                        >
                          {l.label}
                          <ArrowUpRight className="h-3 w-3" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => ask(s)}
                    className="rounded-full border border-[#cbd5e1] bg-white px-3 py-1.5 text-xs font-medium text-[#475569] transition-colors hover:border-[#1f3351] hover:text-[#1f3351] dark:border-white/15 dark:bg-white/5 dark:text-slate-300 dark:hover:border-teal-400 dark:hover:text-teal-300"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="flex items-center gap-2 border-t border-[#e2e8f0] bg-white p-2.5 dark:border-white/10 dark:bg-[#0b1626]"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question…"
              aria-label="Your question"
              maxLength={200}
              className="min-w-0 flex-1 rounded-full border border-[#cbd5e1] bg-[#f8fafc] px-4 py-2 text-sm text-[#1f3351] outline-none placeholder:text-[#94a3b8] focus:border-[#1f3351] dark:border-white/15 dark:bg-white/5 dark:text-white dark:focus:border-teal-400"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1f3351] text-white transition-opacity disabled:opacity-40 dark:bg-teal-500 dark:text-[#04121f]"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close assistant" : "Open AIMS assistant"}
        aria-expanded={open}
        className="group fixed right-4 bottom-4 z-[60] flex h-13 w-13 items-center justify-center rounded-full border border-white/20 bg-[#0d2346] text-white shadow-[0_10px_28px_rgba(13,35,70,0.45)] transition-transform hover:scale-105 active:scale-95 sm:right-6 sm:bottom-6 sm:h-14 sm:w-14 dark:bg-teal-600 dark:text-white"
      >
        {open ? <X className="h-5 w-5" /> : <AssistantAvatar className="h-9 w-9 transition-transform duration-300 group-hover:-rotate-6" />}
      </button>
    </>
  );
}
