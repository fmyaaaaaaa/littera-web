import type { LitterCategory } from "@/types";

interface LitterCategoryChipProps {
  category: LitterCategory;
  size?: "sm" | "md" | "lg";
  variant?: "blue" | "green" | "amber" | "purple" | "gray";
}

export function LitterCategoryChip({ category, size = "md", variant = "blue" }: LitterCategoryChipProps) {
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

  const colorClasses = (() => {
    switch (variant) {
      case "green":
        return "bg-green-100 text-green-800 border-green-200";
      case "amber":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "purple":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "gray":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "blue":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  })();

  return (
    <div
      className={`
        inline-flex items-center rounded-full 
        ${colorClasses}
        ${sizeClasses}`}
    >
      <span className="font-medium whitespace-nowrap">{category.en}</span>
    </div>
  );
}

interface LitterCategoryChipsProps {
  categories: LitterCategory[];
  size?: "sm" | "md" | "lg";
  variant?: "blue" | "green" | "amber" | "purple" | "gray";
}

export function LitterCategoryChips({ categories, size = "md", variant = "blue" }: LitterCategoryChipsProps) {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {categories.map((category) => (
        <LitterCategoryChip key={category.id} category={category} size={size} variant={variant} />
      ))}
    </div>
  );
}
