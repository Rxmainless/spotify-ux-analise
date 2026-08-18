import { useState } from "react";

const tracks = [
  { title: "Bohemian Rhapsody", artist: "Queen", duration: "5:55", liked: false },
  { title: "Hotel California", artist: "Eagles", duration: "6:31", liked: true },
  { title: "Stairway to Heaven", artist: "Led Zeppelin", duration: "8:02", liked: false },
];

export default function ConsistencyDemo() {
  const [liked, setLiked] = useState<boolean[]>(tracks.map((t) => t.liked));
  const [playing, setPlaying] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl" style={{ backgroundColor: "#181818", border: "1px solid #333" }}>
        <div style={{ color: "#B3B3B3", fontSize: "0.7rem", fontFamily: "var(--font-mono)", marginBottom: "1rem" }}>
          COMPONENTES REUTILIZÁVEIS — MESMO PADRÃO EM TODO CONTEXTO
        </div>
        <div className="space-y-1">
          {tracks.map((track, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-lg transition-colors duration-150 group"
              style={{ backgroundColor: playing === i ? "#242424" : "transparent" }}
              onMouseEnter={(e) => { if (playing !== i) e.currentTarget.style.backgroundColor = "#1a1a1a"; }}
              onMouseLeave={(e) => { if (playing !== i) e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              <button
                onClick={() => setPlaying(playing === i ? null : i)}
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-150"
                style={{
                  backgroundColor: playing === i ? "#1DB954" : "#242424",
                  color: playing === i ? "#000" : "#FFFFFF",
                }}
                onMouseEnter={(e) => { if (playing !== i) { e.currentTarget.style.backgroundColor = "#1DB954"; e.currentTarget.style.color = "#000"; } }}
                onMouseLeave={(e) => { if (playing !== i) { e.currentTarget.style.backgroundColor = "#242424"; e.currentTarget.style.color = "#FFFFFF"; } }}
                aria-label={playing === i ? `Pausar ${track.title}` : `Tocar ${track.title}`}
                aria-pressed={playing === i}
              >
                <span style={{ fontSize: "0.65rem" }}>{playing === i ? "⏸" : "▶"}</span>
              </button>

              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate" style={{ color: playing === i ? "#1DB954" : "#FFFFFF", fontFamily: "var(--font-sans)" }}>
                  {track.title}
                </div>
                <div className="text-xs truncate" style={{ color: "#B3B3B3", fontFamily: "var(--font-body)" }}>
                  {track.artist}
                </div>
              </div>

              <button
                onClick={() => setLiked((prev) => { const n = [...prev]; n[i] = !n[i]; return n; })}
                className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-150"
                style={{ color: liked[i] ? "#1DB954" : "#555" }}
                onMouseEnter={(e) => { if (!liked[i]) e.currentTarget.style.color = "#FFFFFF"; }}
                onMouseLeave={(e) => { if (!liked[i]) e.currentTarget.style.color = "#555"; }}
                aria-label={liked[i] ? `Remover ${track.title} das favoritas` : `Adicionar ${track.title} às favoritas`}
                aria-pressed={liked[i]}
              >
                <span style={{ fontSize: "1rem" }}>{liked[i] ? "♥" : "♡"}</span>
              </button>

              <span style={{ color: "#555", fontSize: "0.7rem", fontFamily: "var(--font-mono)", flexShrink: 0 }}>
                {track.duration}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {["Botão Play", "Botão Like", "Badge de Status"].map((label, i) => (
          <div key={i} className="p-3 rounded-lg text-center" style={{ backgroundColor: "#181818", border: "1px solid #333" }}>
            <div className="flex justify-center mb-2">
              {i === 0 && (
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#1DB954" }}>
                  <span style={{ color: "#000", fontSize: "0.75rem" }}>▶</span>
                </div>
              )}
              {i === 1 && <span style={{ color: "#1DB954", fontSize: "1.5rem" }}>♥</span>}
              {i === 2 && (
                <span className="px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: "#1a3d2b", color: "#1DB954", fontFamily: "var(--font-mono)", fontSize: "0.6rem" }}>
                  TOCANDO
                </span>
              )}
            </div>
            <div style={{ fontSize: "0.65rem", color: "#555", fontFamily: "var(--font-body)" }}>{label}</div>
            <div style={{ fontSize: "0.55rem", color: "#444", fontFamily: "var(--font-mono)", marginTop: "0.25rem" }}>
              Mesmo padrão em todo contexto
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
