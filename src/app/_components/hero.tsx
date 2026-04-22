"use client";

import { useState } from "react";

export default function Hero() {
  const [lang, setLang] = useState<"es" | "en">("es");

  const content = {
    es: {
      headline: "El futuro del campo,",
      headlineAccent: "hoy.",
      subheadline:
        "Cercado virtual y monitoreo de bienestar animal con inteligencia artificial — diseñado para el ganadero latinoamericano.",
      cta: "Solicitar acceso anticipado",
      disclaimer: "Sin tarjeta de crédito · Primeros 50 productores gratis",
      badge: "Acceso anticipado · Chile 2026",
    },
    en: {
      headline: "The future of farming,",
      headlineAccent: "today.",
      subheadline:
        "AI-powered virtual fencing and animal welfare monitoring — built for Latin American ranchers.",
      cta: "Request early access",
      disclaimer: "No credit card required · First 50 ranchers free",
      badge: "Early access · Chile 2026",
    },
  };

  const c = content[lang];

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-16 text-center overflow-hidden"
      style={{ background: "var(--floq-chalk)" }}
    >
      {/* Subtle radial gradient accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(39,103,63,0.07) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto w-full">
        {/* Language toggle */}
        <div
          className="inline-flex rounded-lg p-1 mb-10"
          style={{
            background: "var(--floq-paper)",
            border: "1px solid var(--floq-cloud)",
          }}
        >
          {(["es", "en"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className="px-4 py-1.5 rounded-md text-sm font-semibold transition-all"
              style={
                lang === l
                  ? {
                      background: "var(--floq-white)",
                      color: "var(--floq-pine)",
                      boxShadow: "var(--shadow-sm)",
                    }
                  : { color: "var(--floq-slate)" }
              }
            >
              {l === "es" ? "Español" : "English"}
            </button>
          ))}
        </div>

        {/* Live badge */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span
            className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2"
            style={{
              background: "var(--floq-mist)",
              color: "var(--floq-grass)",
              borderRadius: "var(--radius-full)",
              border: "1px solid var(--floq-meadow)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "var(--floq-grass)" }}
            />
            {c.badge}
          </span>
        </div>

        {/* Headline — Roboto Flex display */}
        <h1
          className="type-display mb-6"
          style={{
            fontSize: "clamp(3rem, 8vw, 5rem)",
            color: "var(--floq-ink)",
          }}
        >
          {c.headline}
          <br />
          <span style={{ color: "var(--floq-grass)" }}>{c.headlineAccent}</span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: "var(--floq-slate)" }}
        >
          {c.subheadline}
        </p>

        {/* CTA */}
        <a href="#waitlist" className="btn-primary text-base">
          {c.cta}
          <svg
            className="w-4 h-4"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </a>

        <p
          className="mt-5 text-sm"
          style={{ color: "var(--floq-fog)" }}
        >
          {c.disclaimer}
        </p>
      </div>

      {/* Stats bar */}
      <div
        className="relative w-full max-w-3xl mt-20 grid grid-cols-3 gap-px overflow-hidden"
        style={{
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--floq-cloud)",
          background: "var(--floq-cloud)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        {[
          { value: "80%", label: "ahorro en cercos" },
          { value: "24/7", label: "monitoreo continuo" },
          { value: "40%", label: "menos pérdidas" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center py-5 px-4"
            style={{ background: "var(--floq-white)" }}
          >
            <span
              className="type-heading text-2xl"
              style={{ color: "var(--floq-grass)" }}
            >
              {stat.value}
            </span>
            <span
              className="text-xs font-medium mt-1 text-center"
              style={{ color: "var(--floq-slate)" }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        style={{ color: "var(--floq-cloud)" }}
        aria-hidden="true"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
