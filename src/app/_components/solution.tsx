const features = [
  {
    tag: "Cercado Virtual",
    title: "Controla el territorio sin un metro de alambre",
    description:
      "Define zonas virtuales desde tu teléfono. Los collares GPS guían al ganado mediante señales suaves, sin dolor ni estrés. Mueve potreros en segundos, no días.",
    highlight: "Ahorra hasta 80% en infraestructura de cercos",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    tag: "Bienestar Animal",
    title: "Detecta problemas antes de que sean crisis",
    description:
      "Los sensores biométricos monitorean temperatura, actividad, rumia y comportamiento 24/7. La IA identifica anomalías horas — a veces días — antes que el ojo humano.",
    highlight: "Reducción del 40% en pérdidas por enfermedad",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    tag: "Optimización de Pastoreo",
    title: "Decisiones de pastoreo basadas en datos reales",
    description:
      "El sistema analiza el estado de cada potrero, el comportamiento del rebaño y las condiciones climáticas para recomendar rotaciones óptimas. Más pasto, mejor suelo, mayor productividad.",
    highlight: "Hasta 35% más productividad por hectárea",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
        <path d="M20.4 7.4A9.96 9.96 0 0 0 12 2v10l8.4-4.6z" />
      </svg>
    ),
  },
];

export default function Solution() {
  return (
    <section
      className="py-24 px-4"
      style={{ background: "var(--floq-chalk)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span
            className="text-xs font-semibold uppercase"
            style={{ color: "var(--floq-grass)", letterSpacing: "0.1em" }}
          >
            La solución
          </span>
          <h2
            className="type-heading mt-4"
            style={{
              color: "var(--floq-ink)",
              fontSize: "clamp(2rem, 5vw, 3rem)",
            }}
          >
            Floq: inteligencia artificial<br />para el campo real
          </h2>
          <p
            className="mt-5 text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--floq-slate)" }}
          >
            Tres pilares tecnológicos que transforman cómo se maneja el ganado en Latinoamérica — accesibles desde cualquier smartphone.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.tag} className="solution-card flex flex-col p-7">
              {/* Icon */}
              <div
                className="w-11 h-11 flex items-center justify-center mb-5"
                style={{
                  background: "var(--floq-mist)",
                  color: "var(--floq-grass)",
                  borderRadius: "var(--radius-md)",
                }}
              >
                {f.icon}
              </div>

              {/* Tag / badge */}
              <span
                className="inline-flex self-start text-xs font-semibold px-3 py-1 mb-4"
                style={{
                  background: "var(--floq-mist)",
                  color: "var(--floq-grass)",
                  border: "1px solid var(--floq-meadow)",
                  borderRadius: "var(--radius-full)",
                  letterSpacing: "0.02em",
                }}
              >
                {f.tag}
              </span>

              <h3
                className="type-heading mb-3 flex-1"
                style={{ color: "var(--floq-pine)", fontSize: "1.1rem", lineHeight: 1.3 }}
              >
                {f.title}
              </h3>

              <p
                className="leading-relaxed mb-6"
                style={{ color: "var(--floq-slate)", fontSize: "0.9rem" }}
              >
                {f.description}
              </p>

              {/* Highlight */}
              <div
                className="flex items-center gap-2 pt-5 mt-auto"
                style={{ borderTop: "1px solid var(--floq-cloud)" }}
              >
                <svg
                  className="w-4 h-4 shrink-0"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: "var(--floq-grass)" }}
                >
                  <path d="M3 8l3.5 3.5L13 4" />
                </svg>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--floq-grass)" }}
                >
                  {f.highlight}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
