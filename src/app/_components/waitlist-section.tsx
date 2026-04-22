import WaitlistForm from "./waitlist-form";

export default function WaitlistSection() {
  return (
    <section
      id="waitlist"
      className="py-24 px-4"
      style={{ background: "var(--floq-mist)" }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--floq-grass)", letterSpacing: "0.1em" }}
          >
            Acceso anticipado
          </span>
          <h2
            className="type-heading mt-4"
            style={{
              color: "var(--floq-ink)",
              fontSize: "clamp(2rem, 5vw, 2.8rem)",
            }}
          >
            Sé el primero en el campo
          </h2>
          <p
            className="mt-4 text-lg leading-relaxed"
            style={{ color: "var(--floq-slate)" }}
          >
            Lanzamos en Chile en 2026. Los primeros 50 productores tendrán acceso gratuito y ayudarán a moldear el producto.
          </p>
        </div>

        <div
          className="p-8 sm:p-10"
          style={{
            background: "var(--floq-white)",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--floq-cloud)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
