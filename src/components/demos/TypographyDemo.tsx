const scale = [
  { label: "Display / H1", size: "2.5rem", weight: "800", color: "#FFFFFF", usage: "Títulos de álbum em destaque" },
  { label: "H2", size: "1.75rem", weight: "700", color: "#FFFFFF", usage: "Nomes de artistas e seções" },
  { label: "H3", size: "1.25rem", weight: "700", color: "#FFFFFF", usage: "Subtítulos e grupos" },
  { label: "Body Large", size: "1rem", weight: "500", color: "#FFFFFF", usage: "Texto de interface e listas" },
  { label: "Body", size: "0.875rem", weight: "400", color: "#B3B3B3", usage: "Metadados e descrições" },
  { label: "Caption", size: "0.75rem", weight: "400", color: "#B3B3B3", usage: "Labels, durações, contagens" },
  { label: "Mono / Label", size: "0.65rem", weight: "500", color: "#1DB954", usage: "Status, badges, tokens" },
];

export default function TypographyDemo() {
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl" style={{ backgroundColor: "#181818", border: "1px solid #333" }}>
        <div style={{ color: "#B3B3B3", fontSize: "0.7rem", fontFamily: "var(--font-mono)", marginBottom: "1rem" }}>
          ESCALA TIPOGRÁFICA
        </div>
        <div className="space-y-4">
          {scale.map((item) => (
            <div key={item.label} className="flex items-baseline gap-4 group">
              <div className="w-24 flex-shrink-0">
                <div style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", color: "#555" }}>{item.label}</div>
                <div style={{ fontSize: "0.55rem", fontFamily: "var(--font-mono)", color: "#444" }}>{item.size} / {item.weight}</div>
              </div>
              <div
                className="flex-1 truncate leading-tight"
                style={{
                  fontSize: item.size,
                  fontWeight: item.weight,
                  fontFamily: item.label.includes("Mono") ? "var(--font-mono)" : "var(--font-sans)",
                  color: item.color,
                  lineHeight: 1.2,
                }}
              >
                {item.label.includes("Mono") ? "TOCANDO AGORA • AO VIVO" : "Música do Spotify"}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-xl" style={{ backgroundColor: "#181818", border: "1px solid #333" }}>
        <div style={{ color: "#B3B3B3", fontSize: "0.7rem", fontFamily: "var(--font-mono)", marginBottom: "1rem" }}>
          HIERARQUIA EM CONTEXTO
        </div>
        <div className="p-3 rounded-lg" style={{ backgroundColor: "#121212" }}>
          <div style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", color: "#1DB954", letterSpacing: "0.1em", marginBottom: "0.25rem" }}>
            ÁLBUM • 2024
          </div>
          <div style={{ fontSize: "1.75rem", fontWeight: 800, fontFamily: "var(--font-sans)", color: "#FFFFFF", lineHeight: 1.1 }}>
            Dark Side of the Moon
          </div>
          <div style={{ fontSize: "1rem", fontWeight: 500, fontFamily: "var(--font-sans)", color: "#B3B3B3", marginTop: "0.25rem" }}>
            Pink Floyd
          </div>
          <div style={{ fontSize: "0.75rem", fontFamily: "var(--font-body)", color: "#555", marginTop: "0.5rem" }}>
            10 músicas • 43 min • 1973
          </div>
        </div>
        <div style={{ color: "#555", fontSize: "0.7rem", fontFamily: "var(--font-body)", marginTop: "0.5rem" }}>
          Três níveis de hierarquia claros sem usar cor como único diferenciador
        </div>
      </div>
    </div>
  );
}
