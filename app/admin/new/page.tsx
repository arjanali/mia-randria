import PostForm from "@/components/admin/PostForm";

export default function AdminNewPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-6">
        <h1 className="font-display text-2xl font-semibold text-[var(--color-text)] mb-10">
          New post
        </h1>
        <PostForm />
      </div>
    </main>
  );
}
