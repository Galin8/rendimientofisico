import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre Nosotros — Rendimiento Físico",
  description:
    "Conoce el equipo de Rendimiento Físico: nuestra metodología editorial, proceso de investigación y compromiso con la evidencia científica en nutrición deportiva y entrenamiento.",
  alternates: { canonical: "https://rendimientofisico.com/sobre-nosotros" },
  openGraph: {
    title: "Sobre Nosotros — Rendimiento Físico",
    description:
      "Nutrición deportiva y entrenamiento basados en evidencia. Sin pseudociencia, sin productos milagro.",
    url: "https://rendimientofisico.com/sobre-nosotros",
  },
};

const values = [
  {
    icon: "🔬",
    title: "Evidencia antes que tendencias",
    text: "Cada afirmación que publicamos tiene respaldo en estudios revisados por pares. Cuando la evidencia es débil o contradictoria, lo decimos. No seguimos tendencias de redes sociales si la ciencia no las respalda.",
  },
  {
    icon: "🚫",
    title: "Sin conflictos de interés",
    text: "No vendemos suplementos, no tenemos acuerdos de patrocinio encubiertos y no recomendamos productos sin evidencia sólida. Si un suplemento no funciona según la literatura científica, lo decimos directamente.",
  },
  {
    icon: "🗣️",
    title: "Lenguaje claro y aplicable",
    text: "Traducimos estudios científicos a consejos prácticos. Nuestros lectores no necesitan un doctorado para entender cómo mejorar su nutrición o entrenamiento. La claridad es parte del rigor.",
  },
  {
    icon: "⚖️",
    title: "Honestidad sobre la incertidumbre",
    text: "La ciencia del deporte evoluciona constantemente. Cuando los estudios son contradictorios o la evidencia es limitada, lo indicamos con claridad. Preferimos la honestidad a la falsa seguridad.",
  },
];

const categories = [
  {
    label: "Nutrición deportiva",
    desc: "Macros, timing, dietas y estrategias alimentarias para deportistas.",
    href: "/nutricion",
  },
  {
    label: "Entrenamiento",
    desc: "CrossFit, Hyrox, fuerza funcional y periodización.",
    href: "/entrenamiento",
  },
  {
    label: "Suplementación",
    desc: "Análisis honesto de creatina, whey, cafeína y más.",
    href: "/suplementos",
  },
  {
    label: "Pérdida de grasa",
    desc: "Déficit calórico, metabolismo y recomposición corporal.",
    href: "/perder-peso",
  },
];

export default function SobreNosotrosPage() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumb items={[{ label: "Sobre nosotros" }]} />

        {/* Hero */}
        <section className="mb-12">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-brand-dark mb-5 leading-tight">
            Sobre Rendimiento Físico
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
            Somos un equipo especializado en ciencias del deporte y nutrición
            deportiva. Creamos Rendimiento Físico para ofrecer el recurso que
            nos hubiera gustado tener cuando empezamos a entrenar: información
            honesta, práctica y respaldada por evidencia científica real.
          </p>
        </section>

        {/* Mission */}
        <section className="mb-12 bg-brand-gray rounded-2xl p-8">
          <h2 className="font-display font-bold text-2xl text-brand-dark mb-4">
            Nuestra misión
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Internet está lleno de influencers de fitness que venden
              suplementos de dudosa eficacia, programas de entrenamiento sin
              base científica y dietas milagrosas que contradicen décadas de
              investigación. Encontrar información fiable entre tanto ruido es
              cada vez más difícil.
            </p>
            <p>
              Rendimiento Físico nació para ser lo contrario: un sitio donde
              cada guía, cada recomendación y cada análisis de suplementos esté
              anclado en lo que la ciencia del deporte realmente dice, con
              referencias claras y sin conflictos de interés. No tenemos marcas
              patrocinadoras que defender ni productos que vender.
            </p>
            <p>
              Nuestro público son personas de 20 a 45 años que entrenan con
              seriedad — CrossFit, Hyrox, fuerza, running — y quieren optimizar
              su nutrición y entrenamiento sin perder el tiempo con información
              de baja calidad.
            </p>
          </div>
        </section>

        {/* Editorial Process */}
        <section className="mb-12">
          <h2 className="font-display font-bold text-2xl text-brand-dark mb-6">
            Nuestro proceso editorial
          </h2>
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              Cada artículo publicado en Rendimiento Físico sigue un proceso
              estructurado de investigación y revisión antes de ser publicado.
              No publicamos artículos basados en opinión personal, experiencias
              individuales sin respaldo científico o contenido generado sin
              revisión experta.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  step: "01",
                  title: "Revisión de literatura",
                  desc: "Consultamos bases de datos científicas como PubMed, Google Scholar y Cochrane para identificar los estudios más relevantes y recientes sobre el tema.",
                },
                {
                  step: "02",
                  title: "Evaluación de evidencia",
                  desc: "Valoramos el tipo de estudio (metaanálisis, ensayos controlados, estudios observacionales), el tamaño de muestra y la calidad metodológica antes de extraer conclusiones.",
                },
                {
                  step: "03",
                  title: "Redacción y revisión",
                  desc: "El contenido se redacta priorizando la aplicabilidad práctica. Indicamos explícitamente cuándo la evidencia es limitada o los resultados son contradictorios.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-white border border-gray-100 rounded-2xl p-5"
                >
                  <span className="font-display font-bold text-3xl text-brand-dark/20 block mb-2">
                    {item.step}
                  </span>
                  <h3 className="font-display font-bold text-sm text-brand-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <p>
              Actualizamos los artículos cuando aparece nueva evidencia
              científica relevante. Si detectas un error o una afirmación sin
              respaldo, puedes notificárnoslo a través de la{" "}
              <Link
                href="/contacto"
                className="text-brand-dark font-semibold underline underline-offset-2 hover:opacity-80"
              >
                página de contacto
              </Link>{" "}
              con la referencia del estudio correspondiente.
            </p>
          </div>
        </section>

        {/* Team */}
        <section className="mb-12 bg-brand-gray rounded-2xl p-8">
          <h2 className="font-display font-bold text-2xl text-brand-dark mb-4">
            El equipo
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Rendimiento Físico es un proyecto creado y mantenido por un
              equipo con formación y experiencia práctica en ciencias del
              deporte, nutrición deportiva y entrenamiento de alto rendimiento.
              Nuestros redactores tienen conocimiento directo de los deportes
              que cubrimos — CrossFit, Hyrox, powerlifting y atletismo — además
              de formación académica en las áreas que tratamos.
            </p>
            <p>
              Los contenidos relacionados con nutrición clínica y suplementación
              son revisados con criterio técnico antes de su publicación para
              asegurar que las recomendaciones sean seguras y estén dentro del
              margen que la evidencia científica actual considera efectivo.
            </p>
            <p>
              No asociamos nombres individuales a los artículos para evitar
              crear figuras de autoridad artificiales. La credibilidad de
              Rendimiento Físico se apoya en la calidad y las referencias de
              cada contenido, no en personas individuales.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mb-12">
          <h2 className="font-display font-bold text-2xl text-brand-dark mb-6">
            Nuestros principios
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-sm transition-shadow"
              >
                <span className="text-3xl mb-3 block">{v.icon}</span>
                <h3 className="font-display font-bold text-base text-brand-dark mb-2">
                  {v.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What we cover */}
        <section className="mb-12">
          <h2 className="font-display font-bold text-2xl text-brand-dark mb-6">
            Qué encontrarás aquí
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="group flex gap-4 items-start p-5 border border-gray-100 rounded-xl hover:border-brand-dark hover:shadow-sm transition-all bg-white"
              >
                <div>
                  <p className="font-display font-bold text-brand-dark group-hover:underline">
                    {c.label}
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">{c.desc}</p>
                </div>
                <span className="ml-auto text-gray-300 group-hover:text-brand-dark transition-colors text-lg mt-0.5">
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <h2 className="font-display font-bold text-lg text-amber-800 mb-2">
            Aviso médico importante
          </h2>
          <p className="text-sm text-amber-700 leading-relaxed">
            La información publicada en Rendimiento Físico tiene carácter
            educativo y orientativo. No sustituye al consejo médico, ni al de
            un dietista-nutricionista colegiado o un entrenador personal
            cualificado. Consulta siempre con un profesional de la salud antes
            de realizar cambios significativos en tu alimentación,
            suplementación o programa de entrenamiento, especialmente si tienes
            condiciones médicas preexistentes.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
