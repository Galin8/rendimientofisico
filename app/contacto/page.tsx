import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Contacto — Rendimiento Físico",
  description:
    "Contacta con el equipo de Rendimiento Físico por email o redes sociales. Preguntas, colaboraciones o sugerencias de contenido.",
  alternates: { canonical: "https://rendimientofisico.com/contacto" },
  openGraph: {
    title: "Contacto — Rendimiento Físico",
    description: "Ponte en contacto con el equipo de Rendimiento Físico.",
    url: "https://rendimientofisico.com/contacto",
  },
};

export default function ContactoPage() {
  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <Breadcrumb items={[{ label: "Contacto" }]} />

        <h1 className="font-display font-bold text-4xl text-brand-dark mb-4">
          Contacto
        </h1>
        <p className="text-gray-600 mb-10 leading-relaxed">
          ¿Tienes preguntas, sugerencias de artículos o quieres colaborar?
          Escríbenos por cualquiera de estos canales.
        </p>

        <div className="space-y-4">
          {/* Email */}
          <a
            href="mailto:galindu8@gmail.com"
            className="flex items-center gap-4 p-5 rounded-2xl border border-gray-100 bg-white hover:border-brand-dark hover:shadow-md transition-all group"
          >
            <span className="text-2xl">✉️</span>
            <div>
              <p className="font-display font-bold text-brand-dark group-hover:underline">
                galindu8@gmail.com
              </p>
              <p className="text-sm text-gray-500">Email — respondemos en 48 h</p>
            </div>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/rendimientofisico"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5 rounded-2xl border border-gray-100 bg-white hover:border-brand-dark hover:shadow-md transition-all group"
          >
            <span className="text-2xl">📸</span>
            <div>
              <p className="font-display font-bold text-brand-dark group-hover:underline">
                @rendimientofisico
              </p>
              <p className="text-sm text-gray-500">Instagram</p>
            </div>
          </a>

          {/* X / Twitter */}
          <a
            href="https://x.com/rendimientofis"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5 rounded-2xl border border-gray-100 bg-white hover:border-brand-dark hover:shadow-md transition-all group"
          >
            <span className="text-2xl">𝕏</span>
            <div>
              <p className="font-display font-bold text-brand-dark group-hover:underline">
                @rendimientofis
              </p>
              <p className="text-sm text-gray-500">X (Twitter)</p>
            </div>
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
