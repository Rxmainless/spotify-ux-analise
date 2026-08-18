import { useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function AccessibilityDemo() {
  const systemReduced = useReducedMotion();
  const [forceReduced, setForceReduced] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [largeFonts, setLargeFonts] = useState(false);

  const reduced = systemReduced || forceReduced;
  const textColor = highContrast ? "#FFFFFF" : "#B3B3B3";
  const fontSize = largeFonts ? "1rem" : "0.875rem";

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl" style={{ backgroundColor: "#181818", border: "1px solid #333" }}>
        <div style={{ color: "#B3B3B3", fontSize: "0.7rem", fontFamily: "var(--font-mono)", marginBottom: "1rem" }}>
          CONTROLES DE ACESSIBILIDADE
        </div>
        <div className="space-y-3">
          {[
            { label: "Reduzir movimento", state: forceReduced || systemReduced, set: setForceReduced, disabled: systemReduced, note: systemReduced ? "Ativo via sistema" : undefined },
            { label: "Alto contraste", state: highContrast, set: setHighContrast, disabled: false },
            { label: "Aumentar fonte", state: largeFonts, set: setLargeFonts, disabled: false },
          ].map(({ label, state, set, disabled, note }) => (
            <div key={label} className="flex items-center justify-between">
              <div>
                <div style={{ color: "#FFFFFF", fontSize: "0.875rem", fontFamily: "var(--font-body)" }}>{label}</div>
                {note && <div style={{ color: "#1DB954", fontSize: "0.65rem", fontFamily: "var(--font-mono)" }}>{note}</div>}
              </div>
              <button
                role="switch"
                aria-checked={state}
                aria-label={label}
                onClick={() => !disabled && set((p: boolean) => !p)}
                disabled={disabled}
                className="relative w-12 h-6 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: state ? "#1DB954" : "#333" }}
              >
                <span
                  className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-transform duration-200"
                  style={{
                    backgroundColor: "#FFFFFF",
                    transform: state ? "translateX(24px)" : "translateX(0)",
                  }}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div
        className="p-4 rounded-xl transition-all duration-300"
        style={{
          backgroundColor: "#181818",
          border: `1px solid ${highContrast ? "#FFFFFF" : "#333"}`,
        }}
        aria-live="polite"
      >
        <div style={{ color: "#B3B3B3", fontSize: "0.7rem", fontFamily: "var(--font-mono)", marginBottom: "0.75rem" }}>
          PREVIEW — INTERFACE COM CONFIGURAÇÕES ATIVAS
        </div>
        <div className="flex items-center gap-3">
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center focus-visible:outline-2"
            style={{ backgroundColor: "#1DB954", color: "#000" }}
            aria-label="Tocar Dark Side of the Moon — Pink Floyd"
          >
            <span>▶</span>
          </button>
          <div>
            <div style={{ fontSize, fontWeight: 600, color: "#FFFFFF", fontFamily: "var(--font-sans)" }}>
              Dark Side of the Moon
            </div>
            <div style={{ fontSize: largeFonts ? "0.875rem" : "0.75rem", color: textColor, fontFamily: "var(--font-body)" }}>
              Pink Floyd
            </div>
          </div>
        </div>
        {!reduced && (
          <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ backgroundColor: "#333" }}>
            <div
              className="h-full rounded-full"
              style={{
                backgroundColor: "#1DB954",
                width: "60%",
                transition: "width 0.1s linear",
                animation: "progress 3s linear infinite",
              }}
            />
          </div>
        )}
        {reduced && (
          <div className="mt-3 h-1 rounded-full" style={{ backgroundColor: "#333" }}>
            <div className="h-full rounded-full" style={{ backgroundColor: "#1DB954", width: "60%" }} />
          </div>
        )}
      </div>

      <div className="p-4 rounded-xl" style={{ backgroundColor: "#181818", border: "1px solid #333" }}>
        <div style={{ color: "#B3B3B3", fontSize: "0.7rem", fontFamily: "var(--font-mono)", marginBottom: "0.75rem" }}>
          CHECKLIST DE ACESSIBILIDADE
        </div>
        <div className="space-y-2">
          {[
            ["✓", "Foco visível em todos os controles", true],
            ["✓", "aria-label descritivo em botões de ação", true],
            ["✓", "role='switch' em toggles", true],
            ["✓", "Contraste AAA para texto principal (18.5:1)", true],
            ["✓", "prefers-reduced-motion respeitado", true],
            ["✓", "Não usar cor como único comunicador de estado", true],
            ["!", "Navegação por teclado completa requer teste manual", false],
          ].map(([icon, label, ok]) => (
            <div key={String(label)} className="flex items-start gap-2">
              <span style={{ color: ok ? "#1DB954" : "#F59E0B", fontFamily: "var(--font-mono)", fontSize: "0.75rem", flexShrink: 0 }}>
                {icon}
              </span>
              <span style={{ fontSize: "0.75rem", color: ok ? "#B3B3B3" : "#F59E0B", fontFamily: "var(--font-body)" }}>
                {String(label)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
