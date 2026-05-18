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
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <Link href={href} className="block">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      </Link>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <Link
            href={`/${category}`}
            className="text-xs font-display font-bold uppercase tracking-wider text-brand-dark bg-green-50 px-2 py-1 rounded hover:bg-green-100 transition-colors"
          >
            {categoryLabels[category] ?? category}
          </Link>
          <time dateTime={date} className="text-xs text-gray-400">
            {formattedDate}
          </time>
        </div>
        <Link href={href}>
          <h3 className="font-display font-bold text-lg text-gray-900 leading-tight hover:text-brand-dark transition-colors mb-2">
            {title}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{description}</p>
        <Link
          href={href}
          className="inline-block mt-4 text-sm font-semibold text-brand-dark hover:text-green-700 transition-colors"
          aria-label={`Leer artículo: ${title}`}
        >
          Leer artículo →
        </Link>
      </div>
    </article>
  );
}
