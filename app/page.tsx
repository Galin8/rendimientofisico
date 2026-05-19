import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import AdSense from "@/components/AdSense";
import { ArticleCardSkeleton } from "@/components/Skeleton";
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

// Async server component — enables streaming + Suspense boundary
async function RecentArticles() {
  const articles = getRecentArticles(6);
  if (articles.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard key={article.slug} {...article} />
      ))}
    </div>
  );
}

function ArticlesSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <ArticleCardSkeleton key={i} />
      ))}
    </div>
  );
}

const categories = [
  {
    id: "nutricion",
    label: "Nutrición",
    href: "/nutricion",
    description: "Macros, timing de nutrientes, dietas y alimentación para deportistas.",
    icon: "🥗",
    featured: true, // spans 2 cols on desktop
    bg: "bg-brand-dark",
    text: "text-white",
    descText: "text-green-200",
    chipBg: "bg-green-800",
    chipText: "text-brand-lime",
    stat: "12 artículos",
  },
  {
    id: "suplementos",
    label: "Suplementos",
    href: "/suplementos",
    description: "Creatina, whey, cafeína y lo que realmente funciona.",
    icon: "💊",
    featured: false,
    bg: "bg-white",
    text: "text-brand-dark",
    descText: "text-gray-500",
    chipBg: "bg-green-50",
    chipText: "text-brand-dark",
    stat: "9 artículos",
  },
  {
    id: "entrenamiento",
    label: "Entrenamiento",
    href: "/entrenamiento",
    description: "CrossFit, Hyrox, fuerza y movilidad.",
    icon: "💪",
    featured: false,
    bg: "bg-white",
    text: "text-brand-dark",
    descText: "text-gray-500",
    chipBg: "bg-green-50",
    chipText: "text-brand-dark",
    stat: "8 artículos",
  },
  {
    id: "perder-peso",
    label: "Perder Peso",
    href: "/perder-peso",
    description: "Déficit calórico, grasa visceral y pérdida de grasa sostenible.",
    icon: "🔥",
    featured: true, // spans 2 cols on desktop
    bg: "bg-green-50",
    text: "text-brand-dark",
    descText: "text-green-700",
    chipBg: "bg-white",
    chipText: "text-brand-dark",
    stat: "6 artículos",
  },
];

const stats = [
  { value: "30", label: "artículos" },
  { value: "4", label: "categorías" },
  { value: "100%", label: "basado en evidencia" },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="bg-brand-dark text-white pt-16 pb-12 md:pt-24 md:pb-16 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl">
              {/* Eyebrow */}
              <span className="inline-flex items-center gap-2 text-brand-lime font-display font-semibold text-sm uppercase tracking-widest mb-6">
                <span className="w-6 h-px bg-brand-lime" />
                Nutrición &amp; Entrenamiento
              </span>

              <h1 className="font-display font-bold text-5xl md:text-7xl leading-[1.05] mb-6">
                Mejora tu{" "}
                <span className="text-brand-lime">Rendimiento</span>
                <br />
                Físico
              </h1>
              <p className="text-green-200 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
                Nutrición deportiva, suplementación y entrenamiento
                basados en evidencia científica. Sin humo.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-12">
                <Link
                  href="/nutricion"
                  className="btn-primary text-base px-8 py-3.5"
                >
                  Explorar artículos
                </Link>
                <Link
                  href="/suplementos"
                  className="border-2 border-white/30 text-white font-display font-bold px-8 py-3.5 rounded-lg hover:bg-white/10 transition-colors text-base"
                >
                  Ver suplementos
                </Link>
              </div>

              {/* Stats bar */}
              <div className="flex flex-wrap gap-8 pt-8 border-t border-green-800">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="font-display font-bold text-2xl text-white">
                      {s.value}
                    </p>
                    <p className="text-green-400 text-sm">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── BENTO GRID CATEGORIES ────────────────────────────── */}
        <section className="bg-brand-gray py-14" aria-labelledby="categories-heading">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-8">
              <h2
                id="categories-heading"
                className="font-display font-bold text-2xl md:text-3xl text-gray-900"
              >
                Explora por categoría
              </h2>
              <span className="text-sm text-gray-400 hidden sm:block">
                {categories.reduce((acc, c) => acc + parseInt(c.stat), 0)} artículos
              </span>
            </div>

            {/* Bento grid — varied card sizes (UI UX Pro Max Bento pattern) */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              style={{ gridTemplateRows: "auto" }}
            >
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={cat.href}
                  className={[
                    "group relative rounded-2xl p-7 flex flex-col justify-between",
                    "min-h-[180px] border border-transparent",
                    "transition-all duration-200 ease-out",
                    "hover:scale-[1.02] hover:shadow-xl",
                    cat.bg,
                    // Featured cards span 2 cols on desktop
                    cat.featured ? "lg:col-span-2" : "lg:col-span-1",
                  ].join(" ")}
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between">
                    <span className="text-4xl">{cat.icon}</span>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cat.chipBg} ${cat.chipText}`}
                    >
                      {cat.stat}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="mt-6">
                    <h3
                      className={`font-display font-bold text-xl mb-1.5 ${cat.text}`}
                    >
                      {cat.label}
                    </h3>
                    <p className={`text-sm leading-relaxed ${cat.descText}`}>
                      {cat.description}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <span
                    className={`absolute bottom-7 right-7 text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${cat.text}`}
                    aria-hidden
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── ADSENSE POSICIÓN 1 ───────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AdSense slot="1234567890" />
        </div>

        {/* ── ARTÍCULOS RECIENTES + SKELETON ───────────────────── */}
        <section className="py-14" aria-labelledby="articles-heading">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-8">
              <h2
                id="articles-heading"
                className="font-display font-bold text-2xl md:text-3xl text-gray-900"
              >
                Artículos recientes
              </h2>
              <Link
                href="/nutricion"
                className="text-sm font-semibold text-brand-dark hover:text-green-700 transition-colors hidden sm:block"
              >
                Ver todos →
              </Link>
            </div>

            {/* Suspense boundary — skeleton fills reserved space = no CLS */}
            <Suspense fallback={<ArticlesSkeletonGrid />}>
              <RecentArticles />
            </Suspense>
          </div>
        </section>

        {/* ── TRUST + CTA ──────────────────────────────────────── */}
        <section className="bg-brand-dark text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
                  Información basada
                  <br />
                  en <span className="text-brand-lime">evidencia</span>
                </h2>
                <p className="text-green-200 leading-relaxed mb-6">
                  Cada artículo está fundamentado en estudios científicos.
                  Sin pseudociencia, sin productos milagro.
                </p>
                <Link href="/sobre-nosotros" className="btn-primary">
                  Conoce el proyecto
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { n: "30+", t: "artículos publicados" },
                  { n: "100%", t: "fuentes citadas" },
                  { n: "4", t: "categorías" },
                  { n: "0", t: "suplementos milagro" },
                ].map((item) => (
                  <div
                    key={item.t}
                    className="bg-green-900/50 rounded-xl p-5 border border-green-800"
                  >
                    <p className="font-display font-bold text-3xl text-brand-lime">
                      {item.n}
                    </p>
                    <p className="text-green-300 text-sm mt-1">{item.t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
