import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumb from "@/components/Breadcrumb";
import AdSense from "@/components/AdSense";
import { getArticlesByCategory } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Entrenamiento: CrossFit, Hyrox y Rutinas de Fuerza",
  description:
    "Guías de entrenamiento para CrossFit, Hyrox, rutinas de fuerza y metodologías de rendimiento físico. Programas basados en ciencia del ejercicio.",
  alternates: { canonical: "https://rendimientofisico.com/entrenamiento" },
  openGraph: {
    title: "Entrenamiento Deportivo — Rendimiento Físico",
    description:
      "CrossFit, Hyrox, rutinas de fuerza y metodologías de entrenamiento para mejorar tu rendimiento físico.",
    url: "https://rendimientofisico.com/entrenamiento",
    images: [{ url: "/images/entrenamiento/og-entrenamiento.webp", width: 1200, height: 630, alt: "Entrenamiento deportivo" }],
  },
};

const categorySchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Entrenamiento Deportivo",
  description: "Guías de CrossFit, Hyrox y rutinas de fuerza",
  url: "https://rendimientofisico.com/entrenamiento",
  isPartOf: { "@type": "WebSite", url: "https://rendimientofisico.com" },
};

export default function EntrenamientoPage() {
  const articles = getArticlesByCategory("entrenamiento");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
      />
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumb items={[{ label: "Entrenamiento" }]} />

        <header className="mb-10">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-brand-dark mb-4">
            Entrenamiento
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            CrossFit, Hyrox, rutinas de fuerza e hipertrofia. Metodologías de
            entrenamiento respaldadas por la ciencia del ejercicio para que
            progreses de forma inteligente y sostenida.
          </p>
        </header>

        <AdSense slot="2222222221" />

        {articles.length > 0 ? (
          <section aria-labelledby="articles-entrenamiento">
            <h2 id="articles-entrenamiento" className="font-display font-bold text-2xl mb-6 text-gray-900">
              Artículos de entrenamiento
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.slug} {...article} />
              ))}
            </div>
          </section>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">Próximamente — artículos en preparación.</p>
          </div>
        )}

        <AdSense slot="2222222222" className="mt-8" />
      </main>
      <Footer />
    </>
  );
}
