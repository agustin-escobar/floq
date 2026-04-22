const problems = [
  {
    number: "01",
    title: "Cercos físicos: un costo enorme",
    description:
      "Instalar y mantener cercos físicos en predios extensos cuesta millones de pesos por kilómetro. Un costo fijo que frena la expansión y drena la rentabilidad.",
  },
  {
    number: "02",
    title: "Gestión manual e ineficiente",
    description:
      "El monitoreo del ganado depende de recorridas a caballo o en vehículo que consumen horas de trabajo. Cuando notas un problema, ya es tarde.",
  },
  {
    number: "03",
    title: "Bienestar animal sin visibilidad",
    description:
      "Las enfermedades y el estrés en el ganado se detectan tarde. Sin datos en tiempo real, los productores toman decisiones a ciegas y pierden animales evitablemente.",
  },
  {
    number: "04",
    title: "Pastoreo sin optimización",
    description:
      "La rotación de potreros se hace por intuición, no por datos. El sobrepastoreo degrada el suelo; el subpastoreo desperdicia recursos. Ambos cuestan dinero.",
  },
];

export default function Problem() {
  return (
    <section
      className="py-24 px-4"
      style={{ background: "var(--floq-pine)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span
            className="text-xs font-semibold uppercase"
            style={{ color: "var(--floq-sprout)", letterSpacing: "0.1em" }}
          >
            El problema
          </span>
          <h2
            className="type-heading mt-4"
            style={{ color: "var(--floq-white)", fontSize: "clamp(2rem, 5vw, 3rem)" }}
          >
            La ganadería tradicional<br />tiene un costo oculto enorme
          </h2>
          <p
            className="mt-5 text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--floq-sprout)", opacity: 0.85 }}
          >
            Los métodos del siglo pasado siguen dominando el campo latinoamericano — y le cuestan a los productores tiempo, dinero y animales.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {problems.map((p) => (
            <div key={p.number} className="problem-card p-8">
              <span
                className="font-mono text-xs font-medium block mb-5"
                style={{ color: "var(--floq-moss)", letterSpacing: "0.08em" }}
              >
                {p.number}
              </span>
              <h3
                className="type-heading mb-3"
                style={{ color: "var(--floq-white)", fontSize: "1.2rem" }}
              >
                {p.title}
              </h3>
              <p
                className="leading-relaxed"
                style={{ color: "var(--floq-sprout)", opacity: 0.75, fontSize: "0.95rem" }}
              >
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
