import { useState } from "react";

const contexts = ["Desktop", "Mobile", "Embed"];

const tokens = [
  { name: "--accent", value: "#1ED760", desc: "Ação confirmada, ativo" },
  { name: "--border-radius-sm", value: "4px", desc: "Botões pill small" },
  { name: "--border-radius-lg", value: "8px", desc: "Cards, modais" },
  { name: "--transition", value: "150ms ease", desc: "Hover states" },
  { name: "--font-sans", value: "DM Sans", desc: "Interface e leitura" },
];

const btnStates = [
  { label: "Normal", bg: "#1ED760", color: "#000", cursor: "pointer" },
  { label: "Hover", bg: "#1fdf64", color: "#000", cursor: "pointer" },
  { label: "Pressionado", bg: "#169c46", color: "#000", cursor: "pointer" },
  { label: "Desabilitado", bg: "#3a3a3a", color: "#666", cursor: "not-allowed" },
];

function DesktopPlayer() {
  return (
    <div style={{ backgroundColor: "#181818", borderRadius: "10px", padding: "1rem", display: "flex", alignItems: "center", gap: "1rem" }}>
      <div style={{ width: "52px", height: "52px", borderRadius: "6px", backgroundColor: "#2a2a2a", flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: "var(--text)", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.9rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Bohemian Rhapsody</div>
        <div style={{ color: "var(--muted)", fontFamily: "var(--font-sans)", fontSize: "0.75rem" }}>Queen</div>
      </div>
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        <button style={{ background: "none", border: "none", color: "#444", cursor: "pointer", fontSize: "0.7rem" }}>⏮</button>
        <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "var(--text)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#000", fontSize: "0.65rem" }}>▶</span>
        </div>
        <button style={{ background: "none", border: "none", color: "#444", cursor: "pointer", fontSize: "0.7rem" }}>⏭</button>
      </div>
      <div style={{ flex: 1, maxWidth: "140px", height: "3px", borderRadius: "2px", backgroundColor: "#2a2a2a" }}>
        <div style={{ width: "42%", height: "100%", backgroundColor: "var(--text)", borderRadius: "2px" }} />
      </div>
      <span style={{ color: "var(--muted)", fontFamily: "var(--font-mono)", fontSize: "0.62rem" }}>3:45</span>
    </div>
  );
}

function MobilePlayer() {
  return (
    <div style={{ backgroundColor: "#181818", borderRadius: "10px", padding: "1.25rem", maxWidth: "220px", margin: "0 auto" }}>
      <div style={{ width: "100%", aspectRatio: "1", borderRadius: "8px", backgroundColor: "#2a2a2a", marginBottom: "1rem" }} />
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <div style={{ color: "var(--text)", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1rem" }}>Bohemian Rhapsody</div>
        <div style={{ color: "var(--muted)", fontFamily: "var(--font-sans)", fontSize: "0.78rem" }}>Queen</div>
      </div>
      <div style={{ height: "3px", borderRadius: "2px", backgroundColor: "#2a2a2a", marginBottom: "1rem" }}>
        <div style={{ width: "42%", height: "100%", backgroundColor: "var(--accent)", borderRadius: "2px" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
        <button style={{ background: "none", border: "none", color: "#444", cursor: "pointer", fontSize: "0.85rem" }}>⏮</button>
        <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "var(--text)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#000", fontSize: "0.9rem" }}>▶</span>
        </div>
        <button style={{ background: "none", border: "none", color: "#444", cursor: "pointer", fontSize: "0.85rem" }}>⏭</button>
      </div>
    </div>
  );
}

function EmbedPlayer() {
  return (
    <div style={{ backgroundColor: "#282828", borderRadius: "12px", padding: "0.75rem", display: "flex", alignItems: "center", gap: "0.75rem", border: "1px solid #333" }}>
      <div style={{ width: "40px", height: "40px", borderRadius: "4px", backgroundColor: "#3a3a3a", flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: "#fff", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.82rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Bohemian Rhapsody</div>
        <div style={{ color: "#b3b3b3", fontFamily: "var(--font-sans)", fontSize: "0.7rem" }}>Queen · 5:55</div>
      </div>
      <div style={{ width: "28px", height: "28px", borderRadius: "50%", backgroundColor: "#1ED760", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span style={{ color: "#000", fontSize: "0.55rem" }}>▶</span>
      </div>
    </div>
  );
}

export default function Ch04Consistency() {
  const [ctx, setCtx] = useState(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Player contexts */}
      <div style={{ backgroundColor: "var(--surface)", border: "1px solid #222", borderRadius: "14px", padding: "1.5rem" }}>
        <div style={{ color: "#333", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em", marginBottom: "1rem" }}>
          MESMA TELA — TRÊS CONTEXTOS
        </div>
        <div style={{ display: "flex", gap: "0.4rem", marginBottom: "1.25rem" }}>
          {contexts.map((c, i) => (
            <button key={c} onClick={() => setCtx(i)}
              style={{ padding: "0.3rem 0.75rem", borderRadius: "9999px", fontSize: "0.72rem", fontFamily: "var(--font-mono)", backgroundColor: ctx === i ? "var(--accent)" : "#1e1e1e", color: ctx === i ? "#000" : "#555", border: "none", cursor: "pointer", fontWeight: ctx === i ? 700 : 400 }}
              aria-pressed={ctx === i}
            >
              {c}
            </button>
          ))}
        </div>
        <div>
          {ctx === 0 && <DesktopPlayer />}
          {ctx === 1 && <MobilePlayer />}
          {ctx === 2 && <EmbedPlayer />}
        </div>
        <p style={{ color: "var(--subtle)", fontFamily: "var(--font-sans)", fontSize: "0.78rem", marginTop: "0.75rem" }}>
          Mesmos tokens de design, hierarquia análoga. A função permanece reconhecível independente de onde aparece.
        </p>
      </div>

      {/* Design tokens */}
      <div style={{ backgroundColor: "var(--surface)", border: "1px solid #222", borderRadius: "14px", padding: "1.5rem" }}>
        <div style={{ color: "#333", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em", marginBottom: "1rem" }}>
          TOKENS DE DESIGN — CONSISTÊNCIA CENTRALIZADA
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {tokens.map((t) => (
            <div key={t.name} style={{ display: "flex", alignItems: "center", gap: "0.75rem", backgroundColor: "#1e1e1e", borderRadius: "8px", padding: "0.6rem 0.75rem" }}>
              <div style={{ width: "22px", height: "22px", borderRadius: "4px", flexShrink: 0, backgroundColor: t.name === "--accent" ? t.value : t.name.includes("transition") ? "#2a2a2a" : "#2a2a2a", border: "1px solid #333", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {t.name === "--accent" && <div style={{ width: "12px", height: "12px", borderRadius: "2px", backgroundColor: t.value }} />}
              </div>
              <code style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: "0.7rem", flex: "0 0 auto" }}>{t.name}</code>
              <code style={{ color: "var(--muted)", fontFamily: "var(--font-mono)", fontSize: "0.7rem", flex: "0 0 auto" }}>{t.value}</code>
              <span style={{ color: "#333", fontFamily: "var(--font-sans)", fontSize: "0.72rem", flex: 1, textAlign: "right" }}>{t.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Button states */}
      <div style={{ backgroundColor: "var(--surface)", border: "1px solid #222", borderRadius: "14px", padding: "1.5rem" }}>
        <div style={{ color: "#333", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em", marginBottom: "1rem" }}>
          ESTADOS DO BOTÃO PRIMÁRIO
        </div>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {btnStates.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ marginBottom: "0.4rem" }}>
                <div style={{ display: "inline-flex", padding: "0.55rem 1.1rem", borderRadius: "9999px", backgroundColor: s.bg, color: s.color, fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.8rem", cursor: s.cursor }}>
                  Salvar
                </div>
              </div>
              <div style={{ color: "#333", fontFamily: "var(--font-mono)", fontSize: "0.55rem" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
