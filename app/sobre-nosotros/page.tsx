import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Sobre Nosotros — Rendimiento Físico",
  description:
    "Conoce al equipo detrás de Rendimiento Físico. Expertos en nutrición deportiva, entrenamiento y suplementación comprometidos con la evidencia científica.",
  alternates: { canonical: "https://rendimientofisico.es/sobre-nosotros" },
  openGraph: {
    title: "Sobre Nosotros — Rendimiento Físico",
    description: "Equipo de expertos en nutrición deportiva y entrenamiento basado en evidencia.",
    url: "https://rendimientofisico.es/sobre-nosotros",
  },
};

export default function SobreNosotrosPage() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumb items={[{ label: "Sobre nosotros" }]} />

        <article className="prose prose-lg max-w-none">
          <h1 className="font-display font-bold text-4xl text-brand-dark mb-6">
            Sobre Rendimiento Físico
          </h1>

          <p>
            <strong>Rendimiento Físico</strong> nació con un objetivo claro:
            ofrecer información sobre nutrición deportiva, entrenamiento y
            suplementación que esté respaldada por evidencia científica real,
            sin humo ni productos milagro.
          </p>

          <h2>Nuestra misión</h2>
          <p>
            Ayudar a personas de 20 a 45 años a mejorar su físico y rendimiento
            deportivo con información honesta, práctica y actualizada. Creemos
            que la ciencia del deporte y la nutrición debe ser accesible para
            todos, sin necesidad de ser un investigador para entenderla.
          </p>

          <h2>Qué encontrarás aquí</h2>
          <ul>
            <li>
              <strong>Nutrición deportiva:</strong> dietas, macros, timing de
              nutrientes y estrategias alimentarias para atletas y deportistas.
            </li>
            <li>
              <strong>Entrenamiento:</strong> CrossFit, Hyrox, fuerza e
              hipertrofia. Programas y metodologías que funcionan.
            </li>
            <li>
              <strong>Suplementos:</strong> análisis honesto de qué
              suplementos tienen evidencia sólida y cuáles no merecen tu
              dinero.
            </li>
            <li>
              <strong>Pérdida de grasa:</strong> estrategias de déficit
              calórico, recomposición corporal y pérdida de peso sostenible.
            </li>
          </ul>

          <h2>Nuestro compromiso</h2>
          <p>
            Toda la información publicada en Rendimiento Físico se basa en
            estudios científicos revisados por pares y en las recomendaciones
            de organismos internacionales de salud y deporte. Cuando la
            evidencia es limitada o contradictoria, lo decimos claramente.
          </p>

          <p>
            La información de este sitio es orientativa y educativa. Consulta
            siempre con un profesional de la salud, médico o dietista-nutricionista
            antes de realizar cambios significativos en tu alimentación o
            entrenamiento.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
