import { useEffect, useRef } from "react";

type City = { name: string; lat: number; lon: number; hub?: boolean };

const cities: City[] = [
  { name: "Islamabad", lat: 33.7, lon: 73.0, hub: true },
  { name: "Dubai", lat: 25.2, lon: 55.3 },
  { name: "Riyadh", lat: 24.7, lon: 46.7 },
  { name: "Istanbul", lat: 41.0, lon: 29.0 },
  { name: "Berlin", lat: 52.5, lon: 13.4 },
  { name: "London", lat: 51.5, lon: -0.1 },
  { name: "New York", lat: 40.7, lon: -74 },
  { name: "Toronto", lat: 43.7, lon: -79.4 },
  { name: "Sao Paulo", lat: -23.5, lon: -46.6 },
  { name: "Singapore", lat: 1.35, lon: 103.8 },
  { name: "Tokyo", lat: 35.7, lon: 139.7 },
  { name: "Sydney", lat: -33.9, lon: 151.2 },
];

type Vec = { x: number; y: number; z: number };

function toVec(lat: number, lon: number): Vec {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return {
    x: -Math.sin(phi) * Math.cos(theta),
    y: Math.cos(phi),
    z: Math.sin(phi) * Math.sin(theta),
  };
}

function slerp(a: Vec, b: Vec, t: number): Vec {
  const dot = Math.max(-1, Math.min(1, a.x * b.x + a.y * b.y + a.z * b.z));
  const omega = Math.acos(dot);
  if (omega < 1e-6) return a;
  const s = Math.sin(omega);
  const k1 = Math.sin((1 - t) * omega) / s;
  const k2 = Math.sin(t * omega) / s;
  return { x: a.x * k1 + b.x * k2, y: a.y * k1 + b.y * k2, z: a.z * k1 + b.z * k2 };
}

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
    const pts: Vec[] = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = i * Math.PI * (3 - Math.sqrt(5));
      pts.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
    }

    const cityPts = cities.map((c) => ({ ...c, ...toVec(c.lat, c.lon) }));
    const hub = cityPts.find((c) => c.hub)!;
    const arcs = cityPts
      .filter((c) => !c.hub)
      .map((c) => Array.from({ length: 40 }, (_, i) => slerp(hub, c, i / 39)));

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
    }
    resize();
    window.addEventListener("resize", resize);

    const dotColor = () =>
      document.documentElement.classList.contains("light") ? "25,30,55" : "255,255,255";

    function draw() {
      const w = canvas!.width;
      const h = canvas!.height;
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.42;
      ctx!.clearRect(0, 0, w, h);

      const cos = Math.cos(rot);
      const sin = Math.sin(rot);
      const rgb = dotColor();
      const project = (p: Vec) => {
        const x = p.x * cos - p.z * sin;
        const z = p.x * sin + p.z * cos;
        return { px: cx + x * R, py: cy - p.y * R, z };
      };

      for (const p of pts) {
        const { px, py, z } = project(p);
        if (z < -0.1) continue;
        const a = 0.12 + 0.42 * ((z + 1) / 2);
        ctx!.fillStyle = `rgba(${rgb},${a})`;
        ctx!.beginPath();
        ctx!.arc(px, py, 1.1 * dpr, 0, Math.PI * 2);
        ctx!.fill();
      }

      // blue connection arcs from the hub city
      ctx!.lineWidth = 1.2 * dpr;
      ctx!.strokeStyle = "rgba(80,150,255,0.55)";
      for (const arc of arcs) {
        let started = false;
        ctx!.beginPath();
        for (const p of arc) {
          const { px, py, z } = project(p);
          if (z < 0) {
            started = false;
            continue;
          }
          if (!started) {
            ctx!.moveTo(px, py);
            started = true;
          } else {
            ctx!.lineTo(px, py);
          }
        }
        ctx!.stroke();
      }

      for (const c of cityPts) {
        const { px, py, z } = project(c);
        if (z < 0) continue;
        ctx!.fillStyle = c.hub ? "rgba(255,120,190,0.98)" : "rgba(110,180,255,0.95)";
        ctx!.beginPath();
        ctx!.arc(px, py, (c.hub ? 3.4 : 2.4) * dpr, 0, Math.PI * 2);
        ctx!.fill();
        if (c.hub || z > 0.45) {
          ctx!.font = `${9 * dpr}px ui-monospace, monospace`;
          const label = c.name.toUpperCase();
          const tw = ctx!.measureText(label).width;
          ctx!.fillStyle = `rgba(${rgb},0.10)`;
          ctx!.fillRect(px + 6 * dpr, py - 13 * dpr, tw + 8 * dpr, 14 * dpr);
          ctx!.fillStyle = `rgba(${rgb},0.85)`;
          ctx!.fillText(label, px + 10 * dpr, py - 3 * dpr);
        }
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

  return (
    <canvas
      ref={canvasRef}
      className="h-64 w-full"
      aria-label="Rotating globe connecting Islamabad with cities worldwide"
    />
  );
}
