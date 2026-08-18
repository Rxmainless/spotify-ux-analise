interface GenericDemoProps {
  demoType: string;
  chapterId: number;
}

export default function GenericDemo({ demoType, chapterId }: GenericDemoProps) {
  const demos: Record<string, { icon: string; content: string; items: string[] }> = {
    visual: {
      icon: "⊞",
      content: "Sistema de grid com espaçamento de 8px",
      items: ["Cards 160×160px com cantos arredondados (4–8px)", "Padding interno: 16px", "Gap entre elementos: 8–16px", "Alinhamento à esquerda para hierarquia de leitura", "Imagens de capa com aspect-ratio 1:1"],
    },
    design: {
      icon: "⬡",
      content: "Arquitetura visual coerente",
      items: ["Forma segue função — decoração com propósito", "Ícones 24px base, alinhados ao grid", "Sombras suaves em superfícies elevadas", "Border-radius consistente por nível de componente", "Composição direciona atenção para o conteúdo"],
    },
    flexibility: {
      icon: "⌨",
      content: "Múltiplos modos de interação",
      items: ["Space: play/pause", "Ctrl+F: abrir busca", "← →: faixa anterior/próxima", "Ctrl+↑↓: volume", "Swipe horizontal em mobile para trocar faixa", "Qualquer função acessível por mouse, teclado e toque"],
    },
    visibility: {
      icon: "◎",
      content: "Comunicação de estado e progresso",
      items: ["Barra de reprodução persistente — sempre visível", "Skeleton screen durante carregamento", "Ícone de coração muda estado imediatamente (feedback)", "Badge 'Novo' em lançamentos recentes", "Estado vazio com instrução clara de próxima ação"],
    },
    interface: {
      icon: "✦",
      content: "União entre UI e UX",
      items: ["Hover em card revela botão play (200ms)", "Animação de progresso de download sincronizada", "Transição suave entre páginas (300ms)", "Feedback tátil em mobile (vibração leve em ações)", "Estados de loading nunca bloqueiam a interação"],
    },
    critique: {
      icon: "◈",
      content: "Síntese crítica estruturada",
      items: ["✓ Consistência visual excelente em todo o produto", "✓ Paleta funcional com alto contraste", "✓ Microinterações bem calibradas e com propósito", "⚠ Descoberta de funções avançadas limitada para novos usuários", "⚠ Estado offline não comunica claramente o que está disponível", "→ Recomendação: onboarding progressivo + tooltips contextuais"],
    },
    intro: {
      icon: "◇",
      content: "Sobre esta análise",
      items: ["Metodologia: observação → evidência → impacto → recomendação", "14 capítulos cobrindo critérios da atividade acadêmica", "Demonstrações interativas por capítulo", "Análise baseada em princípios de usabilidade (Nielsen, Norman)", "Aplicação construída com os mesmos princípios que analisa"],
    },
  };

  const demo = demos[demoType] || demos["intro"];

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl" style={{ backgroundColor: "#181818", border: "1px solid #333" }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ backgroundColor: "#1a3d2b", color: "#1DB954" }}>
            {demo.icon}
          </div>
          <div style={{ color: "#B3B3B3", fontSize: "0.75rem", fontFamily: "var(--font-mono)" }}>
            CAPÍTULO {String(chapterId).padStart(2, "0")} — {demo.content.toUpperCase()}
          </div>
        </div>
        <ul className="space-y-2">
          {demo.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span style={{ color: "#1DB954", fontFamily: "var(--font-mono)", fontSize: "0.65rem", flexShrink: 0, marginTop: "2px" }}>
                {item.startsWith("✓") || item.startsWith("⚠") || item.startsWith("→") ? "" : "·"}
              </span>
              <span style={{ fontSize: "0.8rem", color: "#B3B3B3", fontFamily: "var(--font-body)" }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
