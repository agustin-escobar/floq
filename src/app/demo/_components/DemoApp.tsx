"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
interface Animal {
  id: string;
  name: string;
  tag: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  isEscaping: boolean;
  breached: boolean;
  battery: number;
  heartRate: number;
  color: string;
}

interface Alert {
  id: string;
  animalName: string;
  tag: string;
  time: string;
  message: string;
  severity: "critical" | "warning";
}

// ── SVG viewport dimensions ────────────────────────────────────────────────
const SVG_W = 600;
const SVG_H = 380;

// ── Virtual fence polygon (SVG coords) ────────────────────────────────────
const FENCE: [number, number][] = [
  [110, 70],
  [490, 60],
  [510, 300],
  [100, 310],
];

// ── Helpers ───────────────────────────────────────────────────────────────
function fencePolygonStr(pts: [number, number][]) {
  return pts.map(([x, y]) => `${x},${y}`).join(" ");
}

function pointInPolygon(x: number, y: number, poly: [number, number][]) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0], yi = poly[i][1];
    const xj = poly[j][0], yj = poly[j][1];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

function fenceCenter(poly: [number, number][]): [number, number] {
  const cx = poly.reduce((s, [x]) => s + x, 0) / poly.length;
  const cy = poly.reduce((s, [, y]) => s + y, 0) / poly.length;
  return [cx, cy];
}

function now() {
  return new Date().toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

// ── Initial animals ───────────────────────────────────────────────────────
const ANIMAL_COLORS = ["#16a34a", "#15803d", "#166534", "#14532d", "#4ade80", "#86efac", "#bbf7d0"];

function makeAnimals(): Animal[] {
  const [cx, cy] = fenceCenter(FENCE);
  const spread = 60;
  const base: Omit<Animal, "id" | "name" | "tag" | "x" | "y" | "color" | "isEscaping" | "breached">[] = [
    { vx: 0.12, vy: 0.08, battery: 87, heartRate: 62 },
    { vx: -0.1, vy: 0.15, battery: 92, heartRate: 58 },
    { vx: 0.08, vy: -0.12, battery: 74, heartRate: 65 },
    { vx: -0.14, vy: -0.09, battery: 95, heartRate: 60 },
    { vx: 0.11, vy: 0.06, battery: 81, heartRate: 63 },
    { vx: -0.07, vy: 0.13, battery: 68, heartRate: 70 },
    { vx: 0.09, vy: -0.07, battery: 99, heartRate: 57 },
  ];

  const names = ["Maravilla", "Estrella", "Luna", "Pinta", "Canela", "Trigueña", "Nube"];
  const tags = ["CL-001", "CL-002", "CL-003", "CL-004", "CL-005", "CL-006", "CL-007"];

  return base.map((b, i) => ({
    ...b,
    id: `a${i}`,
    name: names[i],
    tag: tags[i],
    x: cx + (i % 3 - 1) * spread + Math.sin(i * 1.4) * 20,
    y: cy + (Math.floor(i / 3) - 1) * spread + Math.cos(i * 1.4) * 20,
    isEscaping: i === 6, // Nube is the escaper
    breached: false,
    color: ANIMAL_COLORS[i],
  }));
}

// ── Component ─────────────────────────────────────────────────────────────
export default function DemoApp() {
  const [animals, setAnimals] = useState<Animal[]>(makeAnimals);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [playing, setPlaying] = useState(false);
  const [tick, setTick] = useState(0);
  const [demoPhase, setDemoPhase] = useState<"idle" | "grazing" | "alert" | "done">("idle");
  const alertedIds = useRef(new Set<string>());
  const tickRef = useRef(0);

  const reset = useCallback(() => {
    setAnimals(makeAnimals());
    setAlerts([]);
    setPlaying(false);
    setDemoPhase("idle");
    setTick(0);
    tickRef.current = 0;
    alertedIds.current = new Set();
  }, []);

  useEffect(() => {
    if (!playing) return;

    const id = setInterval(() => {
      tickRef.current += 1;
      const t = tickRef.current;
      setTick(t);

      if (t === 1) setDemoPhase("grazing");

      setAnimals((prev) => {
        const next = prev.map((a) => {
          let { x, y, vx, vy } = a;

          if (a.isEscaping) {
            // Nube gradually drifts right then accelerates past the fence
            const escapeSpeed = t > 80 ? 1.8 : t > 50 ? 0.9 : 0.3;
            x += escapeSpeed;
            y += 0.1 * Math.sin(t * 0.05);
          } else {
            // Normal brownian wandering, bounces within fence center zone
            x += vx + Math.sin(t * 0.03 + parseInt(a.id.slice(1)) * 1.1) * 0.4;
            y += vy + Math.cos(t * 0.03 + parseInt(a.id.slice(1)) * 1.3) * 0.4;

            // Soft boundary: push back toward center if leaving fence
            const [cx, cy] = fenceCenter(FENCE);
            const dx = x - cx, dy = y - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 90) {
              x -= dx * 0.04;
              y -= dy * 0.04;
              vx = -vx * 0.8;
              vy = -vy * 0.8;
            }
          }

          const inside = pointInPolygon(x, y, FENCE);
          const breached = !inside;
          return { ...a, x, y, vx, vy, breached };
        });

        // Fire alert for newly breached animals
        next.forEach((a) => {
          if (a.breached && !alertedIds.current.has(a.id)) {
            alertedIds.current.add(a.id);
            setAlerts((prev) => [
              {
                id: `alert-${a.id}-${Date.now()}`,
                animalName: a.name,
                tag: a.tag,
                time: now(),
                message: `${a.name} (${a.tag}) salió del cerco virtual`,
                severity: "critical",
              },
              ...prev,
            ]);
            setDemoPhase("alert");
          }
        });

        return next;
      });

      // Stop after ~200 ticks (long enough to show escape)
      if (t >= 200) {
        setPlaying(false);
        setDemoPhase("done");
      }
    }, 60);

    return () => clearInterval(id);
  }, [playing]);

  const breachedCount = animals.filter((a) => a.breached).length;
  const insideCount = animals.length - breachedCount;
  const avgBattery = Math.round(animals.reduce((s, a) => s + a.battery, 0) / animals.length);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center font-bold text-sm text-white">
            F
          </div>
          <span className="font-semibold text-white">Floq</span>
          <span className="text-gray-500 text-sm">— Demo interactivo</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse" />
          Simulación en vivo · Predio Los Boldos · Chile
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Map */}
        <div className="flex-1 flex flex-col">
          {/* Map toolbar */}
          <div className="flex items-center gap-3 px-4 py-2 bg-gray-900 border-b border-gray-800">
            <span className="text-xs text-gray-400 uppercase tracking-wider">Mapa de Predio</span>
            <div className="flex-1" />
            {demoPhase === "idle" && (
              <button
                onClick={() => setPlaying(true)}
                className="px-4 py-1.5 bg-green-600 hover:bg-green-500 text-white text-sm rounded-md font-medium transition-colors"
              >
                ▶ Iniciar Demo
              </button>
            )}
            {(demoPhase === "grazing" || demoPhase === "alert") && (
              <button
                onClick={() => setPlaying((p) => !p)}
                className="px-4 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-md font-medium transition-colors"
              >
                {playing ? "⏸ Pausar" : "▶ Continuar"}
              </button>
            )}
            {(demoPhase === "done" || demoPhase === "alert") && (
              <button
                onClick={reset}
                className="px-4 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-md transition-colors text-sm"
              >
                ↺ Reiniciar
              </button>
            )}
          </div>

          {/* SVG Map */}
          <div className="flex-1 bg-gray-900 flex items-center justify-center p-4">
            <svg
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              className="w-full max-w-2xl rounded-xl border border-gray-700 bg-[#1a2e1a]"
              style={{ aspectRatio: `${SVG_W}/${SVG_H}` }}
            >
              {/* Background terrain texture */}
              <defs>
                <pattern id="grass" patternUnits="userSpaceOnUse" width="20" height="20">
                  <rect width="20" height="20" fill="#1a2e1a" />
                  <line x1="0" y1="10" x2="20" y2="10" stroke="#1f3620" strokeWidth="0.5" />
                  <line x1="10" y1="0" x2="10" y2="20" stroke="#1f3620" strokeWidth="0.5" />
                </pattern>
                <radialGradient id="alertGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                </radialGradient>
              </defs>

              <rect width={SVG_W} height={SVG_H} fill="url(#grass)" />

              {/* Fence area fill */}
              <polygon
                points={fencePolygonStr(FENCE)}
                fill="#22c55e"
                fillOpacity="0.08"
                stroke="#22c55e"
                strokeWidth="2"
                strokeDasharray="8 4"
              />

              {/* Fence corners */}
              {FENCE.map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={5} fill="#22c55e" fillOpacity="0.7" />
              ))}

              {/* Fence label */}
              <text x={fenceCenter(FENCE)[0]} y={75} textAnchor="middle" fill="#4ade80" fontSize="11" opacity="0.7">
                Cerco Virtual · Potrero Norte
              </text>

              {/* Alert pulse if breach */}
              {alerts.length > 0 && (
                <circle
                  cx={animals.find((a) => a.breached)?.x ?? SVG_W / 2}
                  cy={animals.find((a) => a.breached)?.y ?? SVG_H / 2}
                  r="40"
                  fill="url(#alertGlow)"
                  className="animate-ping"
                  style={{ transformOrigin: "center", animationDuration: "1s" }}
                />
              )}

              {/* Animals */}
              {animals.map((animal) => (
                <g key={animal.id}>
                  {/* Shadow */}
                  <ellipse cx={animal.x} cy={animal.y + 10} rx={8} ry={4} fill="black" fillOpacity="0.2" />
                  {/* Body */}
                  <circle
                    cx={animal.x}
                    cy={animal.y}
                    r={animal.breached ? 9 : 7}
                    fill={animal.breached ? "#ef4444" : animal.color}
                    stroke={animal.breached ? "#fca5a5" : "white"}
                    strokeWidth={animal.breached ? 2 : 1}
                    style={{ transition: "r 0.3s, fill 0.3s" }}
                  />
                  {/* Tag label */}
                  {animal.isEscaping && (
                    <text
                      x={animal.x}
                      y={animal.y - 13}
                      textAnchor="middle"
                      fill={animal.breached ? "#fca5a5" : "#fde68a"}
                      fontSize="9"
                      fontWeight="bold"
                    >
                      {animal.name}
                    </text>
                  )}
                </g>
              ))}

              {/* Compass */}
              <g transform="translate(560, 340)">
                <circle r="18" fill="black" fillOpacity="0.5" />
                <text textAnchor="middle" y="-8" fill="white" fontSize="9">N</text>
                <line x1="0" y1="-14" x2="0" y2="-6" stroke="white" strokeWidth="1.5" />
              </g>

              {/* Scale */}
              <g transform="translate(30, 355)">
                <line x1="0" y1="0" x2="60" y2="0" stroke="#9ca3af" strokeWidth="1.5" />
                <line x1="0" y1="-4" x2="0" y2="4" stroke="#9ca3af" strokeWidth="1.5" />
                <line x1="60" y1="-4" x2="60" y2="4" stroke="#9ca3af" strokeWidth="1.5" />
                <text x="30" y="-7" textAnchor="middle" fill="#9ca3af" fontSize="9">200 m</text>
              </g>
            </svg>
          </div>

          {/* Phase info bar */}
          <div className="px-4 py-2 bg-gray-900 border-t border-gray-800 text-xs text-gray-400 flex items-center gap-4">
            {demoPhase === "idle" && <span>Presiona "Iniciar Demo" para comenzar la simulación.</span>}
            {demoPhase === "grazing" && (
              <>
                <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse" />
                <span>Animales pastando dentro del cerco — todo normal.</span>
              </>
            )}
            {demoPhase === "alert" && (
              <>
                <span className="w-2 h-2 rounded-full bg-red-400 inline-block animate-ping" />
                <span className="text-red-400 font-medium">
                  ¡Alerta! Nube (CL-007) ha salido del cerco virtual. Notificación enviada al productor.
                </span>
              </>
            )}
            {demoPhase === "done" && <span>Demo completado. Presiona "Reiniciar" para volver a ver.</span>}
            <span className="ml-auto">Tick: {tick}</span>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="w-80 flex flex-col border-l border-gray-800 bg-gray-900">
          {/* Dashboard stats */}
          <div className="p-4 border-b border-gray-800">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Resumen del Hato
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <StatCard label="Animales dentro" value={insideCount} color="green" unit="/ 7" />
              <StatCard label="Fuera del cerco" value={breachedCount} color={breachedCount > 0 ? "red" : "gray"} unit="" />
              <StatCard label="Batería promedio" value={avgBattery} color="blue" unit="%" />
              <StatCard label="Collares activos" value={animals.length} color="purple" unit="" />
            </div>
          </div>

          {/* Animal list */}
          <div className="p-4 border-b border-gray-800 flex-1 overflow-y-auto">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Estado Individual
            </h2>
            <div className="space-y-2">
              {animals.map((a) => (
                <div
                  key={a.id}
                  className={`flex items-center gap-2 p-2 rounded-lg text-sm transition-colors ${
                    a.breached ? "bg-red-900/40 border border-red-700/50" : "bg-gray-800/50"
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: a.breached ? "#ef4444" : a.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className={`font-medium truncate ${a.breached ? "text-red-300" : "text-white"}`}>
                        {a.name}
                      </span>
                      {a.breached && (
                        <span className="text-red-400 text-xs">⚠</span>
                      )}
                    </div>
                    <div className="text-gray-500 text-xs">{a.tag}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xs text-gray-400">🔋 {a.battery}%</div>
                    <div className="text-xs text-gray-500">♥ {a.heartRate} bpm</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div className="p-4 flex flex-col" style={{ maxHeight: "240px" }}>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              Alertas
              {alerts.length > 0 && (
                <span className="px-1.5 py-0.5 bg-red-600 text-white text-xs rounded-full">{alerts.length}</span>
              )}
            </h2>
            {alerts.length === 0 ? (
              <div className="text-gray-600 text-xs text-center py-4">Sin alertas activas</div>
            ) : (
              <div className="space-y-2 overflow-y-auto">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="p-2 rounded-lg bg-red-900/30 border border-red-700/50"
                  >
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                      <span className="text-red-300 text-xs font-semibold">CERCO VULNERADO</span>
                      <span className="ml-auto text-gray-500 text-xs">{alert.time}</span>
                    </div>
                    <p className="text-gray-300 text-xs">{alert.message}</p>
                    <p className="text-gray-500 text-xs mt-1">Notificación enviada · Ubicación registrada</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  unit,
  color,
}: {
  label: string;
  value: number;
  unit: string;
  color: "green" | "red" | "blue" | "purple" | "gray";
}) {
  const colorMap = {
    green: "text-green-400",
    red: "text-red-400",
    blue: "text-blue-400",
    purple: "text-purple-400",
    gray: "text-gray-400",
  };
  return (
    <div className="bg-gray-800 rounded-lg p-3">
      <div className={`text-2xl font-bold ${colorMap[color]}`}>
        {value}
        <span className="text-sm font-normal text-gray-500 ml-0.5">{unit}</span>
      </div>
      <div className="text-xs text-gray-400 mt-0.5">{label}</div>
    </div>
  );
}
