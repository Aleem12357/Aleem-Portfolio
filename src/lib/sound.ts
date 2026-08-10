/** Short two-note notification chime played on booking actions. */
export function playNotification() {
  if (typeof window === "undefined") return;
  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const now = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.value = 0.0001;
    master.connect(ctx.destination);
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(0.18, now + 0.02);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

    [880, 1318.5].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.value = i === 0 ? 0.9 : 0.6;
      osc.connect(gain).connect(master);
      osc.start(now + i * 0.11);
      osc.stop(now + 0.6);
    });

    window.setTimeout(() => ctx.close().catch(() => {}), 900);
  } catch {
    /* audio not available */
  }
}
