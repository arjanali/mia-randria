"use client";

import { useMemo, useState } from "react";
import type { Post } from "@/lib/posts";
import FilterBar from "@/components/the-edit/FilterBar";
import FeaturedPost from "@/components/the-edit/FeaturedPost";
import PostCard from "@/components/the-edit/PostCard";

type CategoryId = "all" | "beauty" | "travel" | "style" | "at-the-table";

interface TheEditClientProps {
  featured: Post | null;
  posts: Post[];
}

function filterByCategory(posts: Post[], category: CategoryId): Post[] {
  if (category === "all") return posts;
  return posts.filter((p) => p.category === category);
}

export default function TheEditClient({ featured, posts }: TheEditClientProps) {
  const [active, setActive] = useState<CategoryId>("all");

  const allPosts = useMemo(
    () => (featured ? [featured, ...posts] : posts),
    [featured, posts]
  );

  const filtered = useMemo(
    () => filterByCategory(allPosts, active),
    [allPosts, active]
  );

  const displayFeatured = filtered[0] ?? null;
  const displayPosts = filtered.slice(1);

  return (
    <>
      <FilterBar active={active} onFilter={setActive} />
      <div className="mt-12">
        {displayFeatured && (
          <div className="mb-16">
            <FeaturedPost post={displayFeatured} />
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-[var(--color-text-muted)] py-12">
            No posts in this category yet.
          </p>
        )}
      </div>
    </>
  );
}
