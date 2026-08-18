import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { type Chapter } from "../content/chapters";

// Demos — one per chapter
import Ch01Intro from "./demos/Ch01Intro";
import Ch02Typography from "./demos/Ch02Typography";
import Ch03Colors from "./demos/Ch03Colors";
import Ch04Consistency from "./demos/Ch04Consistency";
import Ch05Flow from "./demos/Ch05Flow";
import Ch06Flexibility from "./demos/Ch06Flexibility";
import Ch07Errors from "./demos/Ch07Errors";
import Ch08Visibility from "./demos/Ch08Visibility";
import Ch09Synthesis from "./demos/Ch09Synthesis";

function Demo({ chapter }: { chapter: Chapter }) {
  switch (chapter.id) {
    case 1: return <Ch01Intro />;
    case 2: return <Ch02Typography />;
    case 3: return <Ch03Colors />;
    case 4: return <Ch04Consistency />;
    case 5: return <Ch05Flow />;
    case 6: return <Ch06Flexibility />;
    case 7: return <Ch07Errors />;
    case 8: return <Ch08Visibility />;
    case 9: return <Ch09Synthesis />;
    default: return null;
  }
}

interface ChapterViewProps {
  chapter: Chapter;
  direction: number;
}

export default function ChapterView({ chapter, direction }: ChapterViewProps) {
  const rm = useReducedMotion();

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.article
        key={chapter.id}
        initial={{ opacity: 0, x: rm ? 0 : direction * 28 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: rm ? 0 : direction * -28 }}
        transition={{ duration: rm ? 0 : 0.28, ease: [0.25, 0, 0.35, 1] }}
        className="h-full overflow-y-auto"
        aria-label={`Capítulo ${chapter.id}: ${chapter.title}`}
        tabIndex={-1}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            padding: "clamp(1.5rem, 4vw, 2.5rem) clamp(1rem, 3vw, 1.75rem)",
            paddingBottom: "3rem",
          }}
        >
          {/* Chapter header */}
          <header style={{ marginBottom: "2rem" }}>
            {/* Number + rule */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: "#0f1f14",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    color: "var(--accent)",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                    fontSize: "0.62rem",
                  }}
                >
                  {String(chapter.id).padStart(2, "0")}
                </span>
              </div>
              <div style={{ flex: 1, height: "1px", backgroundColor: "#1e1e1e" }} />
              {/* Tags */}
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
                {chapter.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      backgroundColor: "#1a1a1a",
                      color: "#333",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.55rem",
                      letterSpacing: "0.04em",
                      paddingInline: "0.5rem",
                      paddingBlock: "0.25rem",
                      borderRadius: "9999px",
                      border: "1px solid #222",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Title */}
            <h1
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--text)",
                fontSize: "clamp(1.6rem, 4vw, 2.25rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: "0.5rem",
              }}
            >
              {chapter.title}
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--subtle)",
                fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
                lineHeight: 1.45,
                marginBottom: "1rem",
              }}
            >
              {chapter.subtitle}
            </p>

            {/* Intro paragraph */}
            <p
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--muted)",
                fontSize: "clamp(0.875rem, 1.8vw, 1rem)",
                lineHeight: 1.7,
              }}
            >
              {chapter.intro}
            </p>
          </header>

          {/* Visual divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1.75rem",
            }}
          >
            <div style={{ flex: 1, height: "1px", backgroundColor: "#1e1e1e" }} />
            <span style={{ color: "#2a2a2a", fontFamily: "var(--font-mono)", fontSize: "0.5rem" }}>▼</span>
            <div style={{ flex: 1, height: "1px", backgroundColor: "#1e1e1e" }} />
          </div>

          {/* Demo section */}
          <section aria-label={`Demonstração: ${chapter.title}`}>
            <Demo chapter={chapter} />
          </section>
        </div>
      </motion.article>
    </AnimatePresence>
  );
}
