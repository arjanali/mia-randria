import Link from "next/link";
import type { Post } from "@/lib/posts";

interface PostCardProps {
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

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/the-edit/${post.slug}`}
      className="group block animate-[fadeUp_0.6s_ease-out_both]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-bg-alt)]">
        {post.hero_image_url ? (
          <img
            src={post.hero_image_url}
            alt=""
            className="w-full h-full object-cover transition-transform duration-[0.8s] ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--color-text-muted)] font-display italic">
            {post.title}
          </div>
        )}
        <span
          className="absolute top-3 left-3 px-2 py-1 text-[10px] font-medium tracking-widest uppercase bg-[var(--color-text)]/80 text-white"
          aria-hidden
        >
          {formatCategory(post.category)}
        </span>
      </div>
      <div className="pt-4">
        <span className="text-xs font-medium tracking-widest uppercase text-[var(--color-text-muted)]">
          {formatCategory(post.category)}
        </span>
        <h3 className="font-display text-xl font-medium mt-1 group-hover:text-[var(--color-accent)] transition-colors">
          {post.title}
        </h3>
        <time
          className="text-sm text-[var(--color-text-muted)] mt-1 block"
          dateTime={post.published_at ?? post.created_at}
        >
          {formatDate(post.published_at ?? post.created_at)}
        </time>
        <span className="inline-block mt-2 text-sm text-[var(--color-accent)] font-medium">
          Read more →
        </span>
      </div>
    </Link>
  );
}
