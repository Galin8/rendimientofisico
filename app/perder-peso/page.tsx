import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumb from "@/components/Breadcrumb";
import AdSense from "@/components/AdSense";
import { getArticlesByCategory } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Perder Peso: Déficit Calórico y Pérdida de Grasa Efectiva",
  description:
    "Estrategias basadas en evidencia para perder grasa sin perder músculo. Déficit calórico, recomposición corporal y pérdida de peso sostenible.",
  alternates: { canonical: "https://rendimientofisico.es/perder-peso" },
  openGraph: {
    title: "Perder Peso y Grasa — Rendimiento Físico",
    description:
      "Déficit calórico, recomposición corporal y pérdida de grasa sostenible. Guías basadas en evidencia científica.",
    url: "https://rendimientofisico.es/perder-peso",
    images: [{ url: "/images/perder-peso/og-perder-peso.webp", width: 1200, height: 630, alt: "Perder peso y grasa" }],
  },
};

const categorySchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Perder Peso y Grasa",
  description: "Estrategias de pérdida de grasa y recomposición corporal",
  url: "https://rendimientofisico.es/perder-peso",
  isPartOf: { "@type": "WebSite", url: "https://rendimientofisico.es" },
};

export default function PerderPesoPage() {
  const articles = getArticlesByCategory("perder-peso");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
      />
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumb items={[{ label: "Perder Peso" }]} />

        <header className="mb-10">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-brand-dark mb-4">
            Perder Peso
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            Déficit calórico, recomposición corporal y pérdida de grasa
            sostenible. Sin dietas milagro ni restricciones extremas. Solo
            estrategias que la ciencia ha demostrado que funcionan.
          </p>
        </header>

        <AdSense slot="4444444441" />

        {articles.length > 0 ? (
          <section aria-labelledby="articles-perder-peso">
            <h2 id="articles-perder-peso" className="font-display font-bold text-2xl mb-6 text-gray-900">
              Artículos sobre pérdida de peso
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

        <AdSense slot="4444444442" className="mt-8" />
      </main>
      <Footer />
    </>
  );
}
