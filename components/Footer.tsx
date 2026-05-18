import Link from "next/link";

const categories = [
  { label: "Nutrición", href: "/nutricion" },
  { label: "Entrenamiento", href: "/entrenamiento" },
  { label: "Suplementos", href: "/suplementos" },
  { label: "Perder Peso", href: "/perder-peso" },
];

const legal = [
  { label: "Sobre nosotros", href: "/sobre-nosotros" },
  { label: "Contacto", href: "/contacto" },
  { label: "Política de privacidad", href: "/politica-de-privacidad" },
  { label: "Aviso legal", href: "/aviso-legal" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="font-display font-bold text-lg">
              Rendimiento<span className="text-brand-lime">Físico</span>
            </Link>
            <p className="mt-3 text-sm text-green-200 leading-relaxed">
              Guías de nutrición deportiva, suplementación y entrenamiento
              basadas en evidencia científica.
            </p>
          </div>

          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-brand-lime mb-4">
              Categorías
            </h3>
            <ul className="space-y-2">
              {categories.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-green-200 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-brand-lime mb-4">
              Información
            </h3>
            <ul className="space-y-2">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-green-200 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-green-700 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-green-400">
            © {new Date().getFullYear()} RendimientoFísico.es — Todos los derechos reservados
          </p>
          <p className="text-xs text-green-500">
            La información de este sitio es orientativa. Consulta con un profesional de la salud.
          </p>
        </div>
      </div>
    </footer>
  );
}
