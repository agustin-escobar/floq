export default function Nav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-floq-cloud/60"
      style={{ background: "rgba(249,251,250,0.92)", backdropFilter: "blur(12px)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="/" aria-label="Floq inicio">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 290 86"
            fill="none"
            className="h-8 w-auto"
            aria-hidden="true"
          >
            <polygon
              points="79,43 61,74.2 25,74.2 7,43 25,11.8 61,11.8"
              stroke="#1A3D29"
              strokeWidth="1.5"
              fill="none"
              strokeLinejoin="round"
            />
            <polygon
              points="70,43 56.5,66.4 29.5,66.4 16,43 29.5,19.6 56.5,19.6"
              stroke="#1A3D29"
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
              fill="#1A3D29"
              letterSpacing="-1"
              style={{ fontVariationSettings: "'wdth' 75, 'opsz' 144" }}
            >
              Floq
            </text>
            <circle cx="270" cy="65" r="9" fill="#27673F" />
          </svg>
        </a>

        <div className="flex items-center gap-2">
          <a href="/demo" className="nav-demo-link text-sm font-semibold px-4 py-2 rounded-lg">
            Ver demo →
          </a>
          <a href="#waitlist" className="nav-cta text-sm font-semibold px-4 py-2">
            Acceso anticipado
          </a>
        </div>
      </div>
    </nav>
  );
}
