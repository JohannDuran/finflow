"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconRenderer } from "@/components/shared/icon-renderer";
import { CurrencyDisplay } from "@/components/shared/currency-display";
import { formatRelativeDate } from "@/lib/utils";
import type { Transaction, Category, Wallet } from "@/types";
import { ArrowRight } from "lucide-react";

interface RecentTransactionsProps {
  transactions: Transaction[];
  categories: Category[];
  wallets: Wallet[];
}

export function RecentTransactions({ transactions, categories, wallets }: RecentTransactionsProps) {
  const recent = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Últimas transacciones</CardTitle>
        <Link
          href="/transactions"
          className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
        >
          Ver todas <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-1">
        {recent.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No hay transacciones aún
          </p>
        ) : (
          recent.map((tx) => {
            const cat = categories.find((c) => c.id === tx.categoryId);
            const wallet = wallets.find((w) => w.id === tx.walletId);

            return (
              <div
                key={tx.id}
                className="flex items-center gap-3 py-2.5 px-2 -mx-2 rounded-xl hover:bg-accent/50 transition-colors"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: cat ? `${cat.color}20` : "#64748B20" }}
                >
                  <IconRenderer
                    name={cat?.icon || "MoreHorizontal"}
                    size={18}
                    className="text-foreground"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{tx.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {cat?.name || "Sin categoría"}
                    {wallet && ` · ${wallet.name}`}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <CurrencyDisplay
                    amount={tx.amount}
                    currency={tx.currency}
                    type={tx.type === "income" ? "income" : tx.type === "transfer" ? "transfer" : "expense"}
                    showSign
                    size="sm"
                    className="font-semibold"
                  />
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatRelativeDate(tx.date)}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
