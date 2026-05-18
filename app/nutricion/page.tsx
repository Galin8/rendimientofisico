import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumb from "@/components/Breadcrumb";
import AdSense from "@/components/AdSense";
import { getArticlesByCategory } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Nutrición Deportiva: Guías y Consejos para Atletas",
  description:
    "Aprende sobre nutrición deportiva, dieta para CrossFit, macros para ganar músculo y estrategias de alimentación basadas en evidencia científica.",
  alternates: { canonical: "https://rendimientofisico.es/nutricion" },
  openGraph: {
    title: "Nutrición Deportiva — Rendimiento Físico",
    description:
      "Guías completas sobre alimentación deportiva, macros, timing de nutrientes y dietas para mejorar tu rendimiento.",
    url: "https://rendimientofisico.es/nutricion",
    images: [{ url: "/images/nutricion/og-nutricion.webp", width: 1200, height: 630, alt: "Nutrición deportiva" }],
  },
};

const categorySchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Nutrición Deportiva",
  description: "Guías de nutrición para deportistas y atletas",
  url: "https://rendimientofisico.es/nutricion",
  isPartOf: { "@type": "WebSite", url: "https://rendimientofisico.es" },
};

export default function NutricionPage() {
  const articles = getArticlesByCategory("nutricion");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
      />
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumb items={[{ label: "Nutrición" }]} />

        <header className="mb-10">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-brand-dark mb-4">
            Nutrición Deportiva
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            Todo lo que necesitas saber sobre alimentación deportiva: macros,
            timing de nutrientes, dietas específicas y estrategias nutricionales
            basadas en evidencia para mejorar tu rendimiento y composición
            corporal.
          </p>
        </header>

        <AdSense slot="1111111111" />

        {articles.length > 0 ? (
          <section aria-labelledby="articles-nutricion">
            <h2 id="articles-nutricion" className="font-display font-bold text-2xl mb-6 text-gray-900">
              Artículos de nutrición
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

        <AdSense slot="1111111112" className="mt-8" />
      </main>
      <Footer />
    </>
  );
}
