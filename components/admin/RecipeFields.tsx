"use client";

import type { IngredientItem, StepItem } from "@/lib/posts";

interface RecipeFieldsProps {
  isRecipe: boolean;
  introQuote: string;
  servings: number;
  ingredients: IngredientItem[];
  steps: StepItem[];
  linkedVideoUrl: string;
  onIsRecipeChange: (v: boolean) => void;
  onIntroQuoteChange: (v: string) => void;
  onServingsChange: (v: number) => void;
  onIngredientsChange: (v: IngredientItem[]) => void;
  onStepsChange: (v: StepItem[]) => void;
  onLinkedVideoUrlChange: (v: string) => void;
  disabled?: boolean;
}

export default function RecipeFields({
  isRecipe,
  introQuote,
  servings,
  ingredients,
  steps,
  linkedVideoUrl,
  onIsRecipeChange,
  onIntroQuoteChange,
  onServingsChange,
  onIngredientsChange,
  onStepsChange,
  onLinkedVideoUrlChange,
  disabled,
}: RecipeFieldsProps) {
  function addIngredient() {
    onIngredientsChange([...ingredients, { name: "", amount: "" }]);
  }
  function removeIngredient(i: number) {
    onIngredientsChange(ingredients.filter((_, idx) => idx !== i));
  }
  function updateIngredient(i: number, field: "name" | "amount", value: string) {
    const next = [...ingredients];
    next[i] = { ...next[i], [field]: value };
    onIngredientsChange(next);
  }

  function addStep() {
    onStepsChange([
      ...steps,
      { step_number: steps.length + 1, text: "" },
    ]);
  }
  function removeStep(i: number) {
    const next = steps.filter((_, idx) => idx !== i).map((s, idx) => ({
      ...s,
      step_number: idx + 1,
    }));
    onStepsChange(next);
  }
  function updateStep(i: number, text: string) {
    const next = [...steps];
    next[i] = { ...next[i], text };
    onStepsChange(next);
  }

  return (
    <div className="border-t border-[var(--color-border)] pt-8 mt-8 space-y-6">
      <h3 className="text-sm font-medium tracking-widest uppercase text-[var(--color-text-muted)]">
        Recipe fields
      </h3>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isRecipe}
          onChange={(e) => onIsRecipeChange(e.target.checked)}
          disabled={disabled}
          className="w-4 h-4"
        />
        <span className="text-sm text-[var(--color-text)]">Is this a Recipe?</span>
      </label>
      {isRecipe && (
        <>
      <div>
        <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
          Intro quote
        </label>
        <textarea
          value={introQuote}
          onChange={(e) => onIntroQuoteChange(e.target.value)}
          disabled={disabled}
          rows={2}
          className="w-full px-4 py-3 font-body text-[var(--color-text)] bg-white border border-[var(--color-border)] focus:outline-none focus:border-[var(--color-accent)]"
          placeholder="Italic pull quote, 1–2 sentences in Mia's voice"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
          Servings
        </label>
        <input
          type="number"
          min={1}
          value={servings || ""}
          onChange={(e) => onServingsChange(parseInt(e.target.value, 10) || 0)}
          disabled={disabled}
          className="w-24 px-4 py-3 font-body text-[var(--color-text)] bg-white border border-[var(--color-border)] focus:outline-none focus:border-[var(--color-accent)]"
        />
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-[var(--color-text)]">
            Ingredients
          </label>
          <button
            type="button"
            onClick={addIngredient}
            disabled={disabled}
            className="text-sm font-medium text-[var(--color-accent)] hover:underline"
          >
            + Add ingredient
          </button>
        </div>
        <div className="space-y-2">
          {ingredients.map((ing, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                type="text"
                value={ing.name}
                onChange={(e) => updateIngredient(i, "name", e.target.value)}
                disabled={disabled}
                placeholder="Ingredient name"
                className="flex-1 px-4 py-2 font-body text-sm text-[var(--color-text)] bg-white border border-[var(--color-border)] focus:outline-none focus:border-[var(--color-accent)]"
              />
              <input
                type="text"
                value={ing.amount}
                onChange={(e) => updateIngredient(i, "amount", e.target.value)}
                disabled={disabled}
                placeholder="Amount"
                className="w-28 px-4 py-2 font-body text-sm text-[var(--color-text)] bg-white border border-[var(--color-border)] focus:outline-none focus:border-[var(--color-accent)]"
              />
              <button
                type="button"
                onClick={() => removeIngredient(i)}
                disabled={disabled}
                className="p-2 text-[var(--color-text-muted)] hover:text-red-600"
                aria-label="Remove ingredient"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-[var(--color-text)]">
            Steps
          </label>
          <button
            type="button"
            onClick={addStep}
            disabled={disabled}
            className="text-sm font-medium text-[var(--color-accent)] hover:underline"
          >
            + Add step
          </button>
        </div>
        <div className="space-y-3">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="text-sm font-medium text-[var(--color-text-muted)] w-6 shrink-0 pt-2">
                {step.step_number}.
              </span>
              <textarea
                value={step.text}
                onChange={(e) => updateStep(i, e.target.value)}
                disabled={disabled}
                rows={2}
                className="flex-1 px-4 py-2 font-body text-sm text-[var(--color-text)] bg-white border border-[var(--color-border)] focus:outline-none focus:border-[var(--color-accent)]"
                placeholder="Step description"
              />
              <button
                type="button"
                onClick={() => removeStep(i)}
                disabled={disabled}
                className="p-2 text-[var(--color-text-muted)] hover:text-red-600 shrink-0"
                aria-label="Remove step"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
          Linked video URL
        </label>
        <input
          type="url"
          value={linkedVideoUrl}
          onChange={(e) => onLinkedVideoUrlChange(e.target.value)}
          disabled={disabled}
          placeholder="YouTube, TikTok, or Instagram URL"
          className="w-full px-4 py-3 font-body text-[var(--color-text)] bg-white border border-[var(--color-border)] focus:outline-none focus:border-[var(--color-accent)]"
        />
      </div>
        </>
      )}
    </div>
  );
}
