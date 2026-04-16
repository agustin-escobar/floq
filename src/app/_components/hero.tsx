"use client";

import { useState } from "react";

export default function Hero() {
  const [lang, setLang] = useState<"es" | "en">("es");

  const content = {
    es: {
      headline: "El futuro del campo, hoy.",
      subheadline:
        "Cercado virtual y monitoreo de bienestar animal con inteligencia artificial — diseñado para el ganadero latinoamericano.",
      cta: "Solicitar acceso anticipado",
    },
    en: {
      headline: "The future of farming, today.",
      subheadline:
        "AI-powered virtual fencing and animal welfare monitoring — built for Latin American ranchers.",
      cta: "Request early access",
    },
  };

  const c = content[lang];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-16 bg-gradient-to-br from-green-50 via-white to-emerald-50 text-center">
      <div className="max-w-4xl mx-auto">
        {/* Language toggle */}
        <div className="inline-flex rounded-lg bg-gray-100 p-1 mb-12">
          <button
            onClick={() => setLang("es")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              lang === "es"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Español
          </button>
          <button
            onClick={() => setLang("en")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              lang === "en"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            English
          </button>
        </div>

        <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 text-sm font-medium px-4 py-2 rounded-full mb-8">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          {lang === "es" ? "Acceso anticipado — Chile 2026" : "Early access — Chile 2026"}
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
          {c.headline}
        </h1>

        <p className="text-xl sm:text-2xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          {c.subheadline}
        </p>

        <a
          href="#waitlist"
          className="inline-block bg-green-600 hover:bg-green-700 text-white text-lg font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5"
        >
          {c.cta} →
        </a>

        <p className="mt-6 text-sm text-gray-400">
          {lang === "es"
            ? "Sin tarjeta de crédito. Primeros 50 productores gratis."
            : "No credit card required. First 50 ranchers free."}
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-gray-300">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
