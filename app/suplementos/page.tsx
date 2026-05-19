import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumb from "@/components/Breadcrumb";
import AdSense from "@/components/AdSense";
import { getArticlesByCategory } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Suplementos Deportivos: Qué Funciona y Qué No",
  description:
    "Guías sobre creatina, proteína whey, cafeína y otros suplementos deportivos. Evidencia científica sobre qué suplementos realmente funcionan.",
  alternates: { canonical: "https://rendimientofisico.com/suplementos" },
  openGraph: {
    title: "Suplementos Deportivos — Rendimiento Físico",
    description:
      "Creatina, proteína whey, cafeína y más. Guías basadas en evidencia sobre suplementación deportiva.",
    url: "https://rendimientofisico.com/suplementos",
    images: [{ url: "/images/suplementos/og-suplementos.webp", width: 1200, height: 630, alt: "Suplementos deportivos" }],
  },
};

const categorySchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Suplementos Deportivos",
  description: "Guías sobre suplementación deportiva basadas en evidencia",
  url: "https://rendimientofisico.com/suplementos",
  isPartOf: { "@type": "WebSite", url: "https://rendimientofisico.com" },
};

export default function SuplementosPage() {
  const articles = getArticlesByCategory("suplementos");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
      />
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumb items={[{ label: "Suplementos" }]} />

        <header className="mb-10">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-brand-dark mb-4">
            Suplementos Deportivos
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            Creatina, proteína whey, cafeína, beta-alanina y más. Analizamos
            la evidencia científica detrás de cada suplemento para que tomes
            decisiones informadas sin gastar dinero en productos ineficaces.
          </p>
        </header>

        <AdSense slot="3333333331" />

        {articles.length > 0 ? (
          <section aria-labelledby="articles-suplementos">
            <h2 id="articles-suplementos" className="font-display font-bold text-2xl mb-6 text-gray-900">
              Artículos sobre suplementos
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

        <AdSense slot="3333333332" className="mt-8" />
      </main>
      <Footer />
    </>
  );
}
