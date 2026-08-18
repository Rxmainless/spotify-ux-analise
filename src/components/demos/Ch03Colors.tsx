import { useState } from "react";

const palette = [
  { name: "Spotify Green", hex: "#1ED760", role: "Ações confirmadas, estado ativo, identidade", contrast: "7.5:1", wcag: "AA" },
  { name: "Background", hex: "#121212", role: "Fundo principal — absorve, não compete", contrast: "—", wcag: "Base" },
  { name: "Surface", hex: "#181818", role: "Cards, painéis, modais", contrast: "—", wcag: "—" },
  { name: "Surface 2", hex: "#242424", role: "Hover, superfície elevada", contrast: "—", wcag: "—" },
  { name: "Texto Principal", hex: "#FFFFFF", role: "Títulos e interface primária", contrast: "21:1", wcag: "AAA" },
  { name: "Texto Secundário", hex: "#B3B3B3", role: "Metadados, labels", contrast: "7.5:1", wcag: "AA" },
  { name: "Perigo", hex: "#E91429", role: "Erros, ações destrutivas", contrast: "4.5:1", wcag: "AA" },
];

const albums = [
  { name: "Dark Side of the Moon", bg: "#1a0f2e", accent: "#8b5cf6", text: "#FFFFFF", sub: "#c4b5fd" },
  { name: "Rumours", bg: "#1c1008", accent: "#d97706", text: "#FFFFFF", sub: "#fcd34d" },
  { name: "Kind of Blue", bg: "#0c1a2e", accent: "#3b82f6", text: "#FFFFFF", sub: "#93c5fd" },
  { name: "Abbey Road", bg: "#121a0e", accent: "#84cc16", text: "#FFFFFF", sub: "#bef264" },
];

function lum(hex: string) {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16) / 255;
  const g = parseInt(c.slice(2, 4), 16) / 255;
  const b = parseInt(c.slice(4, 6), 16) / 255;
  const lin = (v: number) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}
function cr(a: string, b: string) {
  const l1 = lum(a); const l2 = lum(b);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  return ratio.toFixed(1) + ":1";
}
function level(ratio: number) {
  if (ratio >= 7) return { l: "AAA", c: "var(--accent)" };
  if (ratio >= 4.5) return { l: "AA", c: "var(--accent)" };
  if (ratio >= 3) return { l: "AA Large", c: "var(--warn)" };
  return { l: "Falha", c: "var(--danger)" };
}

export default function Ch03Colors() {
  const [selHex, setSelHex] = useState<string | null>(null);
  const [albumIdx, setAlbumIdx] = useState(0);
  const [fg, setFg] = useState("#FFFFFF");
  const [bg, setBg] = useState("#121212");

  const sel = palette.find((p) => p.hex === selHex);
  const album = albums[albumIdx];
  const ratio = fg.length === 7 && bg.length === 7 ? parseFloat(cr(fg, bg).replace(":1", "")) : null;
  const wcag = ratio ? level(ratio) : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Palette */}
      <div style={{ backgroundColor: "var(--surface)", border: "1px solid #222", borderRadius: "14px", padding: "1.5rem" }}>
        <div style={{ color: "#333", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em", marginBottom: "1rem" }}>
          PALETA — CLIQUE PARA DETALHES
        </div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          {palette.map((p) => (
            <button
              key={p.hex}
              onClick={() => setSelHex(selHex === p.hex ? null : p.hex)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.3rem",
                padding: "0.4rem",
                borderRadius: "8px",
                border: `2px solid ${selHex === p.hex ? "var(--accent)" : "transparent"}`,
                background: "none",
                cursor: "pointer",
              }}
              aria-pressed={selHex === p.hex}
              aria-label={`${p.name}: ${p.hex}`}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: p.hex,
                  border: p.hex === "#121212" || p.hex === "#181818" ? "1px solid #333" : "none",
                }}
              />
              <span style={{ color: "#333", fontFamily: "var(--font-mono)", fontSize: "0.5rem", textAlign: "center", maxWidth: "44px", lineHeight: 1.2 }}>
                {p.name.split(" ").slice(-1)[0]}
              </span>
            </button>
          ))}
        </div>
        {sel && (
          <div style={{ backgroundColor: "#1e1e1e", borderRadius: "10px", padding: "1rem", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "10px", backgroundColor: sel.hex, flexShrink: 0, border: "1px solid #333" }} />
            <div>
              <div style={{ color: "var(--text)", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.9rem" }}>{sel.name}</div>
              <div style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: "0.75rem" }}>{sel.hex}</div>
              <div style={{ color: "var(--muted)", fontFamily: "var(--font-sans)", fontSize: "0.8rem", marginTop: "0.2rem" }}>{sel.role}</div>
              {sel.contrast !== "—" && (
                <span style={{ display: "inline-block", marginTop: "0.4rem", backgroundColor: "#0f1f14", color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: "0.6rem", padding: "0.2rem 0.5rem", borderRadius: "9999px" }}>
                  {sel.contrast} — {sel.wcag} vs #121212
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Dynamic album palette */}
      <div style={{ backgroundColor: "var(--surface)", border: "1px solid #222", borderRadius: "14px", padding: "1.5rem" }}>
        <div style={{ color: "#333", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em", marginBottom: "1rem" }}>
          PALETA DINÂMICA — ADAPTAÇÃO À ARTE DO ÁLBUM
        </div>
        <div style={{ display: "flex", gap: "0.4rem", marginBottom: "1rem", flexWrap: "wrap" }}>
          {albums.map((a, i) => (
            <button
              key={a.name}
              onClick={() => setAlbumIdx(i)}
              style={{
                padding: "0.3rem 0.75rem",
                borderRadius: "9999px",
                fontSize: "0.72rem",
                fontFamily: "var(--font-mono)",
                backgroundColor: albumIdx === i ? a.accent : "#1e1e1e",
                color: albumIdx === i ? "#000" : "#555",
                border: "none",
                cursor: "pointer",
                fontWeight: albumIdx === i ? 700 : 400,
                transition: "all 0.2s",
              }}
              aria-pressed={albumIdx === i}
            >
              {a.name.split(" ")[0]}
            </button>
          ))}
        </div>
        <div
          style={{
            borderRadius: "12px",
            padding: "1.25rem",
            backgroundColor: album.bg,
            transition: "background-color 0.4s",
          }}
        >
          <div style={{ color: album.sub, fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.14em", marginBottom: "0.35rem" }}>ÁLBUM</div>
          <div style={{ color: album.text, fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: "1.35rem", lineHeight: 1.1 }}>{album.name}</div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "1rem" }}>
            <div style={{ width: "34px", height: "34px", borderRadius: "50%", backgroundColor: album.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#000", fontSize: "0.7rem" }}>▶</span>
            </div>
            <div style={{ flex: 1, height: "3px", borderRadius: "2px", backgroundColor: "rgba(255,255,255,0.12)" }}>
              <div style={{ height: "100%", borderRadius: "2px", backgroundColor: album.accent, width: "38%", transition: "background-color 0.4s" }} />
            </div>
            <span style={{ color: album.sub, fontFamily: "var(--font-mono)", fontSize: "0.65rem" }}>2:14</span>
          </div>
        </div>
        <p style={{ color: "var(--subtle)", fontFamily: "var(--font-sans)", fontSize: "0.78rem", marginTop: "0.6rem" }}>
          O Spotify extrai a cor dominante da arte e reconstrói o gradiente mantendo contraste mínimo de 4,5:1 para texto branco.
        </p>
      </div>

      {/* WCAG Checker */}
      <div style={{ backgroundColor: "var(--surface)", border: "1px solid #222", borderRadius: "14px", padding: "1.5rem" }}>
        <div style={{ color: "#333", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em", marginBottom: "1rem" }}>
          VERIFICADOR DE CONTRASTE WCAG
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
          {[{ label: "TEXTO", val: fg, set: setFg }, { label: "FUNDO", val: bg, set: setBg }].map(({ label, val, set }) => (
            <div key={label}>
              <div style={{ color: "#333", fontFamily: "var(--font-mono)", fontSize: "0.58rem", marginBottom: "0.4rem" }}>{label}</div>
              <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                <input type="color" value={val} onChange={(e) => set(e.target.value)}
                  style={{ width: "32px", height: "32px", borderRadius: "6px", border: "none", cursor: "pointer", backgroundColor: "transparent" }}
                  aria-label={`Cor de ${label.toLowerCase()}`}
                />
                <input type="text" value={val.toUpperCase()}
                  onChange={(e) => { if (/^#[0-9A-Fa-f]{0,6}$/.test(e.target.value)) set(e.target.value); }}
                  style={{ flex: 1, backgroundColor: "#1e1e1e", border: "1px solid #2a2a2a", color: "var(--text)", fontFamily: "var(--font-mono)", fontSize: "0.78rem", padding: "0.3rem 0.5rem", borderRadius: "6px" }}
                  aria-label={`Valor hex de ${label.toLowerCase()}`}
                />
              </div>
            </div>
          ))}
        </div>
        {fg.length === 7 && bg.length === 7 && (
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", borderRadius: "10px", backgroundColor: bg }}>
            <div style={{ flex: 1 }}>
              <div style={{ color: fg, fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.1rem" }}>Texto de Exemplo</div>
              <div style={{ color: fg, fontFamily: "var(--font-sans)", fontSize: "0.82rem", opacity: 0.8 }}>Corpo e metadados</div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ color: fg, fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "1.5rem" }}>{cr(fg, bg)}</div>
              {wcag && <div style={{ color: wcag.c, fontFamily: "var(--font-mono)", fontSize: "0.65rem", fontWeight: 700 }}>{wcag.l}</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
