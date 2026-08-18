import { useState } from "react";

const breakpoints = [
  { label: "Desktop", w: "100%", icon: "🖥" },
  { label: "Tablet", w: "75%", icon: "⬜" },
  { label: "Mobile", w: "44%", icon: "📱" },
];

const steps = [
  { n: "01", label: "Buscar", icon: "⌕", desc: "Campo de busca com sugestões em tempo real — resultados à medida que digita." },
  { n: "02", label: "Selecionar", icon: "↗", desc: "Toque na faixa abre player imediato. Sem tela de confirmação entre intenção e som." },
  { n: "03", label: "Reproduzir", icon: "▶", desc: "Player aparece sem quebrar o contexto da lista. Navegação continua disponível." },
  { n: "04", label: "Salvar", icon: "♡", desc: "Um toque adiciona à biblioteca. Feedback visual instantâneo, sem modal." },
];

const gaps = [
  { issue: "Podcast e músicas misturados na busca", impact: "Ruído cognitivo para quem sabe o que quer", sev: "med" },
  { issue: "Histórico de busca não sincroniza entre dispositivos", impact: "Usuário recomeça do zero no celular", sev: "med" },
  { issue: "Scroll de letras perde posição ao pausar", impact: "Perde o trecho da música ao voltar", sev: "low" },
];

const sevColor: Record<string, string> = { high: "var(--danger)", med: "var(--warn)", low: "var(--muted)" };

export default function Ch05Flow() {
  const [bp, setBp] = useState(0);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Breakpoint sim */}
      <div style={{ backgroundColor: "var(--surface)", border: "1px solid #222", borderRadius: "14px", padding: "1.5rem" }}>
        <div style={{ color: "#333", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em", marginBottom: "1rem" }}>
          SIMULADOR DE BREAKPOINT
        </div>
        <div style={{ display: "flex", gap: "0.4rem", marginBottom: "1.25rem" }}>
          {breakpoints.map((b, i) => (
            <button key={b.label} onClick={() => setBp(i)}
              style={{ padding: "0.3rem 0.75rem", borderRadius: "9999px", fontSize: "0.72rem", fontFamily: "var(--font-mono)", backgroundColor: bp === i ? "var(--accent)" : "#1e1e1e", color: bp === i ? "#000" : "#555", border: "none", cursor: "pointer", fontWeight: bp === i ? 700 : 400 }}
              aria-pressed={bp === i}
            >
              {b.icon} {b.label}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", transition: "all 0.3s" }}>
          <div style={{ width: breakpoints[bp].w, transition: "width 0.4s ease", border: "1px solid #2a2a2a", borderRadius: "8px", overflow: "hidden" }}>
            <div style={{ backgroundColor: "#181818", padding: "0.5rem 0.75rem", display: "flex", alignItems: "center", gap: "0.5rem", borderBottom: "1px solid #222" }}>
              <div style={{ flex: 1, height: "24px", backgroundColor: "#2a2a2a", borderRadius: "12px" }} />
              {bp < 2 && <div style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "#2a2a2a" }} />}
            </div>
            <div style={{ backgroundColor: "#121212", padding: "0.75rem" }}>
              {bp === 2 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {["Item A", "Item B", "Item C"].map((item) => (
                    <div key={item} style={{ height: "36px", backgroundColor: "#1e1e1e", borderRadius: "6px", display: "flex", alignItems: "center", padding: "0 0.5rem" }}>
                      <div style={{ width: "24px", height: "24px", backgroundColor: "#2a2a2a", borderRadius: "4px", marginRight: "0.5rem" }} />
                      <div style={{ flex: 1, height: "8px", backgroundColor: "#2a2a2a", borderRadius: "4px" }} />
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: bp === 0 ? "1fr 1fr 1fr 1fr" : "1fr 1fr", gap: "0.5rem" }}>
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} style={{ aspectRatio: "1", backgroundColor: "#1e1e1e", borderRadius: "6px" }} />
                  ))}
                </div>
              )}
            </div>
            <div style={{ backgroundColor: "#181818", borderTop: "1px solid #222", padding: "0.4rem 0.75rem", display: "flex", justifyContent: "space-around" }}>
              {["⌂", "⌕", "♫", "☰"].slice(0, bp === 2 ? 4 : 3).map((icon) => (
                <span key={icon} style={{ color: "#444", fontSize: "0.8rem" }}>{icon}</span>
              ))}
            </div>
          </div>
        </div>
        <p style={{ color: "var(--subtle)", fontFamily: "var(--font-sans)", fontSize: "0.78rem", marginTop: "0.75rem" }}>
          Layout adapta-se sem perda de funcionalidade. Na mobile, grade colapsa para lista e bottom navigation substitui a sidebar.
        </p>
      </div>

      {/* 4-step flow */}
      <div style={{ backgroundColor: "var(--surface)", border: "1px solid #222", borderRadius: "14px", padding: "1.5rem" }}>
        <div style={{ color: "#333", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em", marginBottom: "1rem" }}>
          FLUXO PRINCIPAL — 4 ETAPAS · CLIQUE PARA DETALHES
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {steps.map((s, i) => (
            <button key={s.n} onClick={() => setActiveStep(activeStep === i ? null : i)}
              style={{ background: "none", border: `1px solid ${activeStep === i ? "var(--accent)" : "#222"}`, borderRadius: "10px", padding: "0.75rem 1rem", cursor: "pointer", textAlign: "left", transition: "border-color 0.15s" }}
              aria-expanded={activeStep === i}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: "1rem", flexShrink: 0 }}>{s.icon}</span>
                <span style={{ color: "#2e2e2e", fontFamily: "var(--font-mono)", fontSize: "0.58rem", flexShrink: 0 }}>{s.n}</span>
                <span style={{ color: "var(--text)", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.9rem" }}>{s.label}</span>
              </div>
              {activeStep === i && (
                <div style={{ color: "var(--muted)", fontFamily: "var(--font-sans)", fontSize: "0.82rem", marginTop: "0.5rem", lineHeight: 1.55, paddingLeft: "2.25rem" }}>
                  {s.desc}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Gaps */}
      <div style={{ backgroundColor: "var(--surface)", border: "1px solid #222", borderRadius: "14px", padding: "1.5rem" }}>
        <div style={{ color: "#333", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em", marginBottom: "1rem" }}>
          LACUNAS IDENTIFICADAS NO FLUXO
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {gaps.map((g) => (
            <div key={g.issue} style={{ backgroundColor: "#1e1e1e", borderRadius: "8px", padding: "0.7rem 0.9rem", display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: sevColor[g.sev], marginTop: "0.4rem", flexShrink: 0 }} />
              <div>
                <div style={{ color: "var(--text)", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.85rem" }}>{g.issue}</div>
                <div style={{ color: "var(--subtle)", fontFamily: "var(--font-sans)", fontSize: "0.77rem", marginTop: "0.15rem" }}>{g.impact}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
