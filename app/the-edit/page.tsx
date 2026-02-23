import { createClient } from "@/lib/supabase/server";
import { getPublishedPosts } from "@/lib/posts";
import TheEditClient from "./TheEditClient";

export const revalidate = 60;

export default async function TheEditPage() {
  let posts: Awaited<ReturnType<typeof getPublishedPosts>> = [];
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const supabase = await createClient();
      posts = await getPublishedPosts(supabase);
    } catch {
      // RLS or network
    }
  }
  const featured = posts[0] ?? null;
  const rest = posts.slice(1);

  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] pt-24 pb-24">
      <div className="max-w-[72rem] mx-auto px-6">
        <header className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 animate-[fadeUp_0.8s_ease-out_both]">
          <div>
            <h1 className="font-display text-5xl md:text-7xl font-medium leading-tight">
              <span className="italic text-[var(--color-accent)]">The</span>
              <br />
              Edit.
            </h1>
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-[var(--color-text-muted)] max-w-md mb-4">
              A luxury lifestyle journal — beauty, travel, style, and at the
              table.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Beauty", "Travel", "Style", "At the Table"].map((label) => (
                <span
                  key={label}
                  className="px-3 py-1 text-xs font-medium tracking-widest uppercase border border-[var(--color-border)] text-[var(--color-text-muted)]"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </header>

        <TheEditClient
          featured={featured}
          posts={rest}
        />
      </div>
    </main>
  );
}
