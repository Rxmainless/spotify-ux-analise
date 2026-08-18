import { motion } from "motion/react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const method = [
  { icon: "◎", step: "Observação", q: "O que existe na interface?" },
  { icon: "◈", step: "Evidência", q: "Onde e como isso se manifesta?" },
  { icon: "◆", step: "Impacto", q: "Como afeta eficiência e confiança?" },
  { icon: "→", step: "Recomendação", q: "O que manter, melhorar ou testar?" },
];

const structure = [
  { n: "02", t: "Tipografia e Identidade Visual" },
  { n: "03", t: "Paleta de Cores e Visibilidade" },
  { n: "04", t: "Consistência e Padronização" },
  { n: "05", t: "Fluxo de Uso e Responsividade" },
  { n: "06", t: "Flexibilidade de Uso" },
  { n: "07", t: "Prevenção de Erros e Acessibilidade" },
  { n: "08", t: "Visibilidade e Análise Crítica" },
  { n: "09", t: "Síntese e Recomendações" },
];

export default function Ch01Intro() {
  const rm = useReducedMotion();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid #222",
          borderRadius: "14px",
          padding: "1.5rem",
        }}
      >
        <div
          style={{
            color: "var(--muted)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            letterSpacing: "0.12em",
            marginBottom: "1rem",
          }}
        >
          METODOLOGIA — 4 ETAPAS
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          {method.map((m, i) => (
            <motion.div
              key={m.step}
              initial={{ opacity: 0, y: rm ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: rm ? 0 : i * 0.07, duration: 0.3 }}
              style={{
                backgroundColor: "#1e1e1e",
                borderRadius: "10px",
                padding: "1rem",
              }}
            >
              <div style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: "1.1rem", marginBottom: "0.4rem" }}>
                {m.icon}
              </div>
              <div style={{ color: "var(--text)", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.9rem" }}>
                {m.step}
              </div>
              <div style={{ color: "var(--subtle)", fontFamily: "var(--font-sans)", fontSize: "0.78rem", marginTop: "0.2rem", lineHeight: 1.4 }}>
                {m.q}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid #222",
          borderRadius: "14px",
          padding: "1.5rem",
        }}
      >
        <div
          style={{
            color: "var(--muted)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            letterSpacing: "0.12em",
            marginBottom: "1rem",
          }}
        >
          ESTRUTURA — 9 CAPÍTULOS
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          {structure.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, x: rm ? 0 : -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: rm ? 0 : 0.25 + i * 0.05, duration: 0.25 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.6rem 0.75rem",
                backgroundColor: "#1a1a1a",
                borderRadius: "8px",
              }}
            >
              <span
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  width: "1.8rem",
                  flexShrink: 0,
                }}
              >
                {s.n}
              </span>
              <span
                style={{
                  color: "var(--text)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.9rem",
                }}
              >
                {s.t}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div
        style={{
          padding: "1rem 1.25rem",
          borderRadius: "10px",
          borderLeft: "2px solid var(--accent)",
          backgroundColor: "#0f1f14",
        }}
      >
        <p style={{ color: "var(--muted)", fontFamily: "var(--font-sans)", fontSize: "0.88rem", lineHeight: 1.6, margin: 0 }}>
          <strong style={{ color: "var(--text)" }}>Regra central:</strong> cada observação exige evidência concreta. Sem evidência, não há análise — apenas impressão.
        </p>
      </div>
    </div>
  );
}