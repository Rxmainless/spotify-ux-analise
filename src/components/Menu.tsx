import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { chapters } from "../content/chapters";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface MenuProps {
  open: boolean;
  current: number;
  visited: Set<number>;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Menu({ open, current, visited, onClose, onNavigate }: MenuProps) {
  const rm = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => closeRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape" && open) onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: rm ? 0 : 0.2 }}
            className="fixed inset-0 z-40"
            style={{ backgroundColor: "rgba(0,0,0,0.78)" }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.nav
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de capítulos"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: rm ? 0 : 0.26, ease: [0.25, 0, 0.35, 1] }}
            className="fixed right-0 top-0 bottom-0 z-50 flex flex-col"
            style={{
              width: "min(360px, 92vw)",
              backgroundColor: "#141414",
              borderLeft: "1px solid var(--border)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between"
              style={{
                padding: "1.25rem 1.5rem",
                borderBottom: "1px solid #1e1e1e",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: "var(--text)",
                  }}
                >
                  Capítulos
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.58rem",
                    color: "#2e2e2e",
                    marginTop: "2px",
                    letterSpacing: "0.06em",
                  }}
                >
                  {chapters.length} TÓPICOS
                </div>
              </div>
              <button
                ref={closeRef}
                onClick={onClose}
                className="flex items-center justify-center rounded-full transition-all duration-150"
                style={{ width: "32px", height: "32px", color: "#444" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--surface-2)"; e.currentTarget.style.color = "var(--text)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#444"; }}
                aria-label="Fechar menu"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto" style={{ paddingBlock: "0.5rem" }}>
              {chapters.map((ch, i) => {
                const isCurrent = i === current;
                const isDone = visited.has(i) && !isCurrent;
                return (
                  <button
                    key={ch.id}
                    onClick={() => { onNavigate(i); onClose(); }}
                    className="w-full text-left flex items-center gap-4 transition-all duration-150"
                    style={{
                      padding: "0.85rem 1.5rem",
                      backgroundColor: isCurrent ? "#1a1a1a" : "transparent",
                      borderLeft: `2px solid ${isCurrent ? "var(--accent)" : "transparent"}`,
                    }}
                    onMouseEnter={(e) => { if (!isCurrent) e.currentTarget.style.backgroundColor = "#181818"; }}
                    onMouseLeave={(e) => { if (!isCurrent) e.currentTarget.style.backgroundColor = "transparent"; }}
                    aria-current={isCurrent ? "page" : undefined}
                    aria-label={`Capítulo ${ch.id}: ${ch.title}`}
                  >
                    <span
                      className="flex-shrink-0 rounded-full flex items-center justify-center"
                      style={{
                        width: "28px",
                        height: "28px",
                        backgroundColor: isCurrent ? "#0f1f14" : isDone ? "#0f1f14" : "#1e1e1e",
                        color: isCurrent ? "var(--accent)" : isDone ? "var(--accent)" : "#333",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.58rem",
                        fontWeight: 700,
                      }}
                    >
                      {isDone ? "✓" : String(ch.id).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div
                        className="truncate"
                        style={{
                          color: isCurrent ? "var(--text)" : "var(--subtle)",
                          fontFamily: "var(--font-sans)",
                          fontWeight: isCurrent ? 600 : 400,
                          fontSize: "0.85rem",
                        }}
                      >
                        {ch.title}
                      </div>
                      <div
                        className="truncate"
                        style={{
                          color: "#2e2e2e",
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.7rem",
                          marginTop: "0.1rem",
                        }}
                      >
                        {ch.subtitle}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div
              style={{
                padding: "1rem 1.5rem",
                borderTop: "1px solid #1e1e1e",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.58rem",
                  color: "#2a2a2a",
                  letterSpacing: "0.08em",
                }}
              >
                ← → NAVEGAR &nbsp;·&nbsp; M MENU &nbsp;·&nbsp; S SOM &nbsp;·&nbsp; ESC FECHAR
              </div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
