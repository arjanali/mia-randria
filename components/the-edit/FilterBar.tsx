"use client";

const categories = [
  { id: "all", label: "All" },
  { id: "beauty", label: "Beauty" },
  { id: "travel", label: "Travel" },
  { id: "style", label: "Style" },
  { id: "at-the-table", label: "At the Table" },
] as const;

type CategoryId = (typeof categories)[number]["id"];

interface FilterBarProps {
  active: CategoryId;
  onFilter: (id: CategoryId) => void;
}

export default function FilterBar({ active, onFilter }: FilterBarProps) {
  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-4 md:gap-8 border-b border-[var(--color-border)] pb-6"
      aria-label="Filter by category"
    >
      {categories.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => onFilter(id)}
          className={`text-sm font-medium tracking-widest uppercase transition-colors ${
            active === id
              ? "text-[var(--color-accent)]"
              : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
          }`}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
