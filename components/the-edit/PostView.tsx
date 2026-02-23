import type { Post } from "@/lib/posts";

interface PostViewProps {
  post: Post;
}

export default function PostView({ post }: PostViewProps) {
  return (
    <article>
      {post.body && (
        <div
          className="the-edit-content max-w-[42rem] mx-auto text-[1.05rem] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      )}
      {post.mia_note && (
        <blockquote className="mt-12 p-8 bg-[var(--color-bg-alt)] border-l-4 border-[var(--color-accent)]">
          <span className="text-xs font-medium tracking-widest uppercase text-[var(--color-accent)]">
            Mia&apos;s Note
          </span>
          <p className="font-display italic text-lg mt-2 text-[var(--color-text)]">
            {post.mia_note}
          </p>
        </blockquote>
      )}
    </article>
  );
}
