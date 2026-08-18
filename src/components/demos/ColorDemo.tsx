import { useState } from "react";

const palette = [
  { token: "--bg", hex: "#121212", label: "Fundo Principal", usage: "Fundo da página" },
  { token: "--surface-1", hex: "#181818", label: "Superfície 1", usage: "Cards e painéis" },
  { token: "--surface-2", hex: "#242424", label: "Superfície 2", usage: "Superfície elevada" },
  { token: "--accent", hex: "#1DB954", label: "Acento (Verde)", usage: "Ações e destaques", contrast: "AAA vs fundo" },
  { token: "--text", hex: "#FFFFFF", label: "Texto Principal", usage: "Títulos e body", contrast: "18.5:1" },
  { token: "--muted", hex: "#B3B3B3", label: "Texto Secundário", usage: "Labels e metadados", contrast: "7.5:1" },
  { token: "--danger", hex: "#D64545", label: "Perigo", usage: "Ações destrutivas" },
];

export default function ColorDemo() {
  const [selected, setSelected] = useState<string | null>(null);
  const sel = palette.find((p) => p.hex === selected);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
        {palette.map((color) => (
          <button
            key={color.hex}
            onClick={() => setSelected(selected === color.hex ? null : color.hex)}
            className="flex flex-col items-center gap-1.5 p-2 rounded-lg transition-all duration-150 focus-visible:outline-2"
            style={{
              border: selected === color.hex ? "2px solid #1DB954" : "2px solid transparent",
              backgroundColor: selected === color.hex ? "#1a1a1a" : "transparent",
            }}
            aria-pressed={selected === color.hex}
            aria-label={`Cor ${color.label}: ${color.hex}`}
          >
            <div
              className="w-10 h-10 rounded-full border"
              style={{ backgroundColor: color.hex, borderColor: color.hex === "#121212" ? "#333" : "transparent" }}
            />
            <span style={{ fontSize: "0.55rem", color: "#555", fontFamily: "var(--font-mono)", textAlign: "center" }}>
              {color.token}
            </span>
          </button>
        ))}
      </div>

      {sel && (
        <div className="p-4 rounded-xl" style={{ backgroundColor: "#181818", border: "1px solid #333" }}>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl flex-shrink-0 border" style={{ backgroundColor: sel.hex, borderColor: "#333" }} />
            <div className="flex-1">
              <div className="font-semibold" style={{ color: "#FFFFFF", fontFamily: "var(--font-sans)" }}>{sel.label}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "#1DB954" }}>{sel.hex}</div>
              <div className="text-sm mt-1" style={{ color: "#B3B3B3", fontFamily: "var(--font-body)" }}>{sel.usage}</div>
              {sel.contrast && (
                <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full" style={{ backgroundColor: "#1a3d2b" }}>
                  <span style={{ color: "#1DB954", fontSize: "0.65rem", fontFamily: "var(--font-mono)" }}>
                    WCAG {sel.contrast}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="p-4 rounded-xl" style={{ backgroundColor: "#181818", border: "1px solid #333" }}>
        <div style={{ color: "#B3B3B3", fontSize: "0.7rem", fontFamily: "var(--font-mono)", marginBottom: "0.75rem" }}>
          EXEMPLO DE USO
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: "#121212" }}>
          <div className="w-10 h-10 rounded-full" style={{ backgroundColor: "#242424" }} />
          <div className="flex-1">
            <div className="text-sm font-medium" style={{ color: "#FFFFFF", fontFamily: "var(--font-sans)" }}>Nome da Música</div>
            <div className="text-xs" style={{ color: "#B3B3B3", fontFamily: "var(--font-body)" }}>Nome do Artista</div>
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "#1DB954" }}>
            <span style={{ color: "#000", fontSize: "0.75rem" }}>▶</span>
          </div>
        </div>
        <div style={{ color: "#555", fontSize: "0.65rem", fontFamily: "var(--font-body)", marginTop: "0.5rem" }}>
          Verde usado exclusivamente para ação primária ativa
        </div>
      </div>
    </div>
  );
}
