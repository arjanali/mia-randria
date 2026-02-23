"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeletePostButton({
  postId,
  postTitle,
}: {
  postId: string;
  postTitle: string;
}) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      const res = await fetch(`/admin/api/delete-post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: postId }),
      });
      if (!res.ok) throw new Error("Delete failed");
      router.refresh();
      setConfirming(false);
    } finally {
      setLoading(false);
    }
  }

  if (confirming) {
    return (
      <span className="flex items-center gap-2">
        <span className="text-sm text-[var(--color-text-muted)]">
          Delete &quot;{postTitle}&quot;?
        </span>
        <button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          className="text-sm text-red-600 hover:underline disabled:opacity-50"
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          disabled={loading}
          className="text-sm text-[var(--color-text-muted)] hover:underline"
        >
          No
        </button>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="text-sm text-red-600 hover:underline"
    >
      Delete
    </button>
  );
}
