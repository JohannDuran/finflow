"use client";

import { useState, useEffect } from "react";
import { useFinFlowStore } from "@/store";
import { cn, generateId } from "@/lib/utils";
import type { BudgetPeriod, Budget } from "@/types";
import { createBudgetAction, updateBudgetAction } from "@/app/actions/budget.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const periodOptions: { value: BudgetPeriod; label: string }[] = [
  { value: "weekly", label: "Semanal" },
  { value: "biweekly", label: "Quincenal" },
  { value: "monthly", label: "Mensual" },
  { value: "yearly", label: "Anual" },
];

export function BudgetFormModal() {
  const { activeModal, setActiveModal, editingItem, setEditingItem, categories, wallets, addBudget, updateBudget } = useFinFlowStore();

  const isOpen = activeModal === "budget-form";
  const editBudget = editingItem as Budget | null;
  const isEditing = !!editBudget && "period" in editBudget;

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState<BudgetPeriod>("monthly");
  const [categoryId, setCategoryId] = useState("");
  const [walletId, setWalletId] = useState("");
  const [rollover, setRollover] = useState(false);

  const expenseCategories = categories.filter((c) => c.type === "expense");

  useEffect(() => {
    if (isEditing && editBudget) {
      setName(editBudget.name);
      setAmount(editBudget.amount.toString());
      setPeriod(editBudget.period);
      setCategoryId(editBudget.categoryId);
      setWalletId(editBudget.walletId || "");
      setRollover(editBudget.rollover);
    } else {
      resetForm();
    }
  }, [editBudget, isEditing]);

  function resetForm() {
    setName("");
    setAmount("");
    setPeriod("monthly");
    setCategoryId("");
    setWalletId("");
    setRollover(false);
  }

  function handleClose() {
    setActiveModal(null);
    setEditingItem(null);
    resetForm();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) {
      toast.error("Ingresa un monto válido");
      return;
    }
    if (!categoryId) {
      toast.error("Selecciona una categoría");
      return;
    }

    const cat = categories.find((c) => c.id === categoryId);
    const optimisticId = isEditing && editBudget ? editBudget.id : generateId();

    const budgetData = {
      id: optimisticId,
      userId: "u1",
      name: name || cat?.name || "Presupuesto",
      amount: numAmount,
      period,
      categoryId,
      walletId: walletId || undefined,
      startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split("T")[0],
      rollover,
      isActive: true,
    };

    if (isEditing && editBudget) {
      updateBudget(editBudget.id, budgetData);
      const res = await updateBudgetAction("u1", editBudget.id, budgetData);
      if (res.success) {
        toast.success("Presupuesto actualizado");
      } else {
        toast.error("Falló la actualización: " + res.error);
      }
    } else {
      addBudget(budgetData);
      const res = await createBudgetAction(budgetData);
      if (res.success) {
        toast.success("Presupuesto creado");
      } else {
        toast.error("Falló la creación: " + res.error);
      }
    }

    handleClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[480px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar presupuesto" : "Nuevo presupuesto"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Modifica los datos de este presupuesto" : "Fija un límite de gasto por categoría"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="budget-name">Nombre (opcional)</Label>
            <Input
              id="budget-name"
              placeholder="Ej: Alimentación mensual"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label>Categoría</Label>
            <div className="mt-2">
              <CategoryPicker
                categories={expenseCategories}
                selectedId={categoryId}
                onSelect={(id) => {
                  setCategoryId(id);
                  if (!name) {
                    const cat = categories.find((c) => c.id === id);
                    if (cat) setName(cat.name);
                  }
                }}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="budget-amount">Monto límite</Label>
            <div className="relative mt-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">$</span>
              <Input
                id="budget-amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="5000.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-7"
              />
            </div>
          </div>

          <div>
            <Label>Período</Label>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {periodOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setPeriod(opt.value)}
                  className={cn(
                    "py-2 rounded-lg text-sm font-medium border-2 transition-all cursor-pointer",
                    period === opt.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-transparent bg-muted text-muted-foreground hover:border-border"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label>Wallet (opcional)</Label>
            <Select value={walletId || "all"} onValueChange={(v) => setWalletId(v === "all" ? "" : v)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Todos los wallets" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los wallets</SelectItem>
                {wallets.filter((w) => !w.isArchived).map((w) => (
                  <SelectItem key={w.id} value={w.id}>{w.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Rollover</Label>
              <p className="text-xs text-muted-foreground">Arrastra el excedente al siguiente período</p>
            </div>
            <Switch checked={rollover} onCheckedChange={setRollover} />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              {isEditing ? "Guardar" : "Crear"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
