import { Badge } from "@/components/ui/badge";
import { LitterCategories } from "@/constants/litter-categories";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CategorySelectionProps {
  selectedCategoryId: number | null;
  onSelectCategoryId: (id: number | null) => void;
}

export function CategorySelection({ selectedCategoryId, onSelectCategoryId }: CategorySelectionProps) {
  const categoryColors: Record<number, string> = {
    1: "from-green-500 to-emerald-400",
    2: "from-emerald-500 to-teal-400",
    3: "from-teal-500 to-green-400",
    4: "from-green-600 to-lime-400",
  };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="w-full">
      <div className="w-full flex flex-wrap gap-2">
        <Badge
          variant={!selectedCategoryId ? "default" : "outline"}
          onClick={() => onSelectCategoryId(null)}
          className={cn(
            "cursor-pointer text-xs px-3",
            !selectedCategoryId
              ? "bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600"
              : "hover:bg-muted"
          )}
        >
          All
        </Badge>
        {LitterCategories.map((category) => (
          <Badge
            key={category.id}
            variant={selectedCategoryId === category.id ? "default" : "outline"}
            onClick={() => onSelectCategoryId(category.id)}
            className={cn(
              "cursor-pointer text-xs px-3",
              selectedCategoryId === category.id
                ? `bg-gradient-to-r ${categoryColors[category.id] || "from-green-500 to-emerald-400"} hover:opacity-90`
                : "hover:bg-muted"
            )}
          >
            {category.en}
          </Badge>
        ))}
      </div>
    </motion.div>
  );
}
