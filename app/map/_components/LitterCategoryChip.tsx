"use client";

import type { LitterCategory } from "@/types";

interface LitterCategoryChipProps {
  category: LitterCategory;
  size?: "sm" | "md" | "lg";
}

export function LitterCategoryChip({ category, size = "md" }: LitterCategoryChipProps) {
  const sizeClasses = (() => {
    switch (size) {
      case "sm":
        return "text-xs px-2 py-0.5";
      case "lg":
        return "text-base px-4 py-2";
      case "md":
        return "text-sm px-3 py-1";
      default:
        return "text-sm px-3 py-1";
    }
  })();

  return (
    <div
      className={`
        inline-flex items-center rounded-full 
        bg-blue-100 text-blue-800 border border-blue-200
        ${sizeClasses}`}
    >
      <span className="font-medium whitespace-nowrap">{category.en}</span>
    </div>
  );
}

interface LitterCategoryChipsProps {
  categories: LitterCategory[];
  size?: "sm" | "md" | "lg";
}

export function LitterCategoryChips({ categories, size = "md" }: LitterCategoryChipsProps) {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {categories.map((category) => (
        <LitterCategoryChip key={category.id} category={category} size={size} />
      ))}
    </div>
  );
}
