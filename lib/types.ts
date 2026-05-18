export type Category = "nutricion" | "entrenamiento" | "suplementos" | "perder-peso";

export interface ArticleMeta {
  title: string;
  description: string;
  slug: string;
  category: Category;
  date: string;
  author: string;
  image: string;
  imageAlt: string;
  keywords: string[];
}

export interface Article extends ArticleMeta {
  content: string;
  readingTime: number;
}
