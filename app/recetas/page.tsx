import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumb from "@/components/Breadcrumb";
import AdSense from "@/components/AdSense";
import { getArticlesByCategory } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Recetas para Deportistas: Altas en Proteína y Fáciles",
  description:
    "Recetas de cocina para deportistas: batidos proteicos, meal prep semanal, snacks altos en proteína y desayunos pre-entrenamiento basados en evidencia nutricional.",
  alternates: { canonical: "https://rendimientofisico.com/recetas" },
  openGraph: {
    title: "Recetas para Deportistas — Rendimiento Físico",
    description:
      "Recetas prácticas y nutritivas para CrossFitters y deportistas: meal prep, batidos, snacks y más.",
    url: "https://rendimientofisico.com/recetas",
    images: [{ url: "/images/og-home.webp", width: 1200, height: 630, alt: "Recetas para deportistas" }],
  },
};

const categorySchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Recetas para Deportistas",
  description: "Recetas nutritivas y prácticas para deportistas",
  url: "https://rendimientofisico.com/recetas",
  isPartOf: { "@type": "WebSite", url: "https://rendimientofisico.com" },
};

export default function RecetasPage() {
  const articles = getArticlesByCategory("recetas");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
      />
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumb items={[{ label: "Recetas" }]} />

        <header className="mb-10">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-brand-dark mb-4">
            Recetas para Deportistas
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            Recetas prácticas y con base nutricional sólida: meal prep semanal,
            batidos proteicos, snacks de alta proteína y desayunos pre-entrenamiento.
            Diseñadas para deportistas que entrenan CrossFit, fuerza o Hyrox y
            quieren optimizar su alimentación sin pasar horas en la cocina.
          </p>
        </header>

        <AdSense slot="1111111111" />

        {articles.length > 0 ? (
          <section aria-labelledby="articles-recetas">
            <h2 id="articles-recetas" className="font-display font-bold text-2xl mb-6 text-gray-900">
              Recetas y preparación de comidas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.slug} {...article} />
              ))}
            </div>
          </section>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">Próximamente — recetas en preparación.</p>
          </div>
        )}

        <AdSense slot="1111111112" className="mt-8" />
      </main>
      <Footer />
    </>
  );
}
