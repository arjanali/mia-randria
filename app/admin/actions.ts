"use server";

import { createClient } from "@/lib/supabase/server";
import {
  createPost as dbCreatePost,
  updatePost as dbUpdatePost,
  deletePost as dbDeletePost,
  slugFromTitle,
  type PostInsert,
  type PostUpdate,
} from "@/lib/posts";

export async function createPost(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return { error: "Unauthorized" };

  const title = formData.get("title") as string;
  const slug =
    (formData.get("slug") as string)?.trim() || slugFromTitle(title);
  const category = formData.get("category") as PostInsert["category"];
  const excerpt = (formData.get("excerpt") as string) || null;
  const body = (formData.get("body") as string) || null;
  const hero_image_url = (formData.get("hero_image_url") as string) || null;
  const mia_note = (formData.get("mia_note") as string) || null;
  const publish = formData.get("publish") === "true";
  const is_recipe = formData.get("is_recipe") === "true";
  const recipe_intro_quote =
    (formData.get("recipe_intro_quote") as string) || null;
  const servings = formData.get("servings")
    ? parseInt(formData.get("servings") as string, 10)
    : null;
  const ingredientsRaw = formData.get("ingredients") as string;
  const stepsRaw = formData.get("steps") as string;
  const linked_video_url =
    (formData.get("linked_video_url") as string) || null;

  const ingredients = ingredientsRaw
    ? (JSON.parse(ingredientsRaw) as PostInsert["ingredients"])
    : null;
  const steps = stepsRaw
    ? (JSON.parse(stepsRaw) as PostInsert["steps"])
    : null;

  const post: PostInsert = {
    title,
    slug,
    category,
    excerpt,
    body,
    hero_image_url,
    mia_note,
    is_published: publish,
    published_at: publish ? new Date().toISOString() : null,
    is_recipe,
    recipe_intro_quote: is_recipe ? recipe_intro_quote : null,
    servings: is_recipe ? servings : null,
    ingredients: is_recipe ? ingredients : null,
    steps: is_recipe ? steps : null,
    linked_video_url: is_recipe ? linked_video_url : null,
  };

  try {
    const created = await dbCreatePost(supabase, post);
    return { data: created, error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : "Failed to create post",
    };
  }
}

export async function updatePost(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return { error: "Unauthorized" };

  const id = formData.get("id") as string;
  if (!id) return { error: "Missing id" };

  const title = formData.get("title") as string;
  const slug =
    (formData.get("slug") as string)?.trim() || slugFromTitle(title);
  const category = formData.get("category") as PostUpdate["category"];
  const excerpt = (formData.get("excerpt") as string) || null;
  const body = (formData.get("body") as string) || null;
  const hero_image_url = (formData.get("hero_image_url") as string) || null;
  const mia_note = (formData.get("mia_note") as string) || null;
  const publish = formData.get("publish") === "true";
  const is_recipe = formData.get("is_recipe") === "true";
  const recipe_intro_quote =
    (formData.get("recipe_intro_quote") as string) || null;
  const servings = formData.get("servings")
    ? parseInt(formData.get("servings") as string, 10)
    : null;
  const ingredientsRaw = formData.get("ingredients") as string;
  const stepsRaw = formData.get("steps") as string;
  const linked_video_url =
    (formData.get("linked_video_url") as string) || null;

  const ingredients = ingredientsRaw
    ? (JSON.parse(ingredientsRaw) as PostUpdate["ingredients"])
    : null;
  const steps = stepsRaw
    ? (JSON.parse(stepsRaw) as PostUpdate["steps"])
    : null;

  const updates: PostUpdate = {
    title,
    slug,
    category,
    excerpt,
    body,
    hero_image_url,
    mia_note,
    is_published: publish,
    ...(publish && { published_at: new Date().toISOString() }),
    is_recipe,
    recipe_intro_quote: is_recipe ? recipe_intro_quote : null,
    servings: is_recipe ? servings : null,
    ingredients: is_recipe ? ingredients : null,
    steps: is_recipe ? steps : null,
    linked_video_url: is_recipe ? linked_video_url : null,
  };

  try {
    const updated = await dbUpdatePost(supabase, id, updates);
    return { data: updated, error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : "Failed to update post",
    };
  }
}
