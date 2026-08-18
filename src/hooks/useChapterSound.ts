import { useCallback, useRef } from "react";

/*
  Generates a short, subtle click/tone using the Web Audio API.
  No external file needed — works offline and in any browser.
  Respects the muted flag passed by the caller.
*/
export function useChapterSound(muted: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return ctxRef.current;
  }, []);

  const play = useCallback(() => {
    if (muted) return;
    if (typeof window === "undefined" || !("AudioContext" in window || "webkitAudioContext" in window)) return;

    try {
      const ctx = getCtx();
      const now = ctx.currentTime;

      // Soft click: short sine wave, quick attack and release
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.08);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch {
      // Silently ignore — audio is non-critical
    }
  }, [muted, getCtx]);

  return { play };
}
