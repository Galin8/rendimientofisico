import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Contacto — Rendimiento Físico",
  description: "Página de contacto de Rendimiento Físico.",
  alternates: { canonical: "https://rendimientofisico.com/contacto" },
  robots: { index: false, follow: false },
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
        <p className="text-gray-500">Próximamente.</p>
      </main>
      <Footer />
    </>
  );
}
