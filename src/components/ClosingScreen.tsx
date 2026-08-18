import { motion } from "motion/react";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface ClosingScreenProps {
  onReplay: () => void;
}

export default function ClosingScreen({ onReplay }: ClosingScreenProps) {
  const rm = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: rm ? 0 : 0.5 }}
      className="h-full flex flex-col items-center justify-center px-6 text-center"
      style={{ backgroundColor: "var(--bg-deep)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: rm ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: rm ? 0 : 0.2, duration: 0.5 }}
        style={{ maxWidth: "520px", width: "100%" }}
      >
        {/* Wordmark */}
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 900,
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
            color: "var(--accent)",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            marginBottom: "0.5rem",
          }}
        >
          SPOTIFY
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.22em",
            color: "var(--subtle)",
            marginBottom: "3rem",
          }}
        >
          ANÁLISE CRÍTICA DE UX/UI
        </div>

        {/* Thank you */}
        <h1
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: "clamp(1.5rem, 4vw, 2rem)",
            color: "var(--text)",
            lineHeight: 1.2,
            marginBottom: "1rem",
          }}
        >
          Obrigado pela atenção.
        </h1>

        <p
          style={{
            fontFamily: "var(--font-sans)",
            color: "var(--muted)",
            fontSize: "1rem",
            lineHeight: 1.65,
            marginBottom: "2.5rem",
          }}
        >
          Esta análise foi construída sobre evidências verificáveis — dados públicos do Reclame Aqui,
          diretrizes de acessibilidade WCAG, e observação direta da interface do Spotify.
          Estamos abertos a perguntas.
        </p>

        {/* Divider */}
        <div
          style={{
            width: "40px",
            height: "1px",
            backgroundColor: "var(--border)",
            margin: "0 auto 2rem",
          }}
        />

        {/* Cultural note */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            color: "var(--subtle)",
            fontSize: "0.82rem",
            lineHeight: 1.6,
            marginBottom: "2.5rem",
          }}
        >
          Feito no Recife —{" "}
          <span style={{ color: "#555" }}>onde o design também encontra o frevo.</span>
        </p>

        <button
          onClick={onReplay}
          className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-150"
          style={{
            border: "1px solid var(--border)",
            color: "var(--muted)",
            fontFamily: "var(--font-sans)",
            backgroundColor: "transparent",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.color = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--muted)";
          }}
          aria-label="Reiniciar apresentação do início"
        >
          Recomeçar apresentação
        </button>
      </motion.div>
    </motion.div>
  );
}
