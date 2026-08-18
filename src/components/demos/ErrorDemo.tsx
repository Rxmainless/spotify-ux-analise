import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

type State = "idle" | "confirm" | "undoing" | "deleted";

export default function ErrorDemo() {
  const [state, setState] = useState<State>("idle");
  const [showUndo, setShowUndo] = useState(false);
  const reducedMotion = useReducedMotion();

  const handleDelete = () => setState("confirm");
  const handleConfirm = () => {
    setState("deleted");
    setShowUndo(true);
    setTimeout(() => setShowUndo(false), 4000);
  };
  const handleUndo = () => { setState("idle"); setShowUndo(false); };
  const handleCancel = () => setState("idle");
  const handleReset = () => { setState("idle"); setShowUndo(false); };

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl" style={{ backgroundColor: "#181818", border: "1px solid #333" }}>
        <div style={{ color: "#B3B3B3", fontSize: "0.7rem", fontFamily: "var(--font-mono)", marginBottom: "1rem" }}>
          DEMO — AÇÃO DESTRUTIVA COM CONFIRMAÇÃO
        </div>

        <AnimatePresence mode="wait">
          {state === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.15 }}
              className="space-y-3"
            >
              {["Minha Playlist Favorita", "Rock Clássico 2024", "Workout Mix"].map((pl, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{ backgroundColor: "#242424" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: "#333", color: "#1DB954", fontSize: "0.75rem" }}>♫</div>
                    <div>
                      <div className="text-sm font-medium" style={{ color: "#FFFFFF", fontFamily: "var(--font-sans)" }}>{pl}</div>
                      <div className="text-xs" style={{ color: "#555", fontFamily: "var(--font-body)" }}>{12 + i * 7} músicas</div>
                    </div>
                  </div>
                  {i === 0 && (
                    <button
                      onClick={handleDelete}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
                      style={{ color: "#D64545", border: "1px solid #D64545", fontFamily: "var(--font-sans)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(214,69,69,0.1)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                      aria-label="Excluir Minha Playlist Favorita"
                    >
                      Excluir
                    </button>
                  )}
                </div>
              ))}
              <div style={{ color: "#555", fontSize: "0.7rem", fontFamily: "var(--font-body)" }}>
                Clique em "Excluir" para ver o fluxo de prevenção de erros
              </div>
            </motion.div>
          )}

          {state === "confirm" && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
              className="p-4 rounded-xl"
              style={{ backgroundColor: "#1a1010", border: "1px solid #D64545" }}
              role="alertdialog"
              aria-labelledby="confirm-title"
              aria-describedby="confirm-desc"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(214,69,69,0.2)" }}>
                  <span style={{ color: "#D64545" }}>!</span>
                </div>
                <div className="flex-1">
                  <div id="confirm-title" className="font-semibold mb-1" style={{ color: "#FFFFFF", fontFamily: "var(--font-sans)" }}>
                    Excluir playlist?
                  </div>
                  <div id="confirm-desc" className="text-sm mb-4" style={{ color: "#B3B3B3", fontFamily: "var(--font-body)" }}>
                    "Minha Playlist Favorita" será excluída permanentemente. Esta ação não pode ser desfeita.
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleConfirm}
                      className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150"
                      style={{ backgroundColor: "#D64545", color: "#FFFFFF", fontFamily: "var(--font-sans)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#b83a3a"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#D64545"; }}
                      aria-label="Confirmar exclusão"
                    >
                      Excluir mesmo assim
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150"
                      style={{ color: "#FFFFFF", border: "1px solid #555", fontFamily: "var(--font-sans)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#FFFFFF"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#555"; }}
                      autoFocus
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {state === "deleted" && (
            <motion.div
              key="deleted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
              className="space-y-3"
            >
              {["Rock Clássico 2024", "Workout Mix"].map((pl, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: "#242424" }}>
                  <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: "#333", color: "#1DB954", fontSize: "0.75rem" }}>♫</div>
                  <div className="text-sm font-medium" style={{ color: "#FFFFFF", fontFamily: "var(--font-sans)" }}>{pl}</div>
                </div>
              ))}
              <button onClick={handleReset} className="text-xs" style={{ color: "#555", fontFamily: "var(--font-body)" }}>
                Reiniciar demo
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showUndo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: reducedMotion ? 0 : 0.25 }}
            className="flex items-center justify-between p-4 rounded-xl"
            style={{ backgroundColor: "#242424", border: "1px solid #333" }}
            role="status"
            aria-live="polite"
          >
            <span className="text-sm" style={{ color: "#FFFFFF", fontFamily: "var(--font-body)" }}>
              Playlist removida
            </span>
            <button
              onClick={handleUndo}
              className="text-sm font-semibold px-3 py-1 rounded-lg transition-all duration-150"
              style={{ color: "#1DB954", fontFamily: "var(--font-sans)" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1a3d2b"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              Desfazer
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-xs p-3 rounded-lg" style={{ backgroundColor: "#1a1a1a", color: "#B3B3B3", fontFamily: "var(--font-body)", borderLeft: "2px solid #1DB954" }}>
        <strong style={{ color: "#FFFFFF" }}>Princípio:</strong> Ações destrutivas têm duas camadas de proteção: confirmação explícita + possibilidade de desfazer. Botão "Cancelar" é o padrão com foco automático.
      </div>
    </div>
  );
}
