"use client";

import { cn } from "@/lib/utils";
import { IconRenderer } from "@/components/shared/icon-renderer";
import type { Category } from "@/types";
import { Check } from "lucide-react";

interface CategoryPickerProps {
  categories: Category[];
  selectedId: string;
  onSelect: (id: string) => void;
  type?: "income" | "expense";
}

export function CategoryPicker({ categories, selectedId, onSelect, type }: CategoryPickerProps) {
  const filtered = type ? categories.filter((c) => c.type === type) : categories;

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-[280px] overflow-y-auto p-1">
      {filtered.map((cat) => {
        const isSelected = cat.id === selectedId;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelect(cat.id)}
            className={cn(
              "flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer",
              isSelected
                ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                : "border-transparent hover:bg-accent hover:border-border"
            )}
          >
            <div
              className="relative w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${cat.color}20` }}
            >
              <IconRenderer name={cat.icon} size={18} className="text-foreground" />
              {isSelected && (
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-white" />
                </div>
              )}
            </div>
            <span className="text-xs font-medium text-center leading-tight line-clamp-2">
              {cat.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
