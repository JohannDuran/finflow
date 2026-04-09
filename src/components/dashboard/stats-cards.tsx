"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CurrencyDisplay } from "@/components/shared/currency-display";
import { IconRenderer } from "@/components/shared/icon-renderer";
import { cn, getPercentageChange } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  amount: number;
  icon: string;
  iconColor: string;
  trend?: number;
  type?: "income" | "expense" | "transfer" | "neutral";
  delay?: number;
}

function StatCard({ title, amount, icon, iconColor, trend, type = "neutral", delay = 0 }: StatCardProps) {
  return (
    <Card
      className="hover:shadow-md transition-shadow duration-300"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${iconColor}15` }}
          >
            <IconRenderer name={icon} size={20} className={cn("opacity-90")} />
          </div>
          {trend !== undefined && trend !== 0 && (
            <div className={cn("flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
              trend > 0 ? "bg-income/10 text-income" : "bg-expense/10 text-expense"
            )}>
              {trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {Math.abs(trend)}%
            </div>
          )}
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground mb-1">{title}</p>
        <CurrencyDisplay amount={amount} type={type} size="lg" />
      </CardContent>
    </Card>
  );
}

interface StatsCardsProps {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  netIncome: number;
  prevIncome?: number;
  prevExpenses?: number;
}

export function StatsCards({
  totalBalance,
  totalIncome,
  totalExpenses,
  netIncome,
  prevIncome = 0,
  prevExpenses = 0,
}: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <StatCard
        title="Balance total"
        amount={totalBalance}
        icon="Wallet"
        iconColor="#10B981"
        delay={0}
      />
      <StatCard
        title="Ingresos del mes"
        amount={totalIncome}
        icon="TrendingUp"
        iconColor="#22C55E"
        type="income"
        trend={getPercentageChange(totalIncome, prevIncome)}
        delay={50}
      />
      <StatCard
        title="Gastos del mes"
        amount={totalExpenses}
        icon="TrendingDown"
        iconColor="#F43F5E"
        type="expense"
        trend={getPercentageChange(totalExpenses, prevExpenses)}
        delay={100}
      />
      <StatCard
        title="Balance neto"
        amount={netIncome}
        icon="ArrowUpDown"
        iconColor={netIncome >= 0 ? "#22C55E" : "#F43F5E"}
        type={netIncome >= 0 ? "income" : "expense"}
        delay={150}
      />
    </div>
  );
}
