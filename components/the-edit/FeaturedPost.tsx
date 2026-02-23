import Link from "next/link";
import type { Post } from "@/lib/posts";

interface FeaturedPostProps {
  post: Post;
}

function formatCategory(category: string) {
  return category
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <Link
      href={`/the-edit/${post.slug}`}
      className="group grid grid-cols-1 md:grid-cols-2 gap-0 bg-[var(--color-bg-alt)] rounded overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 transition-colors animate-[fadeUp_0.6s_ease-out_0.1s_both]"
    >
      <div className="relative aspect-[4/3] md:aspect-auto min-h-[280px] overflow-hidden">
        {post.hero_image_url ? (
          <img
            src={post.hero_image_url}
            alt=""
            className="w-full h-full object-cover transition-transform duration-[0.8s] ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--color-text-muted)] font-display italic p-8">
            {post.title}
          </div>
        )}
        <span
          className="absolute top-4 left-4 px-3 py-1.5 text-xs font-medium tracking-widest uppercase bg-[var(--color-text)]/90 text-white"
          aria-hidden
        >
          {formatCategory(post.category)}
        </span>
      </div>
      <div className="p-8 md:p-10 flex flex-col justify-center">
        <span className="text-xs font-medium tracking-widest uppercase text-[var(--color-accent)]">
          {formatCategory(post.category)}
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-medium mt-2 group-hover:text-[var(--color-accent)] transition-colors">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-[var(--color-text-muted)] mt-3 line-clamp-3">
            {post.excerpt}
          </p>
        )}
        <time
          className="text-sm text-[var(--color-text-muted)] mt-4 block"
          dateTime={post.published_at ?? post.created_at}
        >
          {formatDate(post.published_at ?? post.created_at)}
        </time>
        <span className="inline-block mt-4 text-[var(--color-accent)] font-medium">
          Read more →
        </span>
      </div>
    </Link>
  );
}
