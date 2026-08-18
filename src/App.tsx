import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Boot from "./components/Boot";
import Menu from "./components/Menu";
import ChapterView from "./components/ChapterView";
import ClosingScreen from "./components/ClosingScreen";
import { chapters } from "./content/chapters";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { useChapterSound } from "./hooks/useChapterSound";

type AppState = "boot" | "chapters" | "closing";

export default function App() {
  const [appState, setAppState] = useState<AppState>("boot");
  const [currentChapter, setCurrentChapter] = useState(0);
  const [direction, setDirection] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visited, setVisited] = useState<Set<number>>(new Set([0]));
  const [muted, setMuted] = useState(false);
  const reducedMotion = useReducedMotion();
  const { play: playSound } = useChapterSound(muted || reducedMotion);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(chapters.length - 1, index));
      setDirection(clamped >= currentChapter ? 1 : -1);
      setCurrentChapter(clamped);
      setVisited((prev) => new Set([...prev, clamped]));
      playSound();
    },
    [currentChapter, playSound]
  );

  const next = useCallback(() => {
    if (currentChapter === chapters.length - 1) {
      setAppState("closing");
    } else {
      goTo(currentChapter + 1);
    }
  }, [currentChapter, goTo]);

  const prev = useCallback(() => goTo(currentChapter - 1), [currentChapter, goTo]);

  const replay = useCallback(() => {
    setCurrentChapter(0);
    setVisited(new Set([0]));
    setAppState("boot");
  }, []);

  useEffect(() => {
    if (appState !== "chapters") return;
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (menuOpen && e.key !== "Escape") return;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          next();
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          prev();
          break;
        case "Home":
          e.preventDefault();
          goTo(0);
          break;
        case "End":
          e.preventDefault();
          goTo(chapters.length - 1);
          break;
        case "m":
        case "M":
          setMenuOpen((o) => !o);
          break;
        case "s":
        case "S":
          setMuted((m) => !m);
          break;
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [appState, menuOpen, next, prev, goTo]);

  const touchStartX = useRef<number>(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  };

  const progress = ((currentChapter + 1) / chapters.length) * 100;
  const chapter = chapters[currentChapter];
  const isFirst = currentChapter === 0;
  const isLast = currentChapter === chapters.length - 1;

  return (
    <div className="fixed inset-0 flex flex-col" style={{ backgroundColor: "var(--bg-deep)" }}>
      {/* Boot overlay */}
      <AnimatePresence mode="wait">
        {appState === "boot" && (
          <motion.div
            key="boot"
            className="absolute inset-0 z-50"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.45 }}
          >
            <Boot onComplete={() => setAppState("chapters")} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Closing screen overlay */}
      <AnimatePresence>
        {appState === "closing" && (
          <motion.div
            key="closing"
            className="absolute inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.4 }}
          >
            <ClosingScreen onReplay={replay} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main shell — always rendered so closing screen overlays it */}
      <motion.div
        className="flex flex-col h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: appState === "chapters" ? 1 : appState === "closing" ? 0.3 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.4 }}
        aria-hidden={appState !== "chapters"}
      >
        {/* Header */}
        <header
          className="flex-shrink-0 flex items-center justify-between"
          style={{
            height: "52px",
            paddingInline: "clamp(1rem, 3vw, 1.75rem)",
            borderBottom: "1px solid var(--border)",
            backgroundColor: "rgba(13,13,13,0.97)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div className="flex items-center gap-3">
            <span
              style={{
                color: "var(--accent)",
                fontFamily: "var(--font-sans)",
                fontWeight: 900,
                fontSize: "1.05rem",
                letterSpacing: "-0.02em",
              }}
              aria-label="Spotify — Análise UX/UI"
            >
              SPOTIFY
            </span>
            <div className="hidden sm:block w-px h-3" style={{ backgroundColor: "var(--border)" }} />
            <span
              className="hidden sm:block"
              style={{
                color: "#2e2e2e",
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.14em",
              }}
            >
              ANÁLISE UX/UI
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Mute toggle */}
            <button
              onClick={() => setMuted((m) => !m)}
              className="flex items-center justify-center rounded-full transition-all duration-150"
              style={{
                width: "32px",
                height: "32px",
                color: muted ? "var(--subtle)" : "var(--accent)",
                border: "1px solid var(--border)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#444"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
              aria-label={muted ? "Ativar som (S)" : "Silenciar som (S)"}
              aria-pressed={muted}
              title={muted ? "Som desativado" : "Som ativado"}
            >
              {muted ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                  <line x1="23" y1="9" x2="17" y2="15"/>
                  <line x1="17" y1="9" x2="23" y2="15"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                </svg>
              )}
            </button>

            {/* Chapter counter */}
            <span
              className="hidden md:block"
              style={{
                color: "#2e2e2e",
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.04em",
              }}
            >
              {String(currentChapter + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(chapters.length).padStart(2, "0")}
            </span>

            {/* Menu button */}
            <button
              onClick={() => setMenuOpen(true)}
              className="flex items-center gap-2 rounded-lg text-sm transition-all duration-150"
              style={{
                paddingInline: "0.75rem",
                paddingBlock: "0.375rem",
                border: "1px solid var(--border)",
                color: "var(--subtle)",
                fontFamily: "var(--font-sans)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#444";
                e.currentTarget.style.color = "var(--text)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--subtle)";
              }}
              aria-label="Abrir menu de capítulos (M)"
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
            >
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <rect width="14" height="1.5" rx="0.75" fill="currentColor" />
                <rect y="4.25" width="10" height="1.5" rx="0.75" fill="currentColor" />
                <rect y="8.5" width="14" height="1.5" rx="0.75" fill="currentColor" />
              </svg>
              <span className="hidden sm:block" style={{ fontSize: "0.82rem" }}>Capítulos</span>
            </button>
          </div>
        </header>

        {/* Progress bar */}
        <div className="flex-shrink-0" style={{ height: "2px", backgroundColor: "var(--border)" }}>
          <motion.div
            style={{ backgroundColor: "var(--accent)", height: "100%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: reducedMotion ? 0 : 0.4, ease: "easeOut" }}
            role="progressbar"
            aria-valuenow={currentChapter + 1}
            aria-valuemin={1}
            aria-valuemax={chapters.length}
            aria-label={`Capítulo ${currentChapter + 1} de ${chapters.length}`}
          />
        </div>

        {/* Content */}
        <main
          className="flex-1 overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <ChapterView chapter={chapter} direction={direction} />
        </main>

        {/* Footer */}
        <footer
          className="flex-shrink-0 flex items-center justify-between"
          style={{
            height: "56px",
            paddingInline: "clamp(1rem, 3vw, 1.75rem)",
            borderTop: "1px solid var(--border)",
            backgroundColor: "rgba(13,13,13,0.97)",
            backdropFilter: "blur(16px)",
          }}
        >
          {/* Prev */}
          <button
            onClick={prev}
            disabled={isFirst}
            className="flex items-center gap-2 rounded-lg text-sm font-medium transition-all duration-150"
            style={{
              paddingInline: "1rem",
              paddingBlock: "0.5rem",
              border: "1px solid var(--border)",
              color: "var(--subtle)",
              fontFamily: "var(--font-sans)",
              opacity: isFirst ? 0.25 : 1,
              pointerEvents: isFirst ? "none" : "auto",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#444"; e.currentTarget.style.color = "var(--text)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--subtle)"; }}
            aria-label={isFirst ? "Primeiro capítulo" : `Anterior: ${chapters[currentChapter - 1]?.title}`}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M7.5 2L3 6l4.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="hidden sm:block">Anterior</span>
          </button>

          {/* Chapter dots */}
          <div
            className="flex items-center gap-1.5 overflow-hidden"
            role="tablist"
            aria-label="Navegação por capítulos"
          >
            {chapters.map((ch, i) => (
              <button
                key={i}
                role="tab"
                onClick={() => goTo(i)}
                className="rounded-full transition-all duration-200 flex-shrink-0"
                style={{
                  width: i === currentChapter ? "20px" : "5px",
                  height: "5px",
                  backgroundColor:
                    i === currentChapter
                      ? "var(--accent)"
                      : visited.has(i)
                      ? "#2e2e2e"
                      : "#1e1e1e",
                }}
                aria-label={ch.title}
                aria-selected={i === currentChapter}
                title={ch.title}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={next}
            className="flex items-center gap-2 rounded-lg text-sm font-semibold transition-all duration-150"
            style={{
              paddingInline: "1rem",
              paddingBlock: "0.5rem",
              backgroundColor: isLast ? "transparent" : "var(--accent)",
              color: isLast ? "var(--subtle)" : "#000",
              border: isLast ? "1px solid var(--border)" : "none",
              fontFamily: "var(--font-sans)",
            }}
            onMouseEnter={(e) => {
              if (!isLast) e.currentTarget.style.backgroundColor = "#1FDF64";
              else { e.currentTarget.style.borderColor = "#444"; e.currentTarget.style.color = "var(--text)"; }
            }}
            onMouseLeave={(e) => {
              if (!isLast) e.currentTarget.style.backgroundColor = "var(--accent)";
              else { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--subtle)"; }
            }}
            aria-label={isLast ? "Encerrar apresentação" : `Próximo: ${chapters[currentChapter + 1]?.title}`}
          >
            <span className="hidden sm:block">{isLast ? "Encerrar" : "Próximo"}</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M4.5 2L9 6l-4.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </footer>
      </motion.div>

      <Menu
        open={menuOpen}
        current={currentChapter}
        visited={visited}
        onClose={() => setMenuOpen(false)}
        onNavigate={goTo}
      />
    </div>
  );
}
