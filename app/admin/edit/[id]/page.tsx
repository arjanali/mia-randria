import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getPostById } from "@/lib/posts";
import PostForm from "@/components/admin/PostForm";
import DeletePostButton from "@/app/admin/dashboard/DeletePostButton";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEditPage({ params }: PageProps) {
  const { id } = await params;
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) notFound();
  const supabase = await createClient();
  const post = await getPostById(supabase, id);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-[var(--color-bg)] pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <h1 className="font-display text-2xl font-semibold text-[var(--color-text)]">
            Edit post
          </h1>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/dashboard"
              className="text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-accent)]"
            >
              ← Dashboard
            </Link>
            <DeletePostButton postId={post.id} postTitle={post.title} />
          </div>
        </div>
        <PostForm post={post} />
        <p className="mt-8 text-sm text-[var(--color-text-muted)]">
          <Link
            href={`/the-edit/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-accent)] hover:underline"
          >
            View post →
          </Link>{" "}
          (only if published)
        </p>
      </div>
    </main>
  );
}
