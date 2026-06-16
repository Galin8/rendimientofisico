import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { getAllArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Victor Garcia — Autor en Rendimiento Físico",
  description:
    "Victor Garcia es fundador de rendimientofisico.com, practicante de CrossFit y apasionado de la nutrición deportiva basada en evidencia.",
  alternates: { canonical: "https://rendimientofisico.com/autor/victor-garcia" },
  openGraph: {
    title: "Victor Garcia — Autor en Rendimiento Físico",
    description:
      "Victor Garcia es fundador de rendimientofisico.com, practicante de CrossFit y apasionado de la nutrición deportiva basada en evidencia.",
    url: "https://rendimientofisico.com/autor/victor-garcia",
  },
};

const authorSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Victor Garcia",
  url: "https://rendimientofisico.com/autor/victor-garcia",
  jobTitle: "Fundador y Editor",
  worksFor: {
    "@type": "Organization",
    name: "Rendimiento Físico",
    url: "https://rendimientofisico.com",
  },
  description:
    "Practicante de CrossFit, entusiasta de la nutrición deportiva y fundador de rendimientofisico.com.",
  knowsAbout: [
    "Nutrición deportiva",
    "CrossFit",
    "Suplementación",
    "Pérdida de grasa",
    "Entrenamiento de fuerza",
  ],
};

export default function VictorGarciaPage() {
  const allArticles = getAllArticles();
  const authorArticles = allArticles
    .filter((a) => a.author === "Victor Garcia")
    .slice(0, 6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }}
      />
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-gray-400 mb-8">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-brand-dark transition-colors">
                Inicio
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-gray-600 font-medium">Victor Garcia</li>
          </ol>
        </nav>

        {/* Author card */}
        <section className="bg-brand-dark text-white rounded-2xl p-8 md:p-10 mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar placeholder */}
            <div className="shrink-0 w-24 h-24 rounded-full bg-brand-lime flex items-center justify-center text-brand-dark font-display font-bold text-3xl">
              VG
            </div>

            <div>
              <p className="text-brand-lime font-display font-semibold text-sm uppercase tracking-widest mb-2">
                Fundador &amp; Editor
              </p>
              <h1 className="font-display font-bold text-3xl md:text-4xl mb-4">
                Victor Garcia
              </h1>
              <p className="text-green-200 leading-relaxed max-w-2xl">
                Practicante de CrossFit desde 2018, entreno tres veces por semana
                combinando fuerza y trabajo metabólico. Fundé Rendimiento Físico
                por frustración con los mitos que circulan en el mundo fitness:
                suplementos inútiles vendidos como imprescindibles, dietas de moda
                sin base científica y consejos de entrenamiento que no diferencian
                entre principiantes y atletas avanzados.
              </p>
            </div>
          </div>
        </section>

        {/* About sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <section>
            <h2 className="font-display font-bold text-xl text-gray-900 mb-4">
              Sobre el proyecto
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Rendimiento Físico nació en 2024 con un objetivo claro: publicar
              contenido de nutrición deportiva y entrenamiento que esté respaldado
              por la evidencia científica disponible. Cada artículo parte de la
              literatura revisada por pares — estudios publicados en revistas como
              el <em>Journal of the International Society of Sports Nutrition</em>,{" "}
              <em>British Journal of Sports Medicine</em> o{" "}
              <em>Medicine &amp; Science in Sports &amp; Exercise</em>.
            </p>
            <p className="text-gray-600 leading-relaxed">
              El enfoque es práctico: la evidencia traducida a recomendaciones
              aplicables por una persona que entrena CrossFit tres veces a la
              semana, trabaja jornada completa y no tiene tiempo para complicar
              la nutrición.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-gray-900 mb-4">
              Mi enfoque de entrenamiento
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="text-brand-lime font-bold mt-0.5">→</span>
                <span>
                  <strong className="text-gray-800">CrossFit 3×/semana</strong> —
                  entrenamiento concurrente de fuerza y cardio, con especial
                  atención a los movimientos olímpicos y los WODs de media
                  duración.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-lime font-bold mt-0.5">→</span>
                <span>
                  <strong className="text-gray-800">Nutrición basada en macros</strong> —
                  proteína alta (1,8–2,0 g/kg), carbohidratos periworkout,
                  sin contar calorías de forma obsesiva.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-lime font-bold mt-0.5">→</span>
                <span>
                  <strong className="text-gray-800">Suplementación mínima</strong> —
                  creatina monohidrato, proteína whey como complemento cuando
                  la dieta no cubre los requerimientos, y cafeína antes de las
                  sesiones más exigentes.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-lime font-bold mt-0.5">→</span>
                <span>
                  <strong className="text-gray-800">Recuperación activa</strong> —
                  movilidad y zona 2 los días de descanso, con especial atención
                  al sueño como principal herramienta de recuperación.
                </span>
              </li>
            </ul>
          </section>
        </div>

        {/* Editorial criteria */}
        <section className="bg-green-50 rounded-2xl p-8 mb-12">
          <h2 className="font-display font-bold text-xl text-gray-900 mb-4">
            Criterios editoriales
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Todo el contenido de Rendimiento Físico sigue el mismo proceso:
          </p>
          <ol className="space-y-3 text-gray-600">
            <li className="flex items-start gap-3">
              <span className="bg-brand-dark text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <span>
                <strong className="text-gray-800">Revisión de la evidencia</strong> —
                búsqueda en PubMed y Google Scholar de los estudios más relevantes
                y recientes sobre cada tema.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-brand-dark text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <span>
                <strong className="text-gray-800">Evaluación de la calidad</strong> —
                se priorizan meta-análisis y revisiones sistemáticas sobre estudios
                individuales, y estudios en humanos sobre modelos animales.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-brand-dark text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <span>
                <strong className="text-gray-800">Traducción práctica</strong> —
                las conclusiones se traducen a recomendaciones específicas con los
                números que importan: dosis, timing, frecuencia.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-brand-dark text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                4
              </span>
              <span>
                <strong className="text-gray-800">Actualización periódica</strong> —
                los artículos se revisan cuando nueva evidencia relevante lo
                justifica.
              </span>
            </li>
          </ol>
          <p className="text-sm text-gray-500 mt-4">
            El contenido de este sitio es informativo y no sustituye el consejo
            médico o dietético profesional. Consulta a un profesional de la salud
            antes de realizar cambios significativos en tu dieta o entrenamiento.
          </p>
        </section>

        {/* Recent articles */}
        {authorArticles.length > 0 && (
          <section>
            <h2 className="font-display font-bold text-2xl text-gray-900 mb-6">
              Artículos recientes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {authorArticles.map((article) => (
                <ArticleCard key={article.slug} {...article} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/nutricion"
                className="btn-primary"
              >
                Ver todos los artículos
              </Link>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
