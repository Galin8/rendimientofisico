"use client";

import Link from "next/link";
import { useState } from "react";

const nav = [
  { label: "Nutrición", href: "/nutricion" },
  { label: "Entrenamiento", href: "/entrenamiento" },
  { label: "Suplementos", href: "/suplementos" },
  { label: "Perder Peso", href: "/perder-peso" },
  { label: "Recetas", href: "/recetas" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-brand-dark text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="font-display font-bold text-xl tracking-wide hover:text-brand-lime transition-colors"
            aria-label="Rendimiento Físico — Inicio"
          >
            Rendimiento<span className="text-brand-lime">Físico</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-6" aria-label="Navegación principal">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-display font-semibold text-sm uppercase tracking-wider hover:text-brand-lime transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-green-800 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            <span className="sr-only">{open ? "Cerrar" : "Menú"}</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {open && (
          <nav className="md:hidden pb-4 border-t border-green-700 pt-3" aria-label="Navegación móvil">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 font-display font-semibold text-sm uppercase tracking-wider hover:text-brand-lime transition-colors"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
