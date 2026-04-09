"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CurrencyDisplay } from "@/components/shared/currency-display";
import { IconRenderer } from "@/components/shared/icon-renderer";
import { walletTypeLabels } from "@/lib/constants";
import type { Wallet } from "@/types";
import { Edit } from "lucide-react";
import { cn } from "@/lib/utils";

interface WalletCardProps {
  wallet: Wallet;
  onEdit: () => void;
  onClick?: () => void;
}

export function WalletCard({ wallet, onEdit, onClick }: WalletCardProps) {
  const creditUsed = wallet.type === "credit" && wallet.creditLimit
    ? Math.round((Math.abs(wallet.balance) / wallet.creditLimit) * 100)
    : 0;

  return (
    <Card
      className={cn(
        "group hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden relative",
      )}
      onClick={onClick}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
        style={{ backgroundColor: wallet.color }}
      />
      <CardContent className="p-5 pl-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${wallet.color}15` }}
            >
              <IconRenderer name={wallet.icon} size={22} />
            </div>
            <div>
              <h3 className="font-semibold font-display text-sm">{wallet.name}</h3>
              <Badge variant="secondary" className="text-[10px] mt-0.5">
                {walletTypeLabels[wallet.type] || wallet.type}
              </Badge>
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(); }}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-accent cursor-pointer"
            aria-label="Editar wallet"
          >
            <Edit className="w-4 h-4" />
          </button>
        </div>

        <CurrencyDisplay
          amount={wallet.balance}
          currency={wallet.currency}
          size="lg"
          className="block mb-2"
        />

        <p className="text-xs text-muted-foreground">{wallet.currency}</p>

        {wallet.type === "credit" && wallet.creditLimit && (
          <div className="mt-3 space-y-1.5">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{creditUsed}% utilizado</span>
              <span>Límite: ${wallet.creditLimit.toLocaleString("es-MX")}</span>
            </div>
            <Progress
              value={creditUsed}
              className="h-2"
              indicatorClassName={
                creditUsed > 80 ? "bg-red-500" : creditUsed > 50 ? "bg-amber-500" : "bg-emerald-500"
              }
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
