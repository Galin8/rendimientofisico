import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
  title: string;
  description: string;
  slug: string;
  category: string;
  image: string;
  imageAlt: string;
  date: string;
}

const categoryLabels: Record<string, string> = {
  nutricion: "Nutrición",
  entrenamiento: "Entrenamiento",
  suplementos: "Suplementos",
  "perder-peso": "Perder Peso",
  recetas: "Recetas",
};

const categoryColors: Record<string, string> = {
  nutricion: "bg-emerald-50 text-emerald-700",
  entrenamiento: "bg-blue-50 text-blue-700",
  suplementos: "bg-purple-50 text-purple-700",
  "perder-peso": "bg-orange-50 text-orange-700",
  recetas: "bg-amber-50 text-amber-700",
};

export default function ArticleCard({
  title,
  description,
  slug,
  category,
  image,
  imageAlt,
  date,
}: ArticleCardProps) {
  const href = `/${category}/${slug}`;
  const formattedDate = new Date(date).toLocaleDateString("es-ES", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const chipColor = categoryColors[category] ?? "bg-green-50 text-brand-dark";

  return (
    <article className="group bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:border-gray-200">
      {/* Image — aspect-[16/9] reserves space before image loads → no CLS */}
      <Link href={href} className="block overflow-hidden">
        <div className="relative aspect-[16/9] w-full bg-gray-100">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="p-5">
        {/* Meta row */}
        <div className="flex items-center gap-2 mb-3">
          <Link
            href={`/${category}`}
            className={`text-xs font-display font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${chipColor} hover:opacity-80 transition-opacity`}
          >
            {categoryLabels[category] ?? category}
          </Link>
          <time dateTime={date} className="text-xs text-gray-400 ml-auto">
            {formattedDate}
          </time>
        </div>

        {/* Title */}
        <Link href={href}>
          <h3 className="font-display font-bold text-[1.05rem] text-gray-900 leading-snug hover:text-brand-dark transition-colors mb-2 line-clamp-2">
            {title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">
          {description}
        </p>

        {/* CTA */}
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-dark group-hover:gap-2 transition-all duration-150"
          aria-label={`Leer: ${title}`}
        >
          Leer artículo
          <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-0.5">→</span>
        </Link>
      </div>
    </article>
  );
}
