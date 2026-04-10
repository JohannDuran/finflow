"use server";

import { budgetService } from "@/lib/services/budget.service";
import type { Budget } from "@/types";

/**
 * Normaliza las llaves de la capa frontend hacia la estructura de Prisma
 */
function mapFrontendToDb(frontendBudget: Partial<Budget>) {
  const dbData: any = { ...frontendBudget };
  
  if (dbData.startDate) {
    dbData.startDate = new Date(dbData.startDate);
  }
  if (dbData.endDate) {
    dbData.endDate = new Date(dbData.endDate);
  }
  if (dbData.createdAt) {
    dbData.createdAt = new Date(dbData.createdAt);
  }
  if (dbData.updatedAt) {
    dbData.updatedAt = new Date(dbData.updatedAt);
  }

  return dbData;
}

export async function createBudgetAction(budget: Omit<Budget, "createdAt" | "updatedAt" | "spent"> & { id?: string }) {
  try {
    const dbData = mapFrontendToDb(budget);

    const newBudget = await budgetService.createBudget(budget.userId, dbData);

    return { success: true, data: newBudget };
  } catch (error: any) {
    console.error("❌ Error en createBudgetAction:", error);
    return { success: false, error: error.message };
  }
}

export async function updateBudgetAction(
  userId: string,
  budgetId: string,
  data: Partial<Budget>
) {
  try {
    const dbData = mapFrontendToDb(data);

    // Evitamos enviar el id dentro del data de update
    delete dbData.id;

    const updatedBudget = await budgetService.updateBudget(
      userId,
      budgetId,
      dbData
    );

    return { success: true, data: updatedBudget };
  } catch (error: any) {
    console.error("❌ Error en updateBudgetAction:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteBudgetAction(userId: string, budgetId: string) {
  try {
    await budgetService.deleteBudget(userId, budgetId);
    return { success: true };
  } catch (error: any) {
    console.error("❌ Error en deleteBudgetAction:", error);
    return { success: false, error: error.message };
  }
}
