"use client";

import { formatCurrency } from "@/lib/utils";
import type { Currency } from "@/types";
import { cn } from "@/lib/utils";

interface CurrencyDisplayProps {
  amount: number;
  currency?: Currency;
  className?: string;
  showSign?: boolean;
  type?: "income" | "expense" | "transfer" | "neutral";
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-xl font-semibold",
  xl: "text-3xl font-bold",
};

export function CurrencyDisplay({
  amount,
  currency = "MXN",
  className,
  showSign = false,
  type = "neutral",
  size = "md",
}: CurrencyDisplayProps) {
  const typeClasses = {
    income: "text-income",
    expense: "text-expense",
    transfer: "text-transfer",
    neutral: "",
  };

  const displayAmount = showSign
    ? type === "income"
      ? `+${formatCurrency(Math.abs(amount), currency)}`
      : type === "expense"
        ? `-${formatCurrency(Math.abs(amount), currency)}`
        : type === "transfer"
          ? `↔ ${formatCurrency(Math.abs(amount), currency)}`
          : formatCurrency(amount, currency)
    : formatCurrency(Math.abs(amount), currency);

  return (
    <span className={cn(sizeClasses[size], typeClasses[type], "tabular-nums tracking-tight", className)}>
      {displayAmount}
    </span>
  );
}
