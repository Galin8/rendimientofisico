import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre Nosotros — Rendimiento Físico",
  description:
    "Conoce el proyecto detrás de Rendimiento Físico: quiénes somos, por qué lo creamos y nuestro compromiso con la evidencia científica en nutrición deportiva y entrenamiento.",
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
    title: "Sin productos milagro",
    text: "No vendemos suplementos, no tenemos acuerdos de patrocinio encubiertos y no recomendamos productos sin evidencia. Si un suplemento no funciona según la literatura científica, lo decimos directamente.",
  },
  {
    icon: "🗣️",
    title: "Lenguaje claro",
    text: "Traducimos estudios científicos a consejos prácticos y aplicables. Nuestros lectores no necesitan un doctorado para entender cómo mejorar su nutrición o su entrenamiento.",
  },
  {
    icon: "⚖️",
    title: "Honestidad sobre la incertidumbre",
    text: "La ciencia del deporte evoluciona. Cuando los estudios son contradictorios o la evidencia es limitada, lo indicamos. Preferimos la honestidad a la confianza falsa.",
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
            Somos un equipo apasionado por el deporte y la nutrición que decidió
            crear el recurso que nos hubiera gustado tener cuando empezamos a
            entrenar: información honesta, práctica y respaldada por evidencia
            científica real.
          </p>
        </section>

        {/* Origin */}
        <section className="mb-12 bg-brand-gray rounded-2xl p-8">
          <h2 className="font-display font-bold text-2xl text-brand-dark mb-4">
            Por qué existe este proyecto
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Internet está lleno de "expertos en fitness" que venden
              suplementos de dudosa eficacia, programas de entrenamiento sin
              base científica y dietas milagrosas que contradicen décadas de
              investigación. Encontrar información fiable entre tanto ruido es
              cada vez más difícil.
            </p>
            <p>
              Rendimiento Físico nació para ser lo contrario: un sitio donde
              cada guía, cada recomendación y cada análisis de suplementos esté
              anclado en lo que la ciencia del deporte realmente dice, con
              referencias claras y sin conflictos de interés.
            </p>
            <p>
              Nuestro público son personas de 20 a 45 años que entrenan con
              seriedad — CrossFit, Hyrox, fuerza, running — y quieren optimizar
              su nutrición y su entrenamiento sin perder el tiempo con
              información de mala calidad.
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
            Aviso importante
          </h2>
          <p className="text-sm text-amber-700 leading-relaxed">
            La información publicada en Rendimiento Físico tiene carácter
            educativo y orientativo. No sustituye al consejo médico, ni al de
            un dietista-nutricionista o un entrenador personal cualificado.
            Consulta siempre con un profesional de la salud antes de realizar
            cambios significativos en tu alimentación, suplementación o
            programa de entrenamiento.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
