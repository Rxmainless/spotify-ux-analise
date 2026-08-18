import { useState } from "react";

const a11yItems = [
  { label: "Contraste mínimo 4,5:1 em texto", pass: true },
  { label: "Rótulos em todos os controles", pass: true },
  { label: "Navegação por teclado completa (desktop)", pass: true },
  { label: "Suporte a VoiceOver e TalkBack", pass: true },
  { label: "Modo alto contraste (Windows)", pass: false, note: "Interface perde legibilidade — gradientes quebram" },
  { label: "Closed captions em vídeos de podcast", pass: false, note: "Ausente na maioria dos episódios" },
  { label: "Resize de fonte até 200% sem perda funcional", pass: false, note: "Player colapsa em ≥175% no iOS" },
];

const logos = [
  { year: "2008", desc: "Círculo verde com ondas horizontais, tipografia arredondada" },
  { year: "2013", desc: "Ondas curvadas — icônicas até hoje. Fundo escuro introduzido" },
  { year: "2015", desc: "Verde #1DB954, tipografia sem serifa mais neutra" },
  { year: "2019", desc: "Simplificação total. Remoção do contorno, ícone flat" },
  { year: "2024", desc: "Verde #1ED760, símbolo mais suave. Spotify Mix type estreia" },
];

type DeleteState = "idle" | "confirm" | "deleted" | "undone";

export default function Ch07Errors() {
  const [deleteState, setDeleteState] = useState<DeleteState>("idle");
  const [showUndo, setShowUndo] = useState(false);

  const handleDelete = () => setDeleteState("confirm");
  const handleConfirm = () => {
    setDeleteState("deleted");
    setShowUndo(true);
    setTimeout(() => { setShowUndo(false); if (deleteState !== "undone") setDeleteState("idle"); }, 4000);
  };
  const handleUndo = () => { setDeleteState("undone"); setShowUndo(false); setTimeout(() => setDeleteState("idle"), 800); };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Slip vs Mistake */}
      <div style={{ backgroundColor: "var(--surface)", border: "1px solid #222", borderRadius: "14px", padding: "1.5rem" }}>
        <div style={{ color: "#333", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em", marginBottom: "1rem" }}>
          SLIP vs MISTAKE — DISTINÇÃO DE NORMAN
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          <div style={{ backgroundColor: "#1e1e1e", borderRadius: "10px", padding: "1rem", borderTop: "2px solid var(--warn)" }}>
            <div style={{ color: "var(--warn)", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>SLIP (DESLIZE)</div>
            <div style={{ color: "var(--text)", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.4rem" }}>Intenção certa, ação errada</div>
            <div style={{ color: "var(--muted)", fontFamily: "var(--font-sans)", fontSize: "0.78rem", lineHeight: 1.5 }}>
              Tocar "shuffle" quando queria "next track" — alvos próximos demais no player mobile.
            </div>
          </div>
          <div style={{ backgroundColor: "#1e1e1e", borderRadius: "10px", padding: "1rem", borderTop: "2px solid var(--danger)" }}>
            <div style={{ color: "var(--danger)", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>MISTAKE (ERRO)</div>
            <div style={{ color: "var(--text)", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.4rem" }}>Intenção errada, bem executada</div>
            <div style={{ color: "var(--muted)", fontFamily: "var(--font-sans)", fontSize: "0.78rem", lineHeight: 1.5 }}>
              Cancelar assinatura Premium pensando que seria downgrade — fluxo não diferencia claramente os dois.
            </div>
          </div>
        </div>
      </div>

      {/* Delete + undo demo */}
      <div style={{ backgroundColor: "var(--surface)", border: "1px solid #222", borderRadius: "14px", padding: "1.5rem" }}>
        <div style={{ color: "#333", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em", marginBottom: "1rem" }}>
          PADRÃO CONFIRMAR + DESFAZER — INTERATIVO
        </div>
        <div style={{ backgroundColor: "#1e1e1e", borderRadius: "10px", padding: "1rem", marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "6px", backgroundColor: "#2a2a2a", flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ color: deleteState === "deleted" ? "#444" : "var(--text)", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.88rem", textDecoration: deleteState === "deleted" ? "line-through" : "none", transition: "all 0.3s" }}>
                Minha Playlist Top 2024
              </div>
              <div style={{ color: "var(--label)", fontFamily: "var(--font-sans)", fontSize: "0.72rem" }}>42 músicas</div>
            </div>
            {deleteState === "idle" || deleteState === "undone" ? (
              <button onClick={handleDelete}
                style={{ padding: "0.35rem 0.75rem", backgroundColor: "transparent", border: "1px solid #3a3a3a", color: "var(--danger)", fontFamily: "var(--font-sans)", fontSize: "0.75rem", borderRadius: "6px", cursor: "pointer" }}>
                Remover
              </button>
            ) : deleteState === "confirm" ? (
              <div style={{ display: "flex", gap: "0.4rem" }}>
                <button onClick={() => setDeleteState("idle")}
                  style={{ padding: "0.35rem 0.65rem", backgroundColor: "transparent", border: "1px solid #2a2a2a", color: "var(--muted)", fontFamily: "var(--font-sans)", fontSize: "0.72rem", borderRadius: "6px", cursor: "pointer" }}>
                  Cancelar
                </button>
                <button onClick={handleConfirm}
                  style={{ padding: "0.35rem 0.65rem", backgroundColor: "var(--danger)", border: "none", color: "#fff", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.72rem", borderRadius: "6px", cursor: "pointer" }}>
                  Confirmar remoção
                </button>
              </div>
            ) : null}
          </div>
        </div>
        {showUndo && (
          <div style={{ backgroundColor: "#1e1e1e", borderRadius: "8px", padding: "0.65rem 0.85rem", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #2a2a2a" }}>
            <span style={{ color: "var(--muted)", fontFamily: "var(--font-sans)", fontSize: "0.82rem" }}>Playlist removida</span>
            <button onClick={handleUndo}
              style={{ color: "var(--accent)", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.82rem", background: "none", border: "none", cursor: "pointer" }}>
              DESFAZER
            </button>
          </div>
        )}
        {deleteState === "undone" && (
          <div style={{ backgroundColor: "#0f1f14", borderRadius: "8px", padding: "0.65rem 0.85rem", border: "1px solid #1a3a22" }}>
            <span style={{ color: "var(--accent)", fontFamily: "var(--font-sans)", fontSize: "0.82rem" }}>Playlist restaurada com sucesso.</span>
          </div>
        )}
      </div>

      {/* A11y checklist */}
      <div style={{ backgroundColor: "var(--surface)", border: "1px solid #222", borderRadius: "14px", padding: "1.5rem" }}>
        <div style={{ color: "#333", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em", marginBottom: "1rem" }}>
          ACESSIBILIDADE — CHECKLIST DE CONFORMIDADE
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          {a11yItems.map((item) => (
            <div key={item.label} style={{ backgroundColor: "#1e1e1e", borderRadius: "8px", padding: "0.6rem 0.75rem", display: "flex", gap: "0.65rem", alignItems: "flex-start" }}>
              <span style={{ color: item.pass ? "var(--accent)" : "var(--danger)", fontFamily: "var(--font-mono)", fontSize: "0.75rem", flexShrink: 0, marginTop: "0.05rem" }}>{item.pass ? "✓" : "✗"}</span>
              <div>
                <div style={{ color: item.pass ? "var(--muted)" : "var(--text)", fontFamily: "var(--font-sans)", fontSize: "0.82rem" }}>{item.label}</div>
                {item.note && <div style={{ color: "var(--danger)", fontFamily: "var(--font-sans)", fontSize: "0.72rem", marginTop: "0.1rem" }}>{item.note}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logo timeline */}
      <div style={{ backgroundColor: "var(--surface)", border: "1px solid #222", borderRadius: "14px", padding: "1.5rem" }}>
        <div style={{ color: "#333", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em", marginBottom: "1rem" }}>
          EVOLUÇÃO DO LOGOTIPO — 2008 → 2024
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: "20px", top: "12px", bottom: "12px", width: "1px", backgroundColor: "#222" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {logos.map((l, i) => (
              <div key={l.year} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: i === logos.length - 1 ? "#0f1f14" : "#1e1e1e", border: `2px solid ${i === logos.length - 1 ? "var(--accent)" : "#2a2a2a"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 1 }}>
                  <span style={{ color: i === logos.length - 1 ? "var(--accent)" : "#2e2e2e", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.55rem" }}>{l.year}</span>
                </div>
                <div style={{ flex: 1, paddingTop: "0.6rem" }}>
                  <div style={{ color: "var(--muted)", fontFamily: "var(--font-sans)", fontSize: "0.8rem", lineHeight: 1.4 }}>{l.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
