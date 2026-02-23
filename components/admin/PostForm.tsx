"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Post } from "@/lib/posts";
import { slugFromTitle } from "@/lib/posts";
import { createPost, updatePost } from "@/app/admin/actions";
import ImageUploader from "./ImageUploader";
import RichTextEditor from "./RichTextEditor";
import RecipeFields from "./RecipeFields";
import type { IngredientItem, StepItem } from "@/lib/posts";

type PostCategory = "beauty" | "travel" | "style" | "at-the-table";

const CATEGORIES: { value: PostCategory; label: string }[] = [
  { value: "beauty", label: "Beauty" },
  { value: "travel", label: "Travel" },
  { value: "style", label: "Style" },
  { value: "at-the-table", label: "At the Table" },
];

interface PostFormProps {
  post?: Post | null;
}

export default function PostForm({ post }: PostFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [category, setCategory] = useState<PostCategory>(
    (post?.category as PostCategory) ?? "beauty"
  );
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [body, setBody] = useState(post?.body ?? "");
  const [heroImageUrl, setHeroImageUrl] = useState(post?.hero_image_url ?? null);
  const [miaNote, setMiaNote] = useState(post?.mia_note ?? "");
  const [isRecipe, setIsRecipe] = useState(post?.is_recipe ?? false);
  const [recipeIntroQuote, setRecipeIntroQuote] = useState(
    post?.recipe_intro_quote ?? ""
  );
  const [servings, setServings] = useState(post?.servings ?? 0);
  const [ingredients, setIngredients] = useState<IngredientItem[]>(
    post?.ingredients ?? []
  );
  const [steps, setSteps] = useState<StepItem[]>(
    post?.steps ?? []
  );
  const [linkedVideoUrl, setLinkedVideoUrl] = useState(
    post?.linked_video_url ?? ""
  );

  function handleTitleBlur() {
    if (!post && !slug) setSlug(slugFromTitle(title));
  }

  function handleSubmit(publish: boolean) {
    setError("");
    const form = document.getElementById("post-form") as HTMLFormElement;
    if (!form) return;
    const bodyInput = form.querySelector('input[name="body"]') as HTMLInputElement;
    const ingredientsInput = form.querySelector(
      'input[name="ingredients"]'
    ) as HTMLInputElement;
    const stepsInput = form.querySelector(
      'input[name="steps"]'
    ) as HTMLInputElement;
    const heroInput = form.querySelector(
      'input[name="hero_image_url"]'
    ) as HTMLInputElement;
    const publishInput = form.querySelector(
      'input[name="publish"]'
    ) as HTMLInputElement;
    const isRecipeInput = form.querySelector(
      'input[name="is_recipe"]'
    ) as HTMLInputElement;
    const recipeIntroInput = form.querySelector(
      'input[name="recipe_intro_quote"]'
    ) as HTMLInputElement;
    const servingsInput = form.querySelector(
      'input[name="servings"]'
    ) as HTMLInputElement;
    const linkedVideoInput = form.querySelector(
      'input[name="linked_video_url"]'
    ) as HTMLInputElement;
    if (bodyInput) bodyInput.value = body;
    if (ingredientsInput) ingredientsInput.value = JSON.stringify(ingredients);
    if (stepsInput) stepsInput.value = JSON.stringify(steps);
    if (heroInput) heroInput.value = heroImageUrl ?? "";
    if (publishInput) publishInput.value = publish ? "true" : "false";
    if (isRecipeInput) isRecipeInput.value = isRecipe ? "true" : "false";
    if (recipeIntroInput) recipeIntroInput.value = recipeIntroQuote;
    if (servingsInput) servingsInput.value = String(servings);
    if (linkedVideoInput) linkedVideoInput.value = linkedVideoUrl;
    const formData = new FormData(form);
    startTransition(async () => {
      const result = post
        ? await updatePost(formData)
        : await createPost(formData);
      if (result.error) {
        setError(result.error);
        return;
      }
      router.push("/admin/dashboard");
      router.refresh();
    });
  }

  const isAtTheTable = category === "at-the-table";

  return (
    <form id="post-form" className="space-y-6 max-w-2xl">
      <input type="hidden" name="body" value="" />
      <input type="hidden" name="ingredients" value="" />
      <input type="hidden" name="steps" value="" />
      <input type="hidden" name="hero_image_url" value={heroImageUrl ?? ""} />
      <input type="hidden" name="publish" value="false" />
      <input type="hidden" name="is_recipe" value="" />
      <input type="hidden" name="recipe_intro_quote" value="" />
      <input type="hidden" name="servings" value="" />
      <input type="hidden" name="linked_video_url" value="" />
      {post && <input type="hidden" name="id" value={post.id} />}

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <div>
        <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleTitleBlur}
          required
          className="w-full px-4 py-3 font-body text-[var(--color-text)] bg-white border border-[var(--color-border)] focus:outline-none focus:border-[var(--color-accent)]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
          Category
        </label>
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as PostCategory)}
          className="w-full px-4 py-3 font-body text-[var(--color-text)] bg-white border border-[var(--color-border)] focus:outline-none focus:border-[var(--color-accent)]"
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
          Slug
        </label>
        <input
          type="text"
          name="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full px-4 py-3 font-body text-[var(--color-text)] bg-white border border-[var(--color-border)] focus:outline-none focus:border-[var(--color-accent)]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
          Excerpt
        </label>
        <textarea
          name="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={3}
          className="w-full px-4 py-3 font-body text-[var(--color-text)] bg-white border border-[var(--color-border)] focus:outline-none focus:border-[var(--color-accent)]"
          placeholder="1–3 sentences"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
          Hero image
        </label>
        <ImageUploader value={heroImageUrl} onChange={setHeroImageUrl} />
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
          Post body
        </label>
        <RichTextEditor value={body} onChange={setBody} />
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
          Mia&apos;s note
        </label>
        <textarea
          name="mia_note"
          value={miaNote}
          onChange={(e) => setMiaNote(e.target.value)}
          rows={2}
          className="w-full px-4 py-3 font-body text-[var(--color-text)] bg-white border border-[var(--color-border)] focus:outline-none focus:border-[var(--color-accent)]"
          placeholder="Personal note at bottom of post"
        />
      </div>

      {isAtTheTable && (
        <RecipeFields
          isRecipe={isRecipe}
          introQuote={recipeIntroQuote}
          servings={servings}
          ingredients={ingredients}
          steps={steps}
          linkedVideoUrl={linkedVideoUrl}
          onIsRecipeChange={setIsRecipe}
          onIntroQuoteChange={setRecipeIntroQuote}
          onServingsChange={setServings}
          onIngredientsChange={setIngredients}
          onStepsChange={setSteps}
          onLinkedVideoUrlChange={setLinkedVideoUrl}
        />
      )}

      <div className="flex items-center gap-4 pt-6 border-t border-[var(--color-border)]">
        <button
          type="button"
          onClick={() => handleSubmit(false)}
          disabled={isPending}
          className="px-6 py-3 border border-[var(--color-text)] text-[var(--color-text)] text-sm font-medium tracking-widest uppercase hover:bg-[var(--color-text)] hover:text-white transition-colors disabled:opacity-50"
        >
          Save as draft
        </button>
        <button
          type="button"
          onClick={() => handleSubmit(true)}
          disabled={isPending}
          className="px-6 py-3 bg-[var(--color-text)] text-white text-sm font-medium tracking-widest uppercase hover:opacity-90 disabled:opacity-50"
        >
          Publish
        </button>
      </div>
    </form>
  );
}
