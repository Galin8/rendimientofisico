import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Contacto — Rendimiento Físico",
  description:
    "Contacta con el equipo de Rendimiento Físico. Preguntas sobre artículos, colaboraciones o sugerencias de contenido.",
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
          ¿Tienes preguntas sobre algún artículo, quieres sugerir un tema o
          estás interesado en colaborar con nosotros? Escríbenos y te
          respondemos en un máximo de 48 horas.
        </p>

        <div className="bg-brand-gray rounded-2xl p-8">
          <p className="text-sm font-display font-semibold uppercase tracking-wider text-gray-500 mb-2">
            Email de contacto
          </p>
          <p className="font-display font-bold text-xl text-brand-dark">
            contacto@rendimientofisico.com
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Respondemos en un máximo de 48 horas laborables.
          </p>
        </div>

        <div className="mt-8 space-y-3 text-sm text-gray-500">
          <p>
            <strong className="text-gray-700">Colaboraciones y prensa:</strong>{" "}
            Si eres marca, medio o profesional del sector y quieres colaborar,
            indícalo en el asunto del email.
          </p>
          <p>
            <strong className="text-gray-700">Correcciones:</strong> Si
            detectas un error en alguno de nuestros artículos, te agradeceríamos
            que nos lo comuniques con la referencia del estudio correspondiente.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
