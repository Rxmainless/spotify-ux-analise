import { useState } from "react";

const hierarchy = [
  { role: "Display / H1", size: "2.25rem", weight: 800, sample: "Destaque Principal", color: "var(--text)", note: "Topo de perfil, nome de artista em destaque" },
  { role: "Título / H2", size: "1.5rem", weight: 700, sample: "Lançamentos Recentes", color: "var(--text)", note: "Cabeçalhos de seção" },
  { role: "Nome de álbum", size: "1rem", weight: 600, sample: "Dark Side of the Moon", color: "var(--text)", note: "Cards, listas de reprodução" },
  { role: "Corpo / Interface", size: "0.875rem", weight: 400, sample: "Pink Floyd · Álbum · 1973", color: "var(--muted)", note: "Metadados e descrições" },
  { role: "Caption", size: "0.75rem", weight: 400, sample: "43 min · 10 músicas", color: "var(--subtle)", note: "Info secundária, durações" },
  { role: "Badge / Status", size: "0.62rem", weight: 600, sample: "TOCANDO AGORA", color: "var(--accent)", note: "Estado, rótulos de sistema" },
];

const weights = [300, 400, 500, 600, 700, 800, 900];

export default function Ch02Typography() {
  const [activeW, setActiveW] = useState(700);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Spotify Mix info */}
      <div style={{ backgroundColor: "var(--surface)", border: "1px solid #222", borderRadius: "14px", padding: "1.5rem" }}>
        <div style={{ color: "#333", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em", marginBottom: "1rem" }}>
          SPOTIFY MIX — FONTE VARIÁVEL PROPRIETÁRIA · 2024
        </div>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: activeW,
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
            color: "var(--text)",
            letterSpacing: "-0.025em",
            lineHeight: 1,
            marginBottom: "1.25rem",
          }}
        >
          Spotify Mix
        </div>
        <p style={{ color: "var(--subtle)", fontFamily: "var(--font-sans)", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "1.25rem" }}>
          Desenvolvida com a <strong style={{ color: "var(--muted)" }}>Dinamo Typefaces</strong>. Mistura traços geométricos, grotescos e humanistas — com detalhes que evocam ondas sonoras. É uma fonte variável: um arquivo, todo o espectro de peso.
        </p>
        <div>
          <div style={{ color: "#333", fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
            PESO ATIVO — {activeW}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {weights.map((w) => (
              <button
                key={w}
                onClick={() => setActiveW(w)}
                style={{
                  padding: "0.35rem 0.75rem",
                  borderRadius: "9999px",
                  border: `1px solid ${activeW === w ? "var(--accent)" : "#2a2a2a"}`,
                  backgroundColor: activeW === w ? "var(--accent)" : "#1e1e1e",
                  color: activeW === w ? "#000" : "#555",
                  fontFamily: "var(--font-sans)",
                  fontWeight: w,
                  fontSize: "0.72rem",
                  cursor: "pointer",
                }}
                aria-pressed={activeW === w}
                aria-label={`Peso ${w}`}
              >
                {w}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hierarchy scale */}
      <div style={{ backgroundColor: "var(--surface)", border: "1px solid #222", borderRadius: "14px", padding: "1.5rem" }}>
        <div style={{ color: "#333", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em", marginBottom: "1.25rem" }}>
          HIERARQUIA TIPOGRÁFICA — 6 NÍVEIS
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {hierarchy.map((h) => (
            <div key={h.role} style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
              <div style={{ width: "9rem", flexShrink: 0 }}>
                <div style={{ color: "#333", fontFamily: "var(--font-mono)", fontSize: "0.58rem" }}>{h.role}</div>
                <div style={{ color: "#222", fontFamily: "var(--font-mono)", fontSize: "0.52rem" }}>{h.size} / {h.weight}</div>
              </div>
              <div
                style={{
                  flex: 1,
                  fontSize: h.size,
                  fontWeight: h.weight,
                  fontFamily: h.role.includes("Badge") ? "var(--font-mono)" : "var(--font-sans)",
                  color: h.color,
                  letterSpacing: h.weight >= 700 ? "-0.01em" : "normal",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {h.sample}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Player context */}
      <div style={{ backgroundColor: "var(--surface)", border: "1px solid #222", borderRadius: "14px", padding: "1.5rem" }}>
        <div style={{ color: "#333", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em", marginBottom: "1rem" }}>
          HIERARQUIA EM CONTEXTO REAL — PLAYER
        </div>
        <div style={{ backgroundColor: "#121212", borderRadius: "10px", padding: "1rem", display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "8px", backgroundColor: "#2a2a2a", flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.95rem", color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              Dark Side of the Moon
            </div>
            <div style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "0.8rem", color: "var(--muted)" }}>
              Pink Floyd
            </div>
          </div>
          <div style={{ color: "var(--subtle)", fontFamily: "var(--font-mono)", fontSize: "0.75rem", flexShrink: 0 }}>♡</div>
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "var(--text)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ color: "#000", fontSize: "0.75rem" }}>▶</span>
          </div>
        </div>
        <p style={{ color: "var(--subtle)", fontFamily: "var(--font-sans)", fontSize: "0.78rem", marginTop: "0.75rem", lineHeight: 1.55 }}>
          Três níveis de hierarquia legíveis sem cor como diferenciador principal — peso e tamanho fazem o trabalho.
        </p>
      </div>
    </div>
  );
}
