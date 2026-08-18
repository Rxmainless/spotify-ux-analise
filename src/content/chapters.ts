export interface Chapter {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  intro: string;
  tags: string[];
  demoType: string;
}

export const chapters: Chapter[] = [
  {
    id: 1,
    slug: "introducao",
    title: "Introdução e Método",
    subtitle: "Por que analisar o Spotify — e como estruturamos essa análise",
    intro:
      "O Spotify é uma das plataformas de streaming mais usadas no mundo. Escolhemos analisá-lo não por ser perfeito, mas porque apresenta decisões de design suficientemente maduras para servirem como referência — e falhas suficientemente concretas para gerar recomendações com fundamento.",
    tags: ["Método", "Escopo", "Evidência"],
    demoType: "intro",
  },
  {
    id: 2,
    slug: "tipografia",
    title: "Tipografia e Identidade Visual",
    subtitle: "Spotify Mix: a fonte que reforça a marca e organiza a informação",
    intro:
      "Em 2024, o Spotify lançou o Spotify Mix com a Dinamo Typefaces — uma fonte variável que combina traços geométricos e humanistas com detalhes que evocam ondas sonoras. A escolha tipográfica carrega hierarquia, identidade e diferenciação de marca.",
    tags: ["Fonte variável", "Hierarquia", "Legibilidade"],
    demoType: "typography",
  },
  {
    id: 3,
    slug: "cores",
    title: "Paleta de Cores e Visibilidade",
    subtitle: "Verde que age, escuro que foca, arte que colore",
    intro:
      "O verde Spotify (#1ED760) é um operador semântico: indica ação confirmada, estado ativo e identidade. O fundo escuro concentra atenção na arte e no conteúdo. A interface adapta dinamicamente a paleta à arte do álbum — sem abrir mão do contraste mínimo.",
    tags: ["#1ED760", "WCAG", "Paleta dinâmica"],
    demoType: "colors",
  },
  {
    id: 4,
    slug: "consistencia",
    title: "Consistência e Padronização",
    subtitle: "O mesmo componente, em todo lugar, com o mesmo comportamento",
    intro:
      "Consistência reduz carga cognitiva: o usuário aprende um padrão uma vez e aplica em qualquer contexto. Tokens compartilhados produzem a mesma linguagem em mobile, desktop, web player e embeds externos.",
    tags: ["Tokens", "Componentes", "Padrões"],
    demoType: "consistency",
  },
  {
    id: 5,
    slug: "fluxo-responsividade",
    title: "Fluxo de Uso e Responsividade",
    subtitle: "Controles sempre visíveis, arquitetura adaptada por contexto",
    intro:
      "Responsividade eficaz não é encolher o desktop — é repensar a estrutura para cada modo de uso. O Spotify mantém controles primários sempre visíveis, responde a interações em menos de 100ms e adapta a arquitetura de navegação (sidebar ↔ bottom tabs) sem perder coerência.",
    tags: ["Breakpoints", "Fluxo", "Touch"],
    demoType: "flow",
  },
  {
    id: 6,
    slug: "flexibilidade",
    title: "Flexibilidade de Uso",
    subtitle: "Iniciantes e especialistas chegam ao mesmo lugar por caminhos diferentes",
    intro:
      "Um produto flexível não força um único caminho. O Spotify oferece busca direta, playlists salvas, recomendações algorítmicas, atalhos de teclado, sincronização entre dispositivos e modo offline — sem tornar nenhum desses caminhos obrigatório.",
    tags: ["Atalhos", "Algoritmo", "Cross-device"],
    demoType: "flexibility",
  },
  {
    id: 7,
    slug: "erros-acessibilidade",
    title: "Prevenção de Erros e Acessibilidade",
    subtitle: "Proteger antes, incluir por padrão",
    intro:
      "Prevenção de erros distingue dois tipos: slip (ação inconsciente, como tocar sem querer em excluir) e mistake (modelo mental errado, como cancelar achando que pausará a cobrança). Acessibilidade começa no token de cor e termina na ordem de tabulação.",
    tags: ["Slip vs Mistake", "WCAG", "Screen reader"],
    demoType: "errors",
  },
  {
    id: 8,
    slug: "visibilidade-critica",
    title: "Visibilidade do Sistema e Análise Crítica",
    subtitle: "Onde o feedback funciona — e onde os dados do Reclame Aqui indicam falha",
    intro:
      "O Spotify entrega feedback excelente na reprodução: barra persistente, fila, dispositivo ativo, estado de download. Mas esse cuidado não chega a estados de conta — cobrança após cancelamento, pagamento sem ativação, anúncio em conta paga. Os dados são públicos e mensuráveis.",
    tags: ["Feedback", "Reclame Aqui", "Conta"],
    demoType: "visibility",
  },
  {
    id: 9,
    slug: "sintese",
    title: "Síntese e Recomendações",
    subtitle: "O que observamos, o que fundamenta, o que recomendamos",
    intro:
      "O Spotify é um produto de design de alta qualidade com lacunas específicas e mensuráveis. A análise converge em três recomendações priorizadas, cada uma conectada às evidências dos capítulos anteriores.",
    tags: ["Recomendações", "Prioridade", "Síntese"],
    demoType: "synthesis",
  },
];
