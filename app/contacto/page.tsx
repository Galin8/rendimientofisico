import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Contacto — Rendimiento Físico",
  description:
    "Contacta con el equipo de Rendimiento Físico. Preguntas, colaboraciones o sugerencias de contenido sobre nutrición deportiva y entrenamiento.",
  alternates: { canonical: "https://rendimientofisico.es/contacto" },
  openGraph: {
    title: "Contacto — Rendimiento Físico",
    description: "Ponte en contacto con el equipo de Rendimiento Físico.",
    url: "https://rendimientofisico.es/contacto",
  },
};

export default function ContactoPage() {
  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumb items={[{ label: "Contacto" }]} />

        <h1 className="font-display font-bold text-4xl text-brand-dark mb-4">
          Contacto
        </h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          ¿Tienes preguntas, sugerencias de artículos o quieres colaborar con
          nosotros? Escríbenos y te respondemos en 48 horas.
        </p>

        <form
          action="https://formspree.io/f/XXXXXXXX"
          method="POST"
          className="space-y-5"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-dark focus:border-transparent"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-dark focus:border-transparent"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-1">
              Asunto
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-dark focus:border-transparent"
              placeholder="¿Sobre qué nos escribes?"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-dark focus:border-transparent resize-none"
              placeholder="Escribe tu mensaje aquí..."
            />
          </div>

          <button
            type="submit"
            className="btn-primary w-full"
          >
            Enviar mensaje
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}
