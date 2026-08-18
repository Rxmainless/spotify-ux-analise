import { useState } from "react";

const paths = [
  { label: "Busca direta", steps: 2, icon: "⌕", desc: "Digitar → tocar. O caminho mais curto do sistema." },
  { label: "Explorar artista", steps: 4, icon: "◎", desc: "Home → Artista → Discografia → Faixa." },
  { label: "Pelo Radio", steps: 3, icon: "◉", desc: "Faixa → Menu → Rádio da faixa → ouvir." },
  { label: "Playlist colaborativa", steps: 5, icon: "⬡", desc: "Criar lista → Convidar → Adicionar juntos." },
  { label: "Teclado (desktop)", steps: 1, icon: "⌨", desc: "Ctrl+K, digitar nome, Enter — sem usar o mouse." },
  { label: "Assistente de voz", steps: 1, icon: "◈", desc: "'Ok Google, tocar Pink Floyd no Spotify.' Um comando, zero cliques." },
];

const shortcuts = [
  { keys: "Espaço", action: "Play / Pausa" },
  { keys: "Ctrl + →", action: "Próxima faixa" },
  { keys: "Ctrl + ←", action: "Faixa anterior" },
  { keys: "Ctrl + ↑/↓", action: "Volume" },
  { keys: "Ctrl + K", action: "Busca rápida" },
  { keys: "Ctrl + L", action: "Favoritar" },
  { keys: "Ctrl + R", action: "Repetir" },
  { keys: "Ctrl + S", action: "Embaralhar" },
];

const recAlgos = [
  { label: "Discover Weekly", freq: "Semanal", base: "Histórico + comportamento de usuários similares" },
  { label: "Daily Mix", freq: "Diário", base: "Clusters de gênero do seu perfil" },
  { label: "Release Radar", freq: "Sexta", base: "Artistas seguidos + favoritos recentes" },
  { label: "Blend", freq: "Contínuo", base: "Intersecção entre dois perfis" },
];

export default function Ch06Flexibility() {
  const [sel, setSel] = useState<number | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Paths */}
      <div style={{ backgroundColor: "var(--surface)", border: "1px solid #222", borderRadius: "14px", padding: "1.5rem" }}>
        <div style={{ color: "#333", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em", marginBottom: "1rem" }}>
          6 CAMINHOS PARA A MESMA FAIXA — CLIQUE PARA DETALHES
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
          {paths.map((p, i) => (
            <button key={p.label} onClick={() => setSel(sel === i ? null : i)}
              style={{ background: "none", border: `1px solid ${sel === i ? "var(--accent)" : "#222"}`, borderRadius: "10px", padding: "0.85rem", cursor: "pointer", textAlign: "left", transition: "border-color 0.15s" }}
              aria-expanded={sel === i}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                <span style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: "1rem", flexShrink: 0 }}>{p.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "var(--text)", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.85rem" }}>{p.label}</div>
                  <div style={{ display: "flex", gap: "0.2rem", marginTop: "0.3rem" }}>
                    {Array.from({ length: p.steps }).map((_, j) => (
                      <div key={j} style={{ width: "16px", height: "4px", borderRadius: "2px", backgroundColor: "var(--accent)" }} />
                    ))}
                    {Array.from({ length: Math.max(0, 5 - p.steps) }).map((_, j) => (
                      <div key={j} style={{ width: "16px", height: "4px", borderRadius: "2px", backgroundColor: "#2a2a2a" }} />
                    ))}
                  </div>
                  <div style={{ color: "var(--label)", fontFamily: "var(--font-mono)", fontSize: "0.52rem", marginTop: "0.2rem" }}>{p.steps} ETAPA{p.steps > 1 ? "S" : ""}</div>
                </div>
              </div>
              {sel === i && (
                <div style={{ color: "var(--muted)", fontFamily: "var(--font-sans)", fontSize: "0.8rem", marginTop: "0.5rem", lineHeight: 1.5, borderTop: "1px solid #222", paddingTop: "0.5rem" }}>
                  {p.desc}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Shortcuts */}
      <div style={{ backgroundColor: "var(--surface)", border: "1px solid #222", borderRadius: "14px", padding: "1.5rem" }}>
        <div style={{ color: "#333", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em", marginBottom: "1rem" }}>
          ATALHOS DE TECLADO — USUÁRIOS EXPERIENTES
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem" }}>
          {shortcuts.map((s) => (
            <div key={s.keys} style={{ display: "flex", alignItems: "center", gap: "0.5rem", backgroundColor: "#1e1e1e", borderRadius: "6px", padding: "0.45rem 0.6rem" }}>
              <code style={{ backgroundColor: "#2a2a2a", color: "var(--text)", fontFamily: "var(--font-mono)", fontSize: "0.62rem", padding: "0.15rem 0.4rem", borderRadius: "4px", flexShrink: 0, whiteSpace: "nowrap" }}>{s.keys}</code>
              <span style={{ color: "var(--muted)", fontFamily: "var(--font-sans)", fontSize: "0.75rem" }}>{s.action}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Rec algorithms */}
      <div style={{ backgroundColor: "var(--surface)", border: "1px solid #222", borderRadius: "14px", padding: "1.5rem" }}>
        <div style={{ color: "#333", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em", marginBottom: "1rem" }}>
          RECOMENDAÇÃO ALGORÍTMICA — 4 FORMATOS
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {recAlgos.map((r) => (
            <div key={r.label} style={{ backgroundColor: "#1e1e1e", borderRadius: "8px", padding: "0.65rem 0.85rem", display: "flex", gap: "1rem", alignItems: "center" }}>
              <div style={{ flex: "0 0 auto" }}>
                <div style={{ color: "var(--text)", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.85rem" }}>{r.label}</div>
                <div style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: "0.55rem", marginTop: "0.1rem" }}>{r.freq}</div>
              </div>
              <div style={{ flex: 1, color: "var(--subtle)", fontFamily: "var(--font-sans)", fontSize: "0.77rem", borderLeft: "1px solid #2a2a2a", paddingLeft: "0.85rem" }}>
                {r.base}
              </div>
            </div>
          ))}
        </div>
        <p style={{ color: "var(--subtle)", fontFamily: "var(--font-sans)", fontSize: "0.78rem", marginTop: "0.75rem" }}>
          O sistema infere o que o usuário quer antes de precisar pedir. Cada formato serve um grau diferente de intenção.
        </p>
      </div>
    </div>
  );
}
