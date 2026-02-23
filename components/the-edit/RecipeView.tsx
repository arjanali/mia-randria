import type { Post } from "@/lib/posts";

interface RecipeViewProps {
  post: Post;
}

export default function RecipeView({ post }: RecipeViewProps) {
  const ingredients = post.ingredients ?? [];
  const steps = post.steps ?? [];
  const servings = post.servings ?? 0;

  return (
    <div className="max-w-4xl mx-auto">
      {post.recipe_intro_quote && (
        <blockquote className="font-display italic text-xl md:text-2xl text-[var(--color-text)] border-l-4 border-[var(--color-accent)] pl-6 py-2 mb-10">
          {post.recipe_intro_quote}
        </blockquote>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        <div>
          <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-text-muted)] mb-4">
            What you&apos;ll need — serves {servings}
          </h3>
          <ul className="space-y-3">
            {ingredients.map((ing, i) => (
              <li
                key={i}
                className="flex justify-between gap-4 py-2 border-b border-[var(--color-border)]"
              >
                <span className="text-[var(--color-text)]">{ing.name}</span>
                <span className="text-[var(--color-accent)] font-medium shrink-0">
                  {ing.amount}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-text-muted)] mb-4">
            The method
          </h3>
          <ol className="space-y-6">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span
                  className="font-display text-3xl md:text-4xl font-medium text-[var(--color-text)]/20 shrink-0 w-12"
                  aria-hidden
                >
                  {String(step.step_number).padStart(2, "0")}
                </span>
                <p className="font-body font-light text-[var(--color-text)] leading-relaxed pt-1">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {post.mia_note && (
        <blockquote className="mt-12 p-8 bg-[var(--color-bg-alt)] border-l-4 border-[var(--color-accent)]">
          <span className="text-xs font-medium tracking-widest uppercase text-[var(--color-accent)]">
            Mia&apos;s Note
          </span>
          <p className="font-display italic text-lg mt-2 text-[var(--color-text)]">
            {post.mia_note}
          </p>
        </blockquote>
      )}

      {post.linked_video_url && (
        <div className="mt-10">
          <a
            href={post.linked_video_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 text-sm font-medium tracking-widest uppercase border border-[var(--color-text)] text-[var(--color-text)] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] transition-colors"
          >
            Watch me make this →
          </a>
        </div>
      )}
    </div>
  );
}
