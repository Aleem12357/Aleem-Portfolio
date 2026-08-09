import { useEffect, useRef } from "react";

const cities = [
  { name: "Lahore", lat: 31.5, lon: 74.3 },
  { name: "Dubai", lat: 25.2, lon: 55.3 },
  { name: "London", lat: 51.5, lon: -0.1 },
  { name: "New York", lat: 40.7, lon: -74 },
  { name: "Tokyo", lat: 35.7, lon: 139.7 },
];

export function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let rot = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // fibonacci sphere points
    const N = 900;
    const pts: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = i * Math.PI * (3 - Math.sqrt(5));
      pts.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
    }

    const cityPts = cities.map((c) => {
      const phi = (90 - c.lat) * (Math.PI / 180);
      const theta = (c.lon + 180) * (Math.PI / 180);
      return {
        name: c.name,
        x: -Math.sin(phi) * Math.cos(theta),
        y: Math.cos(phi),
        z: Math.sin(phi) * Math.sin(theta),
      };
    });

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      const w = canvas!.width;
      const h = canvas!.height;
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.42;
      ctx!.clearRect(0, 0, w, h);

      const cos = Math.cos(rot);
      const sin = Math.sin(rot);

      for (const p of pts) {
        const x = p.x * cos - p.z * sin;
        const z = p.x * sin + p.z * cos;
        if (z < -0.1) continue;
        const px = cx + x * R;
        const py = cy - p.y * R;
        const a = 0.15 + 0.5 * ((z + 1) / 2);
        ctx!.fillStyle = `rgba(255,255,255,${a})`;
        ctx!.beginPath();
        ctx!.arc(px, py, 1.1 * dpr, 0, Math.PI * 2);
        ctx!.fill();
      }

      for (const c of cityPts) {
        const x = c.x * cos - c.z * sin;
        const z = c.x * sin + c.z * cos;
        if (z < 0) continue;
        const px = cx + x * R;
        const py = cy - c.y * R;
        ctx!.fillStyle = "rgba(120,200,255,0.95)";
        ctx!.beginPath();
        ctx!.arc(px, py, 2.6 * dpr, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.font = `${9 * dpr}px ui-monospace, monospace`;
        const label = c.name.toUpperCase();
        const tw = ctx!.measureText(label).width;
        ctx!.fillStyle = "rgba(255,255,255,0.10)";
        ctx!.fillRect(px + 6 * dpr, py - 13 * dpr, tw + 8 * dpr, 14 * dpr);
        ctx!.fillStyle = "rgba(255,255,255,0.85)";
        ctx!.fillText(label, px + 10 * dpr, py - 3 * dpr);
      }

      rot += 0.0035;
      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="h-64 w-full" aria-label="Rotating globe showing timezones" />;
}
