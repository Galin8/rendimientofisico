import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import AdSense from "@/components/AdSense";
import { getRecentArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Rendimiento Físico — Nutrición y Entrenamiento Deportivo",
  description:
    "Guías de nutrición deportiva, suplementación, CrossFit y pérdida de grasa basadas en evidencia. Mejora tu rendimiento y físico.",
  alternates: { canonical: "https://rendimientofisico.com" },
  openGraph: {
    title: "Rendimiento Físico — Nutrición y Entrenamiento Deportivo",
    description:
      "Guías de nutrición deportiva, suplementación, CrossFit y pérdida de grasa basadas en evidencia.",
    url: "https://rendimientofisico.com",
    images: [
      {
        url: "/images/og-home.webp",
        width: 1200,
        height: 630,
        alt: "Rendimiento Físico — Nutrición y Entrenamiento",
      },
    ],
  },
};

const categories = [
  {
    label: "Nutrición",
    href: "/nutricion",
    description: "Dieta, macros, timing de nutrientes y alimentación para deportistas.",
    icon: "🥗",
    color: "bg-emerald-50 border-emerald-200",
    accent: "text-emerald-700",
  },
  {
    label: "Entrenamiento",
    href: "/entrenamiento",
    description: "CrossFit, Hyrox, rutinas de fuerza y metodologías de entrenamiento.",
    icon: "💪",
    color: "bg-blue-50 border-blue-200",
    accent: "text-blue-700",
  },
  {
    label: "Suplementos",
    href: "/suplementos",
    description: "Creatina, proteína whey, cafeína y los suplementos que realmente funcionan.",
    icon: "💊",
    color: "bg-purple-50 border-purple-200",
    accent: "text-purple-700",
  },
  {
    label: "Perder Peso",
    href: "/perder-peso",
    description: "Déficit calórico, estrategias de pérdida de grasa y composición corporal.",
    icon: "🔥",
    color: "bg-orange-50 border-orange-200",
    accent: "text-orange-700",
  },
];

export default async function HomePage() {
  const articles = getRecentArticles(6);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-brand-dark text-white py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="font-display font-bold text-4xl md:text-6xl leading-tight mb-6">
              Mejora tu{" "}
              <span className="text-brand-lime">Rendimiento Físico</span>
            </h1>
            <p className="text-green-200 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
              Nutrición deportiva, suplementación, entrenamiento y pérdida de
              grasa. Todo basado en evidencia, sin humo.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/nutricion" className="btn-primary">
                Empezar con nutrición
              </Link>
              <Link
                href="/suplementos"
                className="bg-transparent border-2 border-brand-lime text-brand-lime font-display font-bold px-6 py-3 rounded-lg hover:bg-brand-lime hover:text-brand-dark transition-colors"
              >
                Ver suplementos
              </Link>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 bg-brand-gray" aria-labelledby="categories-heading">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2
              id="categories-heading"
              className="font-display font-bold text-2xl md:text-3xl text-gray-900 mb-8 text-center"
            >
              Explora por categoría
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className={`block border rounded-xl p-6 hover:shadow-md transition-shadow ${cat.color}`}
                >
                  <span className="text-3xl mb-3 block" aria-hidden>
                    {cat.icon}
                  </span>
                  <h3 className={`font-display font-bold text-lg mb-2 ${cat.accent}`}>
                    {cat.label}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {cat.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* AdSense — posición 1 */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AdSense slot="1234567890" />
        </div>

        {/* Recent Articles */}
        {articles.length > 0 && (
          <section className="py-12" aria-labelledby="articles-heading">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <h2
                id="articles-heading"
                className="font-display font-bold text-2xl md:text-3xl text-gray-900 mb-8"
              >
                Artículos recientes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <ArticleCard key={article.slug} {...article} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Trust section */}
        <section className="bg-brand-dark text-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-4">
              Información basada en evidencia
            </h2>
            <p className="text-green-200 leading-relaxed mb-6">
              Cada guía está fundamentada en estudios científicos y revisada por
              profesionales del deporte y la nutrición. Sin pseudociencia, sin
              productos milagro.
            </p>
            <Link href="/sobre-nosotros" className="btn-primary">
              Conoce nuestro equipo
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
