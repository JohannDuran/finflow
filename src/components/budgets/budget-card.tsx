"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { IconRenderer } from "@/components/shared/icon-renderer";
import { formatCurrency, getBudgetBarColor } from "@/lib/utils";
import { budgetPeriodLabels } from "@/lib/constants";
import type { Budget, Category } from "@/types";
import { Edit, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface BudgetCardProps {
  budget: Budget;
  category?: Category;
  onEdit: () => void;
}

export function BudgetCard({ budget, category, onEdit }: BudgetCardProps) {
  const percentage = budget.amount > 0 ? Math.round((budget.spent / budget.amount) * 100) : 0;
  const remaining = budget.amount - budget.spent;
  const isExceeded = percentage > 100;
  const isWarning = percentage > 90 && !isExceeded;

  return (
    <Card className="group hover:shadow-md transition-all duration-300">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: category ? `${category.color}20` : "#64748B20" }}
            >
              <IconRenderer name={category?.icon || "Target"} size={22} />
            </div>
            <div>
              <h3 className="font-semibold font-display text-sm">{budget.name}</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Badge variant="secondary" className="text-[10px]">
                  {budgetPeriodLabels[budget.period]}
                </Badge>
                {isExceeded && (
                  <Badge variant="destructive" className="text-[10px]">
                    Excedido
                  </Badge>
                )}
                {isWarning && (
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                )}
              </div>
            </div>
          </div>
          <button
            onClick={onEdit}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-accent cursor-pointer"
            aria-label="Editar presupuesto"
          >
            <Edit className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-baseline">
            <span className="text-2xl font-bold font-display tabular-nums">
              {formatCurrency(budget.spent)}
            </span>
            <span className="text-sm text-muted-foreground">
              / {formatCurrency(budget.amount)}
            </span>
          </div>

          <Progress
            value={percentage}
            indicatorClassName={getBudgetBarColor(percentage)}
            className="h-3"
          />

          <div className="flex justify-between text-xs">
            <span className={cn("font-medium", getBudgetBarColor(percentage).replace("bg-", "text-"))}>
              {percentage}%
            </span>
            <span className="text-muted-foreground">
              {remaining >= 0
                ? `Quedan ${formatCurrency(remaining)}`
                : `Excedido por ${formatCurrency(Math.abs(remaining))}`}
            </span>
          </div>

          {budget.rollover && (
            <p className="text-[10px] text-muted-foreground flex items-center gap-1">
              ↩ Rollover activado
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
