import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import AdSense from "./AdSense";

const components = {
  // Supress H1 — the page template already renders the article title
  h1: () => null,
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    // Internal page links (/)
    if (href?.startsWith("/")) {
      return <Link href={href} {...props}>{children}</Link>;
    }
    // Anchor links (#section) — same page, no new tab
    if (href?.startsWith("#")) {
      return <a href={href} {...props}>{children}</a>;
    }
    // External links
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
  img: ({ src, alt }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    if (!src) return null;
    return (
      <span className="block my-6">
        <Image
          src={src}
          alt={alt ?? ""}
          width={800}
          height={450}
          className="rounded-lg w-full h-auto"
        />
      </span>
    );
  },
  AdSense,
};

interface MDXContentProps {
  source: string;
}

const mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [rehypeSlug],
};

export default function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-brand-dark prose-a:no-underline hover:prose-a:text-green-700 prose-strong:text-gray-900 prose-img:rounded-lg prose-hr:border-gray-200">
      <MDXRemote source={source} components={components} options={{ mdxOptions }} />
    </div>
  );
}
