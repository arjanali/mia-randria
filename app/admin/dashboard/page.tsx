import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getAllPostsForAdmin } from "@/lib/posts";
import DeletePostButton from "./DeletePostButton";

function formatCategory(category: string) {
  return category
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function AdminDashboardPage() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return (
      <main className="min-h-screen bg-[var(--color-bg)] pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6 text-center text-[var(--color-text-muted)]">
          Configure Supabase env vars to view the dashboard.
        </div>
      </main>
    );
  }
  const supabase = await createClient();
  const posts = await getAllPostsForAdmin(supabase);

  return (
    <main className="min-h-screen bg-[var(--color-bg)] pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <h1 className="font-display text-2xl font-semibold text-[var(--color-text)]">
            Posts
          </h1>
          <Link
            href="/admin/new"
            className="py-2.5 px-5 bg-[var(--color-text)] text-white text-sm font-medium tracking-widest uppercase hover:opacity-90"
          >
            New Post
          </Link>
        </div>
        <div className="border border-[var(--color-border)]">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-alt)]">
                <th className="p-4 text-xs font-medium tracking-widest uppercase text-[var(--color-text-muted)]">
                  Title
                </th>
                <th className="p-4 text-xs font-medium tracking-widest uppercase text-[var(--color-text-muted)]">
                  Category
                </th>
                <th className="p-4 text-xs font-medium tracking-widest uppercase text-[var(--color-text-muted)]">
                  Status
                </th>
                <th className="p-4 text-xs font-medium tracking-widest uppercase text-[var(--color-text-muted)]">
                  Date
                </th>
                <th className="p-4 text-xs font-medium tracking-widest uppercase text-[var(--color-text-muted)] w-40">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[var(--color-text-muted)]">
                    No posts yet. Create your first post.
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-[var(--color-border)] last:border-0"
                  >
                    <td className="p-4 font-medium text-[var(--color-text)]">
                      {post.title}
                    </td>
                    <td className="p-4">
                      <span className="text-xs font-medium tracking-widest uppercase text-[var(--color-accent)]">
                        {formatCategory(post.category)}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-[var(--color-text-muted)]">
                      {post.is_published ? "Published" : "Draft"}
                    </td>
                    <td className="p-4 text-sm text-[var(--color-text-muted)]">
                      {formatDate(post.updated_at)}
                    </td>
                    <td className="p-4 flex items-center gap-2">
                      <Link
                        href={`/admin/edit/${post.id}`}
                        className="text-sm font-medium text-[var(--color-accent)] hover:underline"
                      >
                        Edit
                      </Link>
                      <DeletePostButton postId={post.id} postTitle={post.title} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
