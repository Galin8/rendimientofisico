import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { type ArticleMeta, type Article, type Category } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

function calcReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / 200);
}

export function getArticlesByCategory(category: Category): ArticleMeta[] {
  const dir = path.join(CONTENT_DIR, category);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data } = matter(raw);
      return data as ArticleMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticle(category: Category, slug: string): Article | null {
  const filePaths = [
    path.join(CONTENT_DIR, category, `${slug}.mdx`),
    path.join(CONTENT_DIR, category, `${slug}.md`),
  ];

  const filePath = filePaths.find((p) => fs.existsSync(p));
  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    ...(data as ArticleMeta),
    content,
    readingTime: calcReadingTime(content),
  };
}

export function getAllArticles(): ArticleMeta[] {
  const categories: Category[] = ["nutricion", "entrenamiento", "suplementos", "perder-peso", "recetas"];
  return categories
    .flatMap(getArticlesByCategory)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getRecentArticles(limit = 6): ArticleMeta[] {
  return getAllArticles().slice(0, limit);
}
