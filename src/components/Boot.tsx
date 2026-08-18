import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface BootProps {
  onComplete: () => void;
}

const LINES = [
  "> INITIALIZING UX ANALYSIS ENGINE",
  "> LOADING VISUAL SYSTEM............. OK",
  "> LOADING INTERACTION MODULE......... OK",
  "> CHECKING RESPONSIVE BREAKPOINTS.... OK",
  "> CHECKING ACCESSIBILITY MODULE...... OK",
  "> VALIDATING COLOR CONTRAST.......... OK",
  "> EXPERIENCE READY",
];

const DELAYS = [0, 300, 580, 840, 1080, 1300, 1550];

type Phase = "idle" | "booting" | "access" | "welcome";

export default function Boot({ onComplete }: BootProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress] = useState(0);
  const rm = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const startBoot = () => {
    if (phase !== "idle") return;
    setPhase("booting");

    if (rm) {
      setVisibleLines(LINES.length);
      setProgress(100);
      setTimeout(() => setPhase("access"), 80);
      setTimeout(() => setPhase("welcome"), 280);
      setTimeout(() => onComplete(), 560);
      return;
    }

    LINES.forEach((_, i) => {
      timerRef.current.push(setTimeout(() => setVisibleLines(i + 1), DELAYS[i]));
    });

    const iv = setInterval(() => {
      setProgress((p) => { if (p >= 100) { clearInterval(iv); return 100; } return p + 1.5; });
    }, 26);

    timerRef.current.push(setTimeout(() => setPhase("access"), 1950));
    timerRef.current.push(setTimeout(() => setPhase("welcome"), 2700));
    timerRef.current.push(setTimeout(() => onComplete(), 3600));
  };

  const skip = () => {
    timerRef.current.forEach(clearTimeout);
    setVisibleLines(LINES.length);
    setProgress(100);
    setPhase("access");
    setTimeout(() => setPhase("welcome"), 120);
    setTimeout(() => onComplete(), 400);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if ((e.key === "Enter" || e.key === " ") && phase === "idle") { e.preventDefault(); startBoot(); }
    if (e.key === "Escape" && phase === "booting") skip();
  };

  return (
    <div
      ref={ref}
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ backgroundColor: "var(--bg-deep)", outline: "none" }}
      tabIndex={0}
      onKeyDown={handleKey}
      onClick={phase === "idle" ? startBoot : undefined}
      role="main"
      aria-label="Tela de inicialização. Pressione Enter ou clique para começar."
    >
      <AnimatePresence mode="wait">
        {phase === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: rm ? 0 : 0.4 }}
            className="text-center"
            style={{ userSelect: "none" }}
          >
            <motion.div
              animate={rm ? {} : { opacity: [0.55, 1, 0.55] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              style={{ marginBottom: "3rem" }}
            >
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 900,
                  fontSize: "clamp(3.5rem, 11vw, 7rem)",
                  color: "var(--accent)",
                  letterSpacing: "-0.04em",
                  lineHeight: 0.95,
                }}
              >
                SPOTIFY
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "clamp(0.55rem, 1.2vw, 0.72rem)",
                  letterSpacing: "0.35em",
                  color: "#2e2e2e",
                  marginTop: "0.75rem",
                  textTransform: "uppercase",
                }}
              >
                UX/UI EXPERIENCE
              </div>
            </motion.div>

            <motion.div
              animate={rm ? {} : { opacity: [0.1, 1, 0.1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(0.6rem, 1.4vw, 0.75rem)",
                letterSpacing: "0.2em",
                color: "#444",
                marginBottom: "2rem",
              }}
              aria-live="polite"
            >
              PRESSIONE ENTER OU CLIQUE PARA INICIALIZAR
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); startBoot(); }}
              style={{
                backgroundColor: "var(--accent)",
                color: "#000",
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: "0.9rem",
                paddingInline: "2rem",
                paddingBlock: "0.75rem",
                borderRadius: "9999px",
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1FDF64"; e.currentTarget.style.transform = "scale(1.02)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--accent)"; e.currentTarget.style.transform = "scale(1)"; }}
              aria-label="Iniciar apresentação"
            >
              Iniciar
            </button>
          </motion.div>
        )}

        {phase === "booting" && (
          <motion.div
            key="booting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: rm ? 0 : 0.18 }}
            style={{ width: "100%", maxWidth: "520px", padding: "0 1.5rem" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "clamp(1.25rem, 4vw, 2rem)",
              }}
            >
              <div
                style={{
                  color: "var(--accent)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.12em",
                  marginBottom: "1.25rem",
                }}
              >
                SPOTIFY UX EXPERIENCE — BOOT SEQUENCE
              </div>

              <div style={{ minHeight: "196px", marginBottom: "1.5rem" }}>
                {LINES.slice(0, visibleLines).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: rm ? 0 : 0.15 }}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "clamp(0.65rem, 1.5vw, 0.78rem)",
                      lineHeight: 2,
                      color: i === visibleLines - 1 ? "var(--text)" : "#3a3a3a",
                    }}
                  >
                    {line}
                    {i === visibleLines - 1 && !rm && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.55, repeat: Infinity }}
                        style={{ color: "var(--accent)", marginLeft: "2px" }}
                      >
                        ▊
                      </motion.span>
                    )}
                  </motion.div>
                ))}
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    color: "#333",
                    marginBottom: "0.4rem",
                  }}
                >
                  <span>CARREGANDO</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div style={{ height: "2px", backgroundColor: "var(--border)", borderRadius: "1px" }}>
                  <div
                    style={{
                      height: "100%",
                      backgroundColor: "var(--accent)",
                      borderRadius: "1px",
                      width: `${progress}%`,
                      transition: rm ? "none" : "width 0.06s linear",
                    }}
                  />
                </div>
              </div>

              <button
                onClick={skip}
                style={{
                  marginTop: "1rem",
                  background: "none",
                  border: "none",
                  color: "#2e2e2e",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.08em",
                  cursor: "pointer",
                  padding: 0,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#555"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#2e2e2e"; }}
              >
                ESC — PULAR
              </button>
            </div>
          </motion.div>
        )}

        {phase === "access" && (
          <motion.div
            key="access"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: rm ? 0 : 0.28 }}
            style={{ textAlign: "center" }}
            aria-live="assertive"
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--accent)",
                fontSize: "clamp(1rem, 3vw, 1.5rem)",
                letterSpacing: "0.32em",
                fontWeight: 700,
              }}
            >
              ACCESS GRANTED
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                color: "#2a2a2a",
                fontSize: "0.62rem",
                letterSpacing: "0.2em",
                marginTop: "0.4rem",
              }}
            >
              ACESSO CONCLUÍDO
            </div>
          </motion.div>
        )}

        {phase === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: rm ? 0 : 0.4 }}
            style={{ textAlign: "center" }}
            aria-live="assertive"
          >
            <div
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--text)",
                fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
              }}
            >
              Bem-vindos à Experiência
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                color: "#2a2a2a",
                fontSize: "0.62rem",
                letterSpacing: "0.2em",
                marginTop: "0.5rem",
              }}
            >
              ANÁLISE CRÍTICA DE UX/UI — SPOTIFY
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
