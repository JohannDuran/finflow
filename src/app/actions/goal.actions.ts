"use server";

import { goalService } from "@/lib/services/goal.service";
import type { Goal } from "@/types";

/**
 * Normaliza las llaves de la capa frontend hacia la estructura de Prisma
 */
function mapFrontendToDb(frontendGoal: Partial<Goal>) {
  const dbData: any = { ...frontendGoal };
  
  if (dbData.deadline) {
    dbData.deadline = new Date(dbData.deadline);
  }
  if (dbData.createdAt) {
    dbData.createdAt = new Date(dbData.createdAt);
  }
  if (dbData.updatedAt) {
    dbData.updatedAt = new Date(dbData.updatedAt);
  }

  return dbData;
}

export async function createGoalAction(goal: Omit<Goal, "createdAt" | "updatedAt" | "currentAmount"> & { id?: string }) {
  try {
    const dbData = mapFrontendToDb(goal);

    const newGoal = await goalService.createGoal(goal.userId, dbData);

    return { success: true, data: newGoal };
  } catch (error: any) {
    console.error("❌ Error en createGoalAction:", error);
    return { success: false, error: error.message };
  }
}

export async function updateGoalAction(
  userId: string,
  goalId: string,
  data: Partial<Goal>
) {
  try {
    const dbData = mapFrontendToDb(data);

    // Evitamos enviar el id dentro del data de update
    delete dbData.id;

    const updatedGoal = await goalService.updateGoal(
      userId,
      goalId,
      dbData
    );

    return { success: true, data: updatedGoal };
  } catch (error: any) {
    console.error("❌ Error en updateGoalAction:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteGoalAction(userId: string, goalId: string) {
  try {
    await goalService.deleteGoal(userId, goalId);
    return { success: true };
  } catch (error: any) {
    console.error("❌ Error en deleteGoalAction:", error);
    return { success: false, error: error.message };
  }
}
