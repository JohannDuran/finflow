"use client";

import { useMemo } from "react";
import { useFinFlowStore } from "@/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CurrencyDisplay } from "@/components/shared/currency-display";
import { IconRenderer } from "@/components/shared/icon-renderer";
import { EmptyState } from "@/components/shared/empty-state";
import { cn, formatCurrency } from "@/lib/utils";
import {
  CreditCard,
  Plus,
  Calendar,
  TrendingUp,
  Repeat,
  AlertCircle,
  DollarSign,
  CalendarDays,
} from "lucide-react";

const cycleLabels: Record<string, string> = {
  weekly: "Semanal",
  monthly: "Mensual",
  yearly: "Anual",
};

export default function SubscriptionsPage() {
  const { subscriptions, categories } = useFinFlowStore();

  const activeSubs = subscriptions.filter((s) => s.isActive);

  const summary = useMemo(() => {
    const monthlyTotal = activeSubs.reduce((sum, s) => {
      if (s.billingCycle === "weekly") return sum + s.amount * 4.33;
      if (s.billingCycle === "yearly") return sum + s.amount / 12;
      return sum + s.amount;
    }, 0);
    const yearlyTotal = monthlyTotal * 12;
    const nextBill = activeSubs
      .filter((s) => s.nextBillDate)
      .sort((a, b) => a.nextBillDate.localeCompare(b.nextBillDate))[0];
    const daysToNext = nextBill
      ? Math.ceil(
          (new Date(nextBill.nextBillDate).getTime() - Date.now()) /
            (1000 * 60 * 60 * 24)
        )
      : null;

    return { monthlyTotal, yearlyTotal, nextBill, daysToNext, count: activeSubs.length };
  }, [activeSubs]);

  // Group by category
  const groupedSubs = useMemo(() => {
    const map = new Map<string, typeof activeSubs>();
    activeSubs.forEach((s) => {
      const catId = s.categoryId;
      const existing = map.get(catId) || [];
      existing.push(s);
      map.set(catId, existing);
    });
    return Array.from(map.entries()).map(([catId, subs]) => {
      const cat = categories.find((c) => c.id === catId);
      const total = subs.reduce((sum, s) => sum + s.amount, 0);
      return { catId, catName: cat?.name || "Otro", catColor: cat?.color || "#64748B", subs, total };
    });
  }, [activeSubs, categories]);

  // Upcoming bills sorted by date
  const upcomingBills = useMemo(() => {
    return [...activeSubs]
      .sort((a, b) => a.nextBillDate.localeCompare(b.nextBillDate))
      .slice(0, 5);
  }, [activeSubs]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-display">Suscripciones</h2>
          <p className="text-sm text-muted-foreground">
            {summary.count} suscripciones activas
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Nueva suscripción</span>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">Costo mensual</p>
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-rose-500" />
              </div>
            </div>
            <CurrencyDisplay
              amount={summary.monthlyTotal}
              type="expense"
              size="md"
              className="font-bold"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">Costo anual</p>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <CalendarDays className="w-4 h-4 text-amber-500" />
              </div>
            </div>
            <CurrencyDisplay
              amount={summary.yearlyTotal}
              type="expense"
              size="md"
              className="font-bold"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">Servicios</p>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Repeat className="w-4 h-4 text-blue-500" />
              </div>
            </div>
            <p className="text-xl font-bold">{summary.count}</p>
            <p className="text-[10px] text-muted-foreground">activos</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">Próx. cobro</p>
              <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-violet-500" />
              </div>
            </div>
            {summary.nextBill ? (
              <>
                <p className="text-sm font-bold truncate">
                  {summary.nextBill.name}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  en {summary.daysToNext} días · {formatCurrency(summary.nextBill.amount)}
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">—</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* All Subscriptions */}
        <div className="lg:col-span-2 space-y-4">
          {activeSubs.length === 0 ? (
            <EmptyState
              icon="CreditCard"
              title="Sin suscripciones"
              description="Agrega tus suscripciones para visualizar cuánto gastas mensualmente en servicios recurrentes."
              actionLabel="Agregar suscripción"
              onAction={() => {}}
            />
          ) : (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-display flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-primary" />
                  Tus suscripciones
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-1">
                  {activeSubs.map((sub, idx) => {
                    const daysUntil = Math.ceil(
                      (new Date(sub.nextBillDate).getTime() - Date.now()) /
                        (1000 * 60 * 60 * 24)
                    );

                    return (
                      <div key={sub.id}>
                        <div className="flex items-center gap-3 py-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                            style={{ backgroundColor: `${sub.color}15` }}
                          >
                            <IconRenderer name={sub.icon} size={18} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{sub.name}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <Badge
                                variant="secondary"
                                className="text-[10px] px-1.5 py-0"
                              >
                                {cycleLabels[sub.billingCycle]}
                              </Badge>
                              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {daysUntil <= 7 ? (
                                  <span className="text-amber-500 font-medium">
                                    en {daysUntil} días
                                  </span>
                                ) : (
                                  `en ${daysUntil} días`
                                )}
                              </span>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-sm font-semibold">
                              {formatCurrency(sub.amount)}
                            </p>
                            <p className="text-[10px] text-muted-foreground">
                              /{sub.billingCycle === "yearly" ? "año" : "mes"}
                            </p>
                          </div>
                        </div>
                        {idx < activeSubs.length - 1 && <Separator />}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar: Upcoming & Breakdown */}
        <div className="space-y-4">
          {/* Upcoming Bills Timeline */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Próximos cobros
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {upcomingBills.map((sub) => {
                  const date = new Date(sub.nextBillDate);
                  return (
                    <div key={sub.id} className="flex items-center gap-3">
                      <div className="flex flex-col items-center w-10 shrink-0">
                        <span className="text-lg font-bold leading-none">
                          {date.getDate()}
                        </span>
                        <span className="text-[10px] text-muted-foreground uppercase">
                          {date.toLocaleDateString("es-MX", { month: "short" })}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {sub.name}
                        </p>
                      </div>
                      <span className="text-sm font-semibold shrink-0">
                        {formatCurrency(sub.amount)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Por categoría
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {groupedSubs.map((group) => (
                  <div key={group.catId}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">
                        {group.catName}
                      </span>
                      <span className="text-sm font-semibold">
                        {formatCurrency(group.total)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {group.subs.map((s) => (
                        <div
                          key={s.id}
                          className="w-6 h-6 rounded-md flex items-center justify-center"
                          style={{ backgroundColor: `${s.color}20` }}
                          title={s.name}
                        >
                          <IconRenderer name={s.icon} size={12} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
