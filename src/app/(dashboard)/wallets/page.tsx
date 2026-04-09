"use client";

import { useFinFlowStore } from "@/store";
import { WalletCard } from "@/components/wallets/wallet-card";
import { WalletFormModal } from "@/components/wallets/wallet-form";
import { TransferFormModal } from "@/components/wallets/transfer-form";
import { CurrencyDisplay } from "@/components/shared/currency-display";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, ArrowLeftRight, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import type { Wallet } from "@/types";

export default function WalletsPage() {
  const { wallets, setActiveModal, setEditingItem, deleteWallet } = useFinFlowStore();
  const [deleteTarget, setDeleteTarget] = useState<Wallet | null>(null);

  const activeWallets = wallets.filter((w) => !w.isArchived);
  const totalBalance = activeWallets.reduce((sum, w) => sum + w.balance, 0);

  function handleEdit(wallet: Wallet) {
    setEditingItem(wallet);
    setActiveModal("wallet-form");
  }

  function handleDelete() {
    if (deleteTarget) {
      deleteWallet(deleteTarget.id);
      setDeleteTarget(null);
      toast.success("Wallet eliminado");
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-display">Wallets</h2>
          <p className="text-sm text-muted-foreground">{activeWallets.length} cuentas activas</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setActiveModal("transfer-form")} className="gap-2">
            <ArrowLeftRight className="w-4 h-4" />
            <span className="hidden sm:inline">Transferir</span>
          </Button>
          <Button onClick={() => setActiveModal("wallet-form")} className="gap-2">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Nuevo wallet</span>
          </Button>
        </div>
      </div>

      {/* Total Balance Card */}
      <Card className="bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border-emerald-500/20">
        <CardContent className="p-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">Balance total consolidado</p>
          <CurrencyDisplay amount={totalBalance} size="xl" />
          <p className="text-xs text-muted-foreground mt-1">MXN</p>
        </CardContent>
      </Card>

      {/* Wallet Grid */}
      {activeWallets.length === 0 ? (
        <EmptyState
          icon="Wallet"
          title="Sin wallets"
          description="Agrega tu primera cuenta o billetera para empezar a registrar transacciones."
          actionLabel="Crear wallet"
          onAction={() => setActiveModal("wallet-form")}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {activeWallets.map((wallet) => (
            <WalletCard
              key={wallet.id}
              wallet={wallet}
              onEdit={() => handleEdit(wallet)}
            />
          ))}
        </div>
      )}

      <WalletFormModal />
      <TransferFormModal />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar wallet?</AlertDialogTitle>
            <AlertDialogDescription>
              Se eliminarán todas las transacciones asociadas a &quot;{deleteTarget?.name}&quot;. Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
