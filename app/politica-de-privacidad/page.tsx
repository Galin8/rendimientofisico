import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Política de Privacidad — Rendimiento Físico",
  description: "Política de privacidad y protección de datos de Rendimiento Físico conforme al RGPD.",
  alternates: { canonical: "https://rendimientofisico.com/politica-de-privacidad" },
  robots: { index: true, follow: true },
};

export default function PoliticaPrivacidadPage() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumb items={[{ label: "Política de privacidad" }]} />

        <article className="prose prose-lg max-w-none">
          <h1 className="font-display font-bold text-4xl text-brand-dark mb-6">
            Política de Privacidad
          </h1>

          <p><strong>Última actualización:</strong> {new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}</p>

          <h2>1. Responsable del tratamiento</h2>
          <p>
            El responsable del tratamiento de los datos personales recogidos a través de{" "}
            <strong>rendimientofisico.com</strong> es el titular del sitio web.
          </p>

          <h2>2. Datos que recopilamos</h2>
          <p>Recopilamos los siguientes tipos de datos:</p>
          <ul>
            <li><strong>Datos de uso:</strong> páginas visitadas, tiempo en el sitio, dispositivo y navegador (a través de Google Analytics 4).</li>
            <li><strong>Datos de contacto:</strong> nombre, email y mensaje cuando utilizas el formulario de contacto.</li>
            <li><strong>Cookies publicitarias:</strong> a través de Google AdSense para mostrar anuncios relevantes.</li>
          </ul>

          <h2>3. Finalidad del tratamiento</h2>
          <ul>
            <li>Analizar el uso del sitio para mejorar el contenido (Google Analytics 4).</li>
            <li>Mostrar publicidad relevante (Google AdSense).</li>
            <li>Responder a consultas enviadas a través del formulario de contacto.</li>
          </ul>

          <h2>4. Base legal</h2>
          <p>El tratamiento se basa en tu consentimiento y en nuestro interés legítimo de mejorar el servicio.</p>

          <h2>5. Cookies</h2>
          <p>
            Este sitio utiliza cookies propias y de terceros (Google Analytics, Google AdSense).
            Puedes gestionar tus preferencias de cookies en la configuración de tu navegador.
          </p>

          <h2>6. Tus derechos</h2>
          <p>Tienes derecho a acceder, rectificar, suprimir, oponerte y limitar el tratamiento de tus datos. Puedes ejercer estos derechos contactando con nosotros.</p>

          <h2>7. Transferencias internacionales</h2>
          <p>Google LLC (Analytics y AdSense) puede transferir datos a servidores en Estados Unidos, bajo el marco Privacy Shield / cláusulas contractuales estándar.</p>
        </article>
      </main>
      <Footer />
    </>
  );
}
