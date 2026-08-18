import { useState } from "react";

type BP = "desktop" | "tablet" | "mobile";

const breakpoints: { id: BP; label: string; width: string; cols: number; nav: string }[] = [
  { id: "desktop", label: "Desktop ≥1200px", width: "100%", cols: 4, nav: "Sidebar lateral" },
  { id: "tablet", label: "Tablet 768–1199px", width: "75%", cols: 3, nav: "Sidebar reduzida" },
  { id: "mobile", label: "Mobile <480px", width: "45%", cols: 2, nav: "Bottom navigation" },
];

const cards = ["Dark Side", "Abbey Road", "Rumours", "Kind of Blue", "Purple Rain", "Thriller", "Led Zeppelin IV", "Nevermind"];

export default function ResponsiveDemo() {
  const [bp, setBp] = useState<BP>("desktop");
  const current = breakpoints.find((b) => b.id === bp)!;

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {breakpoints.map((b) => (
          <button
            key={b.id}
            onClick={() => setBp(b.id)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
            style={{
              backgroundColor: bp === b.id ? "#1DB954" : "#242424",
              color: bp === b.id ? "#000" : "#B3B3B3",
              fontFamily: "var(--font-mono)",
            }}
            aria-pressed={bp === b.id}
          >
            {b.label}
          </button>
        ))}
      </div>

      <div className="flex justify-center transition-all duration-500">
        <div
          className="rounded-xl overflow-hidden transition-all duration-500"
          style={{ width: current.width, border: "1px solid #333", backgroundColor: "#181818", maxWidth: "100%" }}
        >
          <div
            className="flex items-center gap-2 px-3 py-2 border-b"
            style={{ backgroundColor: "#121212", borderColor: "#333" }}
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#D64545" }} />
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#F59E0B" }} />
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#1DB954" }} />
            <div className="flex-1 mx-2 h-3 rounded" style={{ backgroundColor: "#242424" }} />
          </div>

          <div className="flex" style={{ minHeight: "180px" }}>
            {bp !== "mobile" && (
              <div className="border-r flex-shrink-0" style={{ width: bp === "desktop" ? "80px" : "50px", borderColor: "#333", backgroundColor: "#121212", padding: "8px 6px" }}>
                <div className="space-y-2">
                  {["⌂", "♫", "♡", "+"].map((icon, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span style={{ color: i === 0 ? "#1DB954" : "#555", fontSize: bp === "desktop" ? "0.8rem" : "0.9rem" }}>{icon}</span>
                      {bp === "desktop" && <span style={{ color: "#555", fontSize: "0.6rem", fontFamily: "var(--font-body)" }}>{["Início", "Buscar", "Salvos", "Novo"][i]}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex-1 p-3">
              <div
                className="grid gap-2 transition-all duration-500"
                style={{ gridTemplateColumns: `repeat(${current.cols}, 1fr)` }}
              >
                {cards.slice(0, current.cols * 2).map((card, i) => (
                  <div key={i} className="rounded-lg overflow-hidden" style={{ backgroundColor: "#242424" }}>
                    <div className="aspect-square" style={{ backgroundColor: `hsl(${i * 47 + 120}, 30%, 20%)` }} />
                    <div className="p-1.5">
                      <div style={{ fontSize: "0.6rem", fontWeight: 600, color: "#FFFFFF", fontFamily: "var(--font-sans)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {card}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {bp === "mobile" && (
            <div className="flex justify-around items-center py-2 border-t" style={{ borderColor: "#333", backgroundColor: "#121212" }}>
              {["⌂", "♫", "♡"].map((icon, i) => (
                <div key={i} className="flex flex-col items-center gap-0.5">
                  <span style={{ color: i === 0 ? "#1DB954" : "#555", fontSize: "0.9rem" }}>{icon}</span>
                  <span style={{ color: i === 0 ? "#1DB954" : "#555", fontSize: "0.45rem", fontFamily: "var(--font-body)" }}>
                    {["Início", "Buscar", "Salvos"][i]}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-3 rounded-lg text-xs" style={{ backgroundColor: "#1a1a1a", borderLeft: "2px solid #1DB954" }}>
        <span style={{ color: "#FFFFFF", fontFamily: "var(--font-sans)", fontWeight: 600 }}>{current.nav}</span>
        <span style={{ color: "#B3B3B3", fontFamily: "var(--font-body)" }}> — Grid de {current.cols} colunas. Adaptação de arquitetura, não apenas redimensionamento.</span>
      </div>
    </div>
  );
}
