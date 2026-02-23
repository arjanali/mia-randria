import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getPostBySlug } from "@/lib/posts";
import PostView from "@/components/the-edit/PostView";
import RecipeView from "@/components/the-edit/RecipeView";

interface PageProps {
  params: Promise<{ slug: string }>;
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

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return { title: "The Edit | Mia Randria" };
  }
  const supabase = await createClient();
  const post = await getPostBySlug(supabase, slug);
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.title} — The Edit | Mia Randria`,
    description: post.excerpt ?? undefined,
  };
}

export default async function TheEditSlugPage({ params }: PageProps) {
  const { slug } = await params;
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) notFound();
  const supabase = await createClient();
  const post = await getPostBySlug(supabase, slug);
  if (!post) notFound();

  const subtitle = post.is_recipe
    ? `At the Table · ${formatDate(post.published_at ?? post.created_at)}`
    : formatDate(post.published_at ?? post.created_at);

  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="pt-20 pb-16">
        <Link
          href="/the-edit"
          className="inline-block ml-6 md:ml-12 text-sm font-medium tracking-widest uppercase text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors mb-8"
        >
          ← Back to The Edit
        </Link>

        <header className="relative w-full h-[65vh] min-h-[320px] flex items-end">
          {post.hero_image_url ? (
            <>
              <img
                src={post.hero_image_url}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                aria-hidden
              />
            </>
          ) : (
            <div
              className="absolute inset-0 bg-[var(--color-bg-alt)]"
              aria-hidden
            />
          )}
          <div className="relative z-10 w-full max-w-[72rem] mx-auto px-6 pb-12">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-white/90">
              {formatCategory(post.category)}
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-medium text-white mt-2">
              {post.title}
            </h1>
            <p className="text-white/85 mt-2">{subtitle}</p>
          </div>
        </header>

        <div className="max-w-[72rem] mx-auto px-6 pt-16">
          {post.is_recipe ? (
            <RecipeView post={post} />
          ) : (
            <PostView post={post} />
          )}
        </div>
      </div>
    </main>
  );
}
