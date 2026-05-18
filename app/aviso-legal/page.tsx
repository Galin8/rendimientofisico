import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Aviso Legal — Rendimiento Físico",
  description: "Aviso legal y condiciones de uso de Rendimiento Físico.",
  alternates: { canonical: "https://rendimientofisico.es/aviso-legal" },
  robots: { index: false, follow: false },
};

export default function AvisoLegalPage() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumb items={[{ label: "Aviso legal" }]} />

        <article className="prose prose-lg max-w-none">
          <h1 className="font-display font-bold text-4xl text-brand-dark mb-6">
            Aviso Legal
          </h1>

          <h2>1. Identificación</h2>
          <p>
            En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio,
            de Servicios de la Sociedad de la Información y Comercio Electrónico
            (LSSI-CE), se informa que el titular de este sitio web es el
            responsable de <strong>rendimientofisico.es</strong>.
          </p>

          <h2>2. Objeto y ámbito de aplicación</h2>
          <p>
            El presente aviso legal regula el acceso y uso del sitio web
            rendimientofisico.es. El acceso y uso de este sitio implica la
            aceptación plena de estas condiciones.
          </p>

          <h2>3. Propiedad intelectual</h2>
          <p>
            Los contenidos de este sitio web (textos, imágenes, gráficos,
            diseño) son propiedad de Rendimiento Físico o de sus respectivos
            titulares. Queda prohibida su reproducción total o parcial sin
            autorización expresa.
          </p>

          <h2>4. Exención de responsabilidad</h2>
          <p>
            La información proporcionada en este sitio web tiene carácter
            orientativo y educativo. No sustituye al consejo médico profesional.
            El titular del sitio no se responsabiliza de los daños derivados
            del uso de la información publicada.
          </p>

          <h2>5. Publicidad</h2>
          <p>
            Este sitio web incluye anuncios de Google AdSense. El titular no
            controla los anuncios mostrados y no se responsabiliza de su
            contenido.
          </p>

          <h2>6. Legislación aplicable</h2>
          <p>
            Este aviso legal se rige por la legislación española. Para cualquier
            controversia, las partes se someten a los juzgados y tribunales
            competentes de España.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
