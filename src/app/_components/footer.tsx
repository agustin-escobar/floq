export default function Footer() {
  return (
    <footer
      className="py-12 px-4"
      style={{ background: "var(--floq-pine)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* White logo */}
          <a href="/" aria-label="Floq inicio">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 290 86"
              fill="none"
              className="h-7 w-auto"
              aria-hidden="true"
            >
              <polygon
                points="79,43 61,74.2 25,74.2 7,43 25,11.8 61,11.8"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                fill="none"
                strokeLinejoin="round"
              />
              <polygon
                points="70,43 56.5,66.4 29.5,66.4 16,43 29.5,19.6 56.5,19.6"
                stroke="#FFFFFF"
                strokeWidth="4.5"
                fill="none"
                strokeLinejoin="round"
              />
              <text
                x="95"
                y="72"
                fontFamily="var(--font-roboto-flex), 'Roboto Flex', sans-serif"
                fontWeight="800"
                fontSize="78"
                fill="#FFFFFF"
                letterSpacing="-1"
                style={{ fontVariationSettings: "'wdth' 75, 'opsz' 144" }}
              >
                Floq
              </text>
              <circle cx="270" cy="65" r="9" fill="#72BB91" />
            </svg>
          </a>

          <div
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-sm"
            style={{ color: "var(--floq-sprout)", opacity: 0.75 }}
          >
            <a
              href="mailto:hola@floq.cl"
              className="transition-opacity hover:opacity-100"
              style={{ color: "inherit" }}
            >
              hola@floq.cl
            </a>
            <span className="hidden sm:block" style={{ color: "var(--floq-moss)" }}>|</span>
            <span>Chile · Latinoamérica</span>
          </div>
        </div>

        <div
          className="mt-8 pt-8 text-center text-xs"
          style={{
            borderTop: "1px solid rgba(114,187,145,0.15)",
            color: "var(--floq-sprout)",
            opacity: 0.45,
          }}
        >
          © {new Date().getFullYear()} Floq. Todos los derechos reservados. Hecho con amor para el campo latinoamericano.
        </div>
      </div>
    </footer>
  );
}
