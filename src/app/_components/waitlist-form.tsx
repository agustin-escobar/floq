"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ID
  ? `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`
  : null;

const LATAM_COUNTRIES = [
  "Chile", "Argentina", "Brasil", "Colombia", "México",
  "Perú", "Uruguay", "Ecuador", "Bolivia", "Paraguay", "Venezuela", "Otro",
];

const COMPANY_SIZES = [
  { value: "1-50", label: "1–50 animales" },
  { value: "51-200", label: "51–200 animales" },
  { value: "201-500", label: "201–500 animales" },
  { value: "500+", label: "Más de 500 animales" },
];

const CHILE_REGIONS = [
  "Los Lagos", "Biobío", "Araucanía", "Los Ríos", "Maule",
  "Ñuble", "O'Higgins", "Metropolitana", "Otra región",
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "var(--radius-md)",
  border: "1px solid var(--floq-cloud)",
  background: "var(--floq-white)",
  color: "var(--floq-ink)",
  fontSize: "0.875rem",
  fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
  outline: "none",
  transition: "border-color var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out)",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.75rem",
  fontWeight: 600,
  color: "var(--floq-pine)",
  letterSpacing: "0.02em",
  marginBottom: "6px",
};

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} style={labelStyle}>
        {label}
      </label>
      {children}
    </div>
  );
}

function focusInput(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = "var(--floq-grass)";
  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(39,103,63,0.22)";
}

function blurInput(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = "var(--floq-cloud)";
  e.currentTarget.style.boxShadow = "none";
}

export default function WaitlistForm() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", companySize: "", country: "", region: "",
  });
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "country" && value !== "Chile" ? { region: "" } : {}),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    setError("");

    if (!FORMSPREE_ENDPOINT) {
      await new Promise((r) => setTimeout(r, 800));
      setState("success");
      return;
    }

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          "WhatsApp / Teléfono": form.phone,
          "Tamaño del rebaño": form.companySize,
          País: form.country,
          ...(form.region ? { Región: form.region } : {}),
        }),
      });
      if (res.ok) {
        setState("success");
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      setState("error");
      setError("Hubo un problema al enviar. Inténtalo de nuevo o escríbenos a hola@floq.cl");
    }
  };

  if (state === "success") {
    return (
      <div className="text-center py-12">
        <div
          className="w-16 h-16 mx-auto mb-6 flex items-center justify-center"
          style={{
            background: "var(--floq-mist)",
            borderRadius: "var(--radius-full)",
            color: "var(--floq-grass)",
          }}
        >
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3
          className="type-heading text-2xl mb-3"
          style={{ color: "var(--floq-pine)" }}
        >
          ¡Estás en la lista!
        </h3>
        <p style={{ color: "var(--floq-slate)" }} className="max-w-sm mx-auto leading-relaxed">
          Te contactaremos pronto con los detalles del acceso anticipado. Primeros 50 productores tienen acceso gratuito.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field id="name" label="Nombre completo">
          <input
            id="name" name="name" type="text" required
            value={form.name} onChange={handleChange}
            placeholder="Juan Pérez"
            style={inputStyle}
            onFocus={focusInput} onBlur={blurInput}
          />
        </Field>
        <Field id="email" label="Correo electrónico">
          <input
            id="email" name="email" type="email" required
            value={form.email} onChange={handleChange}
            placeholder="juan@predio.cl"
            style={inputStyle}
            onFocus={focusInput} onBlur={blurInput}
          />
        </Field>
      </div>

      <Field id="phone" label="WhatsApp / Teléfono">
        <input
          id="phone" name="phone" type="tel" required
          value={form.phone} onChange={handleChange}
          placeholder="+56 9 1234 5678"
          style={inputStyle}
          onFocus={focusInput} onBlur={blurInput}
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field id="companySize" label="Tamaño del rebaño">
          <select
            id="companySize" name="companySize" required
            value={form.companySize} onChange={handleChange}
            style={{ ...inputStyle, appearance: "none" as const, cursor: "pointer" }}
            onFocus={focusInput} onBlur={blurInput}
          >
            <option value="" disabled>Selecciona un rango</option>
            {COMPANY_SIZES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </Field>
        <Field id="country" label="País">
          <select
            id="country" name="country" required
            value={form.country} onChange={handleChange}
            style={{ ...inputStyle, appearance: "none" as const, cursor: "pointer" }}
            onFocus={focusInput} onBlur={blurInput}
          >
            <option value="" disabled>Selecciona tu país</option>
            {LATAM_COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
      </div>

      {form.country === "Chile" && (
        <Field id="region" label="Región">
          <select
            id="region" name="region" required={form.country === "Chile"}
            value={form.region} onChange={handleChange}
            style={{ ...inputStyle, appearance: "none" as const, cursor: "pointer" }}
            onFocus={focusInput} onBlur={blurInput}
          >
            <option value="" disabled>Selecciona tu región</option>
            {CHILE_REGIONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </Field>
      )}

      {error && (
        <p
          className="text-sm px-4 py-3"
          style={{
            color: "var(--floq-status-critical)",
            background: "#FAE5E5",
            border: "1px solid #F8CECE",
            borderRadius: "var(--radius-md)",
          }}
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full font-semibold text-base text-white transition-all"
        style={{
          background: state === "submitting" ? "var(--floq-moss)" : "var(--floq-grass)",
          borderRadius: "var(--radius-md)",
          padding: "13px 24px",
          cursor: state === "submitting" ? "not-allowed" : "pointer",
          transition: "background var(--duration-fast) var(--ease-out)",
          border: "none",
        }}
        onMouseOver={(e) => {
          if (state !== "submitting")
            e.currentTarget.style.background = "#1E5430";
        }}
        onMouseOut={(e) => {
          if (state !== "submitting")
            e.currentTarget.style.background = "var(--floq-grass)";
        }}
      >
        {state === "submitting" ? "Enviando..." : "Solicitar acceso anticipado →"}
      </button>

      <p
        className="text-center text-xs"
        style={{ color: "var(--floq-fog)" }}
      >
        Sin spam. Solo actualizaciones de Floq. Cancela cuando quieras.
      </p>
    </form>
  );
}
