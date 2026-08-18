import { useState } from "react";

const categories = [
  { label: "Cobranças indevidas", pct: 38, n: 1324 },
  { label: "Cancelamento", pct: 22, n: 767 },
  { label: "Conta bloqueada", pct: 17, n: 592 },
  { label: "App com erros", pct: 13, n: 453 },
  { label: "Atendimento", pct: 10, n: 348 },
];

type StatusState = "premium" | "pending" | "ad";
const statusLabels: Record<StatusState, string> = {
  premium: "Premium Ativo",
  pending: "Ativação Pendente",
  ad: "Por que apareceu um anúncio?",
};
const statusDetails: Record<StatusState, { title: string; body: string; cta: string; color: string }> = {
  premium: {
    title: "Tudo certo com sua conta",
    body: "Assinatura Premium Individual · Renova em 15/09/2026 · R$ 21,90/mês · Sem propagandas, downloads ilimitados.",
    cta: "Gerenciar assinatura",
    color: "var(--accent)",
  },
  pending: {
    title: "Ativação em andamento",
    body: "Identificamos seu pagamento. A ativação pode levar até 24h. Se após esse prazo sua conta ainda não estiver ativa, acesse o suporte com o comprovante em mãos.",
    cta: "Verificar status do pagamento",
    color: "var(--warn)",
  },
  ad: {
    title: "Anúncio no plano gratuito",
    body: "Sua assinatura Premium expirou em 03/08/2026. O plano gratuito inclui anúncios a cada ≈ 30 minutos. Renove para remover os anúncios.",
    cta: "Renovar Premium",
    color: "var(--danger)",
  },
};

export default function Ch08Visibility() {
  const [status, setStatus] = useState<StatusState>("premium");
  const detail = statusDetails[status];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Reclame Aqui metrics */}
      <div style={{ backgroundColor: "var(--surface)", border: "1px solid #222", borderRadius: "14px", padding: "1.5rem" }}>
        <div style={{ color: "#333", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em", marginBottom: "1rem" }}>
          RECLAME AQUI — JAN–JUN 2026
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem", marginBottom: "1.25rem" }}>
          {[
            { v: "3.484", l: "Reclamações", c: "var(--text)" },
            { v: "95,7%", l: "Respondidas", c: "var(--accent)" },
            { v: "61,9%", l: "Resolvidas", c: "var(--warn)" },
          ].map((m) => (
            <div key={m.l} style={{ backgroundColor: "#1e1e1e", borderRadius: "10px", padding: "0.85rem 0.75rem", textAlign: "center" }}>
              <div style={{ color: m.c, fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "1.4rem", lineHeight: 1 }}>{m.v}</div>
              <div style={{ color: "#2e2e2e", fontFamily: "var(--font-sans)", fontSize: "0.68rem", marginTop: "0.25rem" }}>{m.l}</div>
            </div>
          ))}
        </div>
        <div style={{ backgroundColor: "#1e1e1e", borderRadius: "10px", padding: "0.85rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <div style={{ textAlign: "center", flexShrink: 0 }}>
            <div style={{ color: "var(--warn)", fontFamily: "var(--font-mono)", fontWeight: 800, fontSize: "2rem", lineHeight: 1 }}>5,7</div>
            <div style={{ color: "#2e2e2e", fontFamily: "var(--font-sans)", fontSize: "0.58rem" }}>/10</div>
          </div>
          <div>
            <div style={{ color: "var(--text)", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.85rem" }}>Nota de reputação</div>
            <div style={{ color: "var(--muted)", fontFamily: "var(--font-sans)", fontSize: "0.77rem", marginTop: "0.2rem", lineHeight: 1.4 }}>
              Abaixo de 6,0 = "Regular". 38% das reclamações envolvem cobranças indevidas — problema recorrente há 3 anos seguidos.
            </div>
          </div>
        </div>

        {/* Bar chart */}
        <div style={{ color: "#333", fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>CATEGORIAS</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
          {categories.map((c) => (
            <div key={c.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ width: "120px", flexShrink: 0, color: "var(--muted)", fontFamily: "var(--font-sans)", fontSize: "0.75rem", textAlign: "right" }}>{c.label}</div>
              <div style={{ flex: 1, height: "18px", backgroundColor: "#1e1e1e", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${c.pct}%`, backgroundColor: c.pct >= 30 ? "var(--danger)" : c.pct >= 15 ? "var(--warn)" : "var(--accent)", borderRadius: "4px", display: "flex", alignItems: "center", paddingLeft: "0.4rem", transition: "width 0.5s ease" }}>
                  <span style={{ color: "#000", fontFamily: "var(--font-mono)", fontSize: "0.6rem", fontWeight: 700 }}>{c.pct}%</span>
                </div>
              </div>
              <div style={{ width: "40px", flexShrink: 0, color: "#333", fontFamily: "var(--font-mono)", fontSize: "0.6rem" }}>{c.n}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Spotify Status prototype */}
      <div style={{ backgroundColor: "var(--surface)", border: "1px solid #222", borderRadius: "14px", padding: "1.5rem" }}>
        <div style={{ color: "#333", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em", marginBottom: "1rem" }}>
          SPOTIFY STATUS — PROTÓTIPO DE SOLUÇÃO · 3 ESTADOS
        </div>
        <div style={{ display: "flex", gap: "0.4rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
          {(Object.keys(statusLabels) as StatusState[]).map((k) => (
            <button key={k} onClick={() => setStatus(k)}
              style={{ padding: "0.3rem 0.75rem", borderRadius: "9999px", fontSize: "0.68rem", fontFamily: "var(--font-mono)", backgroundColor: status === k ? statusDetails[k].color : "#1e1e1e", color: status === k ? "#000" : "#555", border: "none", cursor: "pointer", fontWeight: status === k ? 700 : 400, transition: "all 0.2s" }}
              aria-pressed={status === k}
            >
              {statusLabels[k]}
            </button>
          ))}
        </div>
        <div style={{ backgroundColor: "#0d0d0d", borderRadius: "12px", padding: "1.25rem", border: `1px solid ${detail.color}33` }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: detail.color, flexShrink: 0 }} />
            <span style={{ color: detail.color, fontFamily: "var(--font-mono)", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.08em" }}>{statusLabels[status].toUpperCase()}</span>
          </div>
          <div style={{ color: "var(--text)", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1rem", marginBottom: "0.5rem" }}>{detail.title}</div>
          <div style={{ color: "var(--muted)", fontFamily: "var(--font-sans)", fontSize: "0.82rem", lineHeight: 1.6, marginBottom: "1rem" }}>{detail.body}</div>
          <button style={{ padding: "0.55rem 1.1rem", backgroundColor: detail.color, border: "none", color: detail.color === "var(--accent)" || detail.color === "var(--warn)" ? "#000" : "#fff", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.82rem", borderRadius: "9999px", cursor: "pointer" }}>
            {detail.cta}
          </button>
        </div>
        <p style={{ color: "var(--subtle)", fontFamily: "var(--font-sans)", fontSize: "0.78rem", marginTop: "0.75rem" }}>
          Proposta de funcionalidade: uma tela de status de conta que responde às 3 perguntas mais frequentes no Reclame Aqui — sem exigir contato com suporte.
        </p>
      </div>
    </div>
  );
}
