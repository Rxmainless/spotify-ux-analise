import { useState } from "react";

const strengths = [
  "Hierarquia tipográfica clara e consistente entre plataformas",
  "Paleta dinâmica adapta-se à arte com contraste preservado",
  "Múltiplos caminhos para a mesma função (busca, voz, teclado)",
  "Confirmação antes de ações destrutivas + undo imediato",
  "Design system robusto — tokens compartilhados entre apps",
];

const gaps = [
  "Cobranças indevidas: 38% das reclamações (Reclame Aqui, 2026)",
  "Ausência de tela de status de conta — usuário recorre ao suporte",
  "Player mobile com alvos tácteis próximos demais (slip errors)",
  "Closed captions ausentes na maioria dos episódios de podcast",
  "Spotify Mix: somente no app, não documentado publicamente",
];

const recs = [
  {
    id: "P1",
    title: "Spotify Status",
    priority: "Alta",
    effort: "Médio",
    body: "Criar tela de status de conta que responde proativamente às 3 perguntas mais frequentes: cobrança em análise, ativação pendente, retorno ao plano gratuito. Elimina a necessidade de contato com suporte para a maioria dos casos de billing. Estimativa de redução: 30–40% das reclamações de cobrança.",
    color: "var(--accent)",
  },
  {
    id: "P2",
    title: "Transparência de cobrança",
    priority: "Alta",
    effort: "Baixo",
    body: "Adicionar notificação 7 dias antes de qualquer cobrança com detalhamento do valor, data de renovação e link para cancelar. Tornada obrigatória por PROCON-SP em 2025 para serviços de assinatura. Reduz contestações e aumenta confiança no produto.",
    color: "var(--warn)",
  },
  {
    id: "P3",
    title: "Consistência tipográfica",
    priority: "Média",
    effort: "Alto",
    body: "Spotify Mix está disponível apenas na app nativa — web player e embed ainda usam Circular. Unificar a fonte em todas as superfícies completa a identidade visual V2 e elimina a dissonância perceptível quando o usuário transita entre plataformas.",
    color: "var(--muted)",
  },
];

export default function Ch09Synthesis() {
  const [open, setOpen] = useState<string | null>("P1");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Strengths + Gaps */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
        <div style={{ backgroundColor: "var(--surface)", border: "1px solid #222", borderRadius: "14px", padding: "1.25rem" }}>
          <div style={{ color: "#333", fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.12em", marginBottom: "0.85rem" }}>
            PONTOS FORTES
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {strengths.map((s) => (
              <div key={s} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                <span style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: "0.7rem", flexShrink: 0, marginTop: "0.05rem" }}>+</span>
                <span style={{ color: "var(--muted)", fontFamily: "var(--font-sans)", fontSize: "0.78rem", lineHeight: 1.45 }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ backgroundColor: "var(--surface)", border: "1px solid #222", borderRadius: "14px", padding: "1.25rem" }}>
          <div style={{ color: "#333", fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.12em", marginBottom: "0.85rem" }}>
            LACUNAS
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {gaps.map((g) => (
              <div key={g} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                <span style={{ color: "var(--danger)", fontFamily: "var(--font-mono)", fontSize: "0.7rem", flexShrink: 0, marginTop: "0.05rem" }}>−</span>
                <span style={{ color: "var(--muted)", fontFamily: "var(--font-sans)", fontSize: "0.78rem", lineHeight: 1.45 }}>{g}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations accordion */}
      <div style={{ backgroundColor: "var(--surface)", border: "1px solid #222", borderRadius: "14px", padding: "1.5rem" }}>
        <div style={{ color: "#333", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em", marginBottom: "1rem" }}>
          3 RECOMENDAÇÕES — CLIQUE PARA EXPANDIR
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {recs.map((r) => (
            <div key={r.id} style={{ border: `1px solid ${open === r.id ? r.color + "55" : "#222"}`, borderRadius: "10px", overflow: "hidden", transition: "border-color 0.2s" }}>
              <button onClick={() => setOpen(open === r.id ? null : r.id)}
                style={{ width: "100%", background: "none", border: "none", padding: "0.85rem 1rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.75rem", textAlign: "left" }}
                aria-expanded={open === r.id}
              >
                <span style={{ backgroundColor: r.color + "22", color: r.color, fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.62rem", padding: "0.2rem 0.5rem", borderRadius: "9999px", flexShrink: 0 }}>{r.id}</span>
                <span style={{ color: "var(--text)", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.9rem", flex: 1 }}>{r.title}</span>
                <div style={{ display: "flex", gap: "0.4rem", flexShrink: 0 }}>
                  <span style={{ color: "var(--label)", fontFamily: "var(--font-mono)", fontSize: "0.55rem", backgroundColor: "#1e1e1e", padding: "0.15rem 0.4rem", borderRadius: "4px" }}>↑{r.priority}</span>
                  <span style={{ color: "var(--label)", fontFamily: "var(--font-mono)", fontSize: "0.55rem", backgroundColor: "#1e1e1e", padding: "0.15rem 0.4rem", borderRadius: "4px" }}>⚙{r.effort}</span>
                </div>
                <span style={{ color: "#333", fontFamily: "var(--font-mono)", fontSize: "0.7rem", flexShrink: 0 }}>{open === r.id ? "▲" : "▼"}</span>
              </button>
              {open === r.id && (
                <div style={{ padding: "0 1rem 1rem", color: "var(--muted)", fontFamily: "var(--font-sans)", fontSize: "0.82rem", lineHeight: 1.65, borderTop: "1px solid #1e1e1e", paddingTop: "0.75rem" }}>
                  {r.body}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Closing paragraph */}
      <div style={{ padding: "1.25rem 1.5rem", borderRadius: "12px", borderLeft: "3px solid var(--accent)", backgroundColor: "#0d0d0d" }}>
        <p style={{ color: "var(--muted)", fontFamily: "var(--font-sans)", fontSize: "0.9rem", lineHeight: 1.75, margin: 0 }}>
          O Spotify demonstra que design de plataforma em escala exige um sistema — não apenas boas decisões pontuais. A identidade visual é coesa, a hierarquia é legível e os fluxos principais são eficientes. Os problemas mais críticos não estão na interface em si, mas na <strong style={{ color: "var(--text)" }}>falta de visibilidade sobre o estado do serviço</strong>, especialmente em contextos de cobrança. A distância entre o design de excelência e a experiência percebida pelo usuário é medida, aqui, em 3.484 reclamações.
        </p>
      </div>
    </div>
  );
}
