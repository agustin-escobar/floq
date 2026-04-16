const problems = [
  {
    icon: "💸",
    title: "Cercos físicos: un costo enorme",
    description:
      "Instalar y mantener cercos físicos en predios extensos cuesta millones de pesos por kilómetro. Un costo fijo que frena la expansión y drena la rentabilidad.",
  },
  {
    icon: "👨‍🌾",
    title: "Gestión manual e ineficiente",
    description:
      "El monitoreo del ganado depende de recorridas a caballo o en vehículo que consumen horas de trabajo. Cuando notas un problema, ya es tarde.",
  },
  {
    icon: "🐄",
    title: "Bienestar animal sin visibilidad",
    description:
      "Las enfermedades y el estrés en el ganado se detectan tarde. Sin datos en tiempo real, los productores toman decisiones a ciegas y pierden animales evitablemente.",
  },
  {
    icon: "🌿",
    title: "Pastoreo sin optimización",
    description:
      "La rotación de potreros se hace por intuición, no por datos. El sobrepastoreo degrada el suelo; el subpastoreo desperdicia recursos. Ambos cuestan dinero.",
  },
];

export default function Problem() {
  return (
    <section className="py-24 px-4 bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-green-400 font-semibold text-sm uppercase tracking-widest">
            El problema
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-white">
            La ganadería tradicional tiene un costo oculto enorme
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
            Los métodos del siglo pasado siguen dominando el campo latinoamericano — y le cuestan a los productores tiempo, dinero y animales.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {problems.map((p) => (
            <div
              key={p.title}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-colors"
            >
              <div className="text-4xl mb-4">{p.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
              <p className="text-gray-400 leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
