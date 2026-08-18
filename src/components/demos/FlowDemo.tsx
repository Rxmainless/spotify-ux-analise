import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

type Step = "search" | "results" | "playing" | "saved";

const steps: { id: Step; label: string; description: string }[] = [
  { id: "search", label: "1. Buscar", description: "Usuário digita o nome da música" },
  { id: "results", label: "2. Selecionar", description: "Resultados aparecem imediatamente" },
  { id: "playing", label: "3. Reproduzir", description: "Feedback visual e de reprodução" },
  { id: "saved", label: "4. Salvar", description: "Confirmação de adição à biblioteca" },
];

export default function FlowDemo() {
  const [step, setStep] = useState<Step>("search");
  const [query, setQuery] = useState("");
  const [liked, setLiked] = useState(false);
  const reducedMotion = useReducedMotion();

  const currentIndex = steps.findIndex((s) => s.id === step);

  const advance = () => {
    if (step === "search" && query.length > 0) setStep("results");
    else if (step === "results") setStep("playing");
    else if (step === "playing") { setLiked(true); setStep("saved"); }
    else setStep("search");
  };

  const reset = () => { setStep("search"); setQuery(""); setLiked(false); };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {steps.map((s, i) => (
          <div
            key={s.id}
            className="flex items-center gap-2 flex-shrink-0"
            aria-current={step === s.id ? "step" : undefined}
          >
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300"
              style={{
                backgroundColor: step === s.id ? "#1DB954" : i < currentIndex ? "#1a3d2b" : "#242424",
                color: step === s.id ? "#000" : i < currentIndex ? "#1DB954" : "#555",
                fontFamily: "var(--font-mono)",
              }}
            >
              {i < currentIndex ? "✓" : String(i + 1)}&nbsp;{s.label.split(". ")[1]}
            </div>
            {i < steps.length - 1 && <div style={{ color: "#333", fontSize: "0.7rem" }}>→</div>}
          </div>
        ))}
      </div>

      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: "#181818", border: "1px solid #333", minHeight: "220px" }}>
        <AnimatePresence mode="wait">
          {step === "search" && (
            <motion.div
              key="search"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
              className="p-6"
            >
              <div style={{ color: "#B3B3B3", fontSize: "0.75rem", fontFamily: "var(--font-mono)", marginBottom: "1rem" }}>
                BUSCA
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && query.length > 0 && advance()}
                  placeholder="Nome da música ou artista..."
                  className="flex-1 rounded-lg px-4 py-2 text-sm outline-none transition-all duration-150"
                  style={{
                    backgroundColor: "#242424",
                    border: query ? "1px solid #1DB954" : "1px solid #333",
                    color: "#FFFFFF",
                    fontFamily: "var(--font-body)",
                  }}
                  aria-label="Campo de busca"
                />
                <button
                  onClick={advance}
                  disabled={!query}
                  className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 disabled:opacity-40"
                  style={{ backgroundColor: "#1DB954", color: "#000", fontFamily: "var(--font-sans)" }}
                  aria-label="Buscar"
                >
                  Buscar
                </button>
              </div>
              <div style={{ color: "#555", fontSize: "0.7rem", fontFamily: "var(--font-body)", marginTop: "0.75rem" }}>
                Digite qualquer coisa e pressione Enter ou clique em Buscar
              </div>
            </motion.div>
          )}

          {step === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
              className="p-6"
            >
              <div style={{ color: "#B3B3B3", fontSize: "0.75rem", fontFamily: "var(--font-mono)", marginBottom: "1rem" }}>
                RESULTADOS PARA "{query.toUpperCase()}"
              </div>
              {[
                { title: query || "Música", artist: "Artista Popular", duration: "3:42" },
                { title: `${query} (Remix)`, artist: "DJ Mix", duration: "4:18" },
                { title: `Best of ${query}`, artist: "Compilação", duration: "2:55" },
              ].map((track, i) => (
                <button
                  key={i}
                  onClick={i === 0 ? advance : undefined}
                  className="w-full flex items-center gap-4 p-3 rounded-lg text-left transition-all duration-150 group"
                  style={{ backgroundColor: i === 0 ? "#242424" : "transparent" }}
                  onMouseEnter={(e) => { if (i !== 0) e.currentTarget.style.backgroundColor = "#1a1a1a"; }}
                  onMouseLeave={(e) => { if (i !== 0) e.currentTarget.style.backgroundColor = "transparent"; }}
                  aria-label={`Selecionar ${track.title} de ${track.artist}`}
                >
                  <div className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#333" }}>
                    <span style={{ color: i === 0 ? "#1DB954" : "#555", fontSize: "1rem" }}>♪</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate" style={{ color: "#FFFFFF", fontFamily: "var(--font-sans)" }}>{track.title}</div>
                    <div className="text-xs truncate" style={{ color: "#B3B3B3", fontFamily: "var(--font-body)" }}>{track.artist}</div>
                  </div>
                  <div style={{ color: "#555", fontSize: "0.75rem", fontFamily: "var(--font-mono)" }}>{track.duration}</div>
                </button>
              ))}
              <div style={{ color: "#555", fontSize: "0.7rem", fontFamily: "var(--font-body)", marginTop: "0.5rem" }}>
                Clique no primeiro resultado para reproduzir
              </div>
            </motion.div>
          )}

          {step === "playing" && (
            <motion.div
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
              className="p-6"
            >
              <div style={{ color: "#1DB954", fontSize: "0.75rem", fontFamily: "var(--font-mono)", marginBottom: "1rem" }}>
                ▶ REPRODUZINDO
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#333" }}>
                  <span style={{ fontSize: "2rem" }}>♪</span>
                </div>
                <div>
                  <div className="font-semibold" style={{ color: "#FFFFFF", fontFamily: "var(--font-sans)" }}>{query}</div>
                  <div className="text-sm" style={{ color: "#B3B3B3", fontFamily: "var(--font-body)" }}>Artista Popular</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-1 rounded-full" style={{ backgroundColor: "#333" }}>
                  <motion.div
                    className="h-1 rounded-full"
                    style={{ backgroundColor: "#1DB954" }}
                    initial={{ width: "0%" }}
                    animate={{ width: "45%" }}
                    transition={{ duration: reducedMotion ? 0 : 1.5, ease: "linear" }}
                  />
                </div>
                <div className="flex justify-between" style={{ color: "#555", fontSize: "0.65rem", fontFamily: "var(--font-mono)" }}>
                  <span>1:41</span><span>3:42</span>
                </div>
              </div>
              <button
                onClick={advance}
                className="mt-4 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-150"
                style={{ border: "1px solid #333", color: "#B3B3B3", fontFamily: "var(--font-sans)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#1DB954"; e.currentTarget.style.color = "#1DB954"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#333"; e.currentTarget.style.color = "#B3B3B3"; }}
                aria-label="Adicionar à biblioteca"
              >
                <span>+</span> Adicionar à biblioteca
              </button>
            </motion.div>
          )}

          {step === "saved" && (
            <motion.div
              key="saved"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.3 }}
              className="p-6 flex flex-col items-center justify-center text-center"
              style={{ minHeight: "220px" }}
              aria-live="polite"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: reducedMotion ? 0 : 0.1 }}
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: "#1a3d2b" }}
              >
                <span style={{ color: "#1DB954", fontSize: "2rem" }}>✓</span>
              </motion.div>
              <div className="font-semibold mb-1" style={{ color: "#FFFFFF", fontFamily: "var(--font-sans)" }}>
                Adicionada à biblioteca!
              </div>
              <div className="text-sm mb-4" style={{ color: "#B3B3B3", fontFamily: "var(--font-body)" }}>
                Fluxo concluído em 4 interações
              </div>
              <button
                onClick={reset}
                className="px-4 py-2 rounded-full text-sm transition-all duration-150"
                style={{ border: "1px solid #333", color: "#B3B3B3", fontFamily: "var(--font-sans)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#FFFFFF"; e.currentTarget.style.borderColor = "#555"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#B3B3B3"; e.currentTarget.style.borderColor = "#333"; }}
              >
                Reiniciar demo
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="text-xs p-3 rounded-lg" style={{ backgroundColor: "#1a1a1a", color: "#B3B3B3", fontFamily: "var(--font-body)", borderLeft: "2px solid #1DB954" }}>
        <strong style={{ color: "#FFFFFF" }}>Análise:</strong> O fluxo primário leva 4 interações. Cada etapa tem feedback imediato e o usuário nunca perde o contexto.
      </div>
    </div>
  );
}
