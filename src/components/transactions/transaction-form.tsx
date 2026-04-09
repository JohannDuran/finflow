"use client";

import { useEffect, useState } from "react";
import { useFinFlowStore } from "@/store";
import { cn } from "@/lib/utils";
import type { TransactionType, Transaction } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryPicker } from "@/components/shared/category-picker";
import { toast } from "sonner";

const typeLabels: Record<TransactionType, string> = {
  expense: "Gasto",
  income: "Ingreso",
  transfer: "Transferencia",
};

const typeColors: Record<TransactionType, string> = {
  expense: "bg-expense/10 text-expense border-expense/30",
  income: "bg-income/10 text-income border-income/30",
  transfer: "bg-transfer/10 text-transfer border-transfer/30",
};

export function TransactionFormModal() {
  const {
    activeModal,
    setActiveModal,
    editingItem,
    setEditingItem,
    wallets,
    categories,
    addTransaction,
    updateTransaction,
  } = useFinFlowStore();

  const isOpen = activeModal === "transaction-form";
  const editTx = editingItem as Transaction | null;
  const isEditing = !!editTx;

  const [type, setType] = useState<TransactionType>("expense");
  const [amount, setAmount] = useState("");
  const [walletId, setWalletId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState<"daily" | "weekly" | "monthly" | "yearly">("monthly");
  const [transferToWalletId, setTransferToWalletId] = useState("");
  const [showNote, setShowNote] = useState(false);

  useEffect(() => {
    if (editTx) {
      setType(editTx.type);
      // FIX: Safely access amount and provide an empty string fallback
      setAmount(editTx.amount?.toString() || ""); 
      
      // I also added fallbacks (|| "") to these string setters 
      // to prevent uncontrolled input warnings in React just in case they are undefined.
      setWalletId(editTx.walletId || "");
      setCategoryId(editTx.categoryId || "");
      setDescription(editTx.description || ""); 
      
      setNote(editTx.note || "");
      setDate(editTx.date);
      setIsRecurring(editTx.isRecurring);
      setFrequency(editTx.recurringRule?.frequency || "monthly");
      setTransferToWalletId(editTx.transferToWalletId || "");
      setShowNote(!!editTx.note);
    } else {
      resetForm();
    }
  }, [editTx]);

  function resetForm() {
    setType("expense");
    setAmount("");
    setWalletId(wallets[0]?.id || "");
    setCategoryId("");
    setDescription("");
    setNote("");
    setDate(new Date().toISOString().split("T")[0]);
    setIsRecurring(false);
    setFrequency("monthly");
    setTransferToWalletId("");
    setShowNote(false);
  }

  function handleClose() {
    setActiveModal(null);
    setEditingItem(null);
    resetForm();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) {
      toast.error("Ingresa un monto válido");
      return;
    }
    if (!walletId) {
      toast.error("Selecciona un wallet");
      return;
    }
    if (type !== "transfer" && !categoryId) {
      toast.error("Selecciona una categoría");
      return;
    }
    if (type === "transfer" && !transferToWalletId) {
      toast.error("Selecciona el wallet destino");
      return;
    }
    if (type === "transfer" && walletId === transferToWalletId) {
      toast.error("Los wallets deben ser diferentes");
      return;
    }

    const txData = {
      type,
      amount: numAmount,
      currency: wallets.find((w) => w.id === walletId)?.currency || "MXN" as const,
      walletId,
      userId: "u1",
      categoryId: type === "transfer" ? "cat-transfer" : categoryId,
      description: description || `${typeLabels[type]} - ${new Date(date).toLocaleDateString("es-MX")}`,
      note: note || undefined,
      date,
      isRecurring,
      recurringRule: isRecurring ? { frequency, interval: 1 } : undefined,
      tags: [] as string[],
      transferToWalletId: type === "transfer" ? transferToWalletId : undefined,
    };

    if (isEditing && editTx) {
      updateTransaction(editTx.id, txData);
      toast.success("Transacción actualizada");
    } else {
      addTransaction(txData);
      toast.success("Transacción creada");
    }

    handleClose();
  }

  const activeWallets = wallets.filter((w) => !w.isArchived);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[540px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar transacción" : "Nueva transacción"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Modifica los datos de esta transacción" : "Registra un nuevo movimiento"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Type Tabs */}
          <div className="flex gap-2">
            {(["expense", "income", "transfer"] as TransactionType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setType(t);
                  setCategoryId("");
                }}
                className={cn(
                  "flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all cursor-pointer",
                  type === t ? typeColors[t] : "border-transparent bg-muted text-muted-foreground hover:bg-accent"
                )}
              >
                {typeLabels[t]}
              </button>
            ))}
          </div>

          {/* Amount */}
          <div>
            <Label htmlFor="amount">Monto</Label>
            <div className="relative mt-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-semibold text-muted-foreground">
                $
              </span>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8 text-2xl font-bold h-14 text-right"
              />
            </div>
          </div>

          {/* Wallet */}
          <div>
            <Label>{type === "transfer" ? "Wallet origen" : "Wallet"}</Label>
            <Select value={walletId} onValueChange={setWalletId}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Selecciona wallet" />
              </SelectTrigger>
              <SelectContent>
                {activeWallets.map((w) => (
                  <SelectItem key={w.id} value={w.id}>
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: w.color }} />
                      {w.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Transfer destination */}
          {type === "transfer" && (
            <div>
              <Label>Wallet destino</Label>
              <Select value={transferToWalletId} onValueChange={setTransferToWalletId}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecciona destino" />
                </SelectTrigger>
                <SelectContent>
                  {activeWallets
                    .filter((w) => w.id !== walletId)
                    .map((w) => (
                      <SelectItem key={w.id} value={w.id}>
                        <span className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: w.color }} />
                          {w.name}
                        </span>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Category */}
          {type !== "transfer" && (
            <div>
              <Label>Categoría</Label>
              <div className="mt-2">
                <CategoryPicker
                  categories={categories}
                  selectedId={categoryId}
                  onSelect={setCategoryId}
                  type={type === "income" ? "income" : "expense"}
                />
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <Label htmlFor="description">Descripción</Label>
            <Input
              id="description"
              placeholder="Ej: Despensa semanal"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Date */}
          <div>
            <Label htmlFor="date">Fecha</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Note toggle */}
          {!showNote ? (
            <button
              type="button"
              onClick={() => setShowNote(true)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              + Agregar nota
            </button>
          ) : (
            <div>
              <Label htmlFor="note">Nota</Label>
              <Textarea
                id="note"
                placeholder="Nota adicional..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="mt-1"
                rows={2}
              />
            </div>
          )}

          {/* Recurring */}
          {type !== "transfer" && (
            <div className="flex items-center justify-between">
              <div>
                <Label>Recurrente</Label>
                <p className="text-xs text-muted-foreground">Se repite automáticamente</p>
              </div>
              <Switch checked={isRecurring} onCheckedChange={setIsRecurring} />
            </div>
          )}

          {isRecurring && type !== "transfer" && (
            <div>
              <Label>Frecuencia</Label>
              <Select value={frequency} onValueChange={(v) => setFrequency(v as typeof frequency)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Diaria</SelectItem>
                  <SelectItem value="weekly">Semanal</SelectItem>
                  <SelectItem value="monthly">Mensual</SelectItem>
                  <SelectItem value="yearly">Anual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              {isEditing ? "Guardar cambios" : "Crear"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
