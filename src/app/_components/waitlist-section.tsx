import WaitlistForm from "./waitlist-form";

export default function WaitlistSection() {
  return (
    <section id="waitlist" className="py-24 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">
            Acceso anticipado
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-gray-900">
            Sé el primero en el campo
          </h2>
          <p className="mt-4 text-gray-600 text-lg leading-relaxed">
            Estamos lanzando en Chile en 2026. Los primeros 50 productores tendrán acceso gratuito y ayudarán a moldear el producto.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-8 sm:p-10">
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
