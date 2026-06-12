import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import AdSense from "@/components/AdSense";
import MDXContent from "@/components/MDXContent";
import { getArticle, getArticlesByCategory } from "@/lib/articles";
import { type Category } from "@/lib/types";

const VALID_CATEGORIES: Category[] = [
  "nutricion",
  "entrenamiento",
  "suplementos",
  "perder-peso",
  "recetas",
];

const CATEGORY_LABELS: Record<Category, string> = {
  nutricion: "Nutrición",
  entrenamiento: "Entrenamiento",
  suplementos: "Suplementos",
  "perder-peso": "Perder Peso",
  recetas: "Recetas",
};

interface PageProps {
  params: { category: string; slug: string };
}

export async function generateStaticParams() {
  return VALID_CATEGORIES.flatMap((category) =>
    getArticlesByCategory(category).map((article) => ({
      category,
      slug: article.slug,
    }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = params;
  if (!VALID_CATEGORIES.includes(category as Category)) return {};

  const article = getArticle(category as Category, slug);
  if (!article) return {};

  const canonical = `https://rendimientofisico.com/${category}/${slug}`;

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title: article.title,
      description: article.description,
      url: canonical,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.imageAlt,
        },
      ],
    },
  };
}

export default function ArticlePage({ params }: PageProps) {
  const { category, slug } = params;

  if (!VALID_CATEGORIES.includes(category as Category)) notFound();

  const article = getArticle(category as Category, slug);
  if (!article) notFound();

  const categoryLabel = CATEGORY_LABELS[category as Category];
  const canonical = `https://rendimientofisico.com/${category}/${slug}`;
  const formattedDate = new Date(article.date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: `https://rendimientofisico.com${article.image}`,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Organization",
      name: article.author,
      url: "https://rendimientofisico.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Rendimiento Físico",
      url: "https://rendimientofisico.com",
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    keywords: article.keywords.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumb
          items={[
            { label: categoryLabel, href: `/${category}` },
            { label: article.title },
          ]}
        />

        {/* Article header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-display font-bold uppercase tracking-wider text-brand-dark bg-green-50 px-2 py-1 rounded">
              {categoryLabel}
            </span>
            <time dateTime={article.date} className="text-xs text-gray-400">
              {formattedDate}
            </time>
            <span className="text-xs text-gray-400">
              {article.readingTime} min de lectura
            </span>
          </div>

          <h1 className="font-display font-bold text-3xl md:text-4xl text-gray-900 leading-tight mb-4">
            {article.title}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            {article.description}
          </p>

          {/* Hero image — priority para LCP */}
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
            />
          </div>
        </header>

        {/* AdSense posición 1 — debajo del H1, antes del contenido */}
        <AdSense slot="5000000001" />

        {/* MDX content */}
        <article>
          <MDXContent source={article.content} />
        </article>

        {/* AdSense posición 3 — después del artículo */}
        <AdSense slot="5000000003" className="mt-8" />

        {/* Author & date footer */}
        <footer className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between text-sm text-gray-400">
          <span>Por {article.author}</span>
          <time dateTime={article.date}>{formattedDate}</time>
        </footer>
      </main>
      <Footer />
    </>
  );
}
