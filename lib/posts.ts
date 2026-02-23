import type { SupabaseClient } from "@supabase/supabase-js";

export type PostCategory = "beauty" | "travel" | "style" | "at-the-table";

export interface IngredientItem {
  name: string;
  amount: string;
}

export interface StepItem {
  step_number: number;
  text: string;
}

export interface Post {
  id: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  is_published: boolean;
  title: string;
  slug: string;
  category: PostCategory;
  excerpt: string | null;
  body: string | null;
  hero_image_url: string | null;
  mia_note: string | null;
  is_recipe: boolean;
  recipe_intro_quote: string | null;
  servings: number | null;
  ingredients: IngredientItem[] | null;
  steps: StepItem[] | null;
  linked_video_url: string | null;
}

export interface PostInsert {
  title: string;
  slug: string;
  category: PostCategory;
  excerpt?: string | null;
  body?: string | null;
  hero_image_url?: string | null;
  mia_note?: string | null;
  is_published?: boolean;
  published_at?: string | null;
  is_recipe?: boolean;
  recipe_intro_quote?: string | null;
  servings?: number | null;
  ingredients?: IngredientItem[] | null;
  steps?: StepItem[] | null;
  linked_video_url?: string | null;
}

export interface PostUpdate extends Partial<PostInsert> {
  updated_at?: string;
}

export async function getPublishedPosts(supabase: SupabaseClient): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Post[];
}

export async function getPostBySlug(
  supabase: SupabaseClient,
  slug: string
): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();
  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return data as Post;
}

export async function getAllPostsForAdmin(supabase: SupabaseClient): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Post[];
}

export async function getPostById(
  supabase: SupabaseClient,
  id: string
): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return data as Post;
}

export async function createPost(
  supabase: SupabaseClient,
  post: PostInsert
): Promise<Post> {
  const { data, error } = await supabase
    .from("posts")
    .insert({
      ...post,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();
  if (error) throw error;
  return data as Post;
}

export async function updatePost(
  supabase: SupabaseClient,
  id: string,
  updates: PostUpdate
): Promise<Post> {
  const { data, error } = await supabase
    .from("posts")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Post;
}

export async function deletePost(
  supabase: SupabaseClient,
  id: string
): Promise<void> {
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw error;
}

export function slugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}
