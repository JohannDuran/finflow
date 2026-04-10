"use server";

import { subscriptionService } from "@/lib/services/subscription.service";
import type { Subscription } from "@/types";

/**
 * Normaliza las llaves de la capa frontend hacia la estructura de Prisma
 */
function mapFrontendToDb(frontendSub: Partial<Subscription>) {
  const dbData: any = { ...frontendSub };
  
  if (dbData.nextBillDate) {
    dbData.nextBillDate = new Date(dbData.nextBillDate);
  }
  if (dbData.createdAt) {
    dbData.createdAt = new Date(dbData.createdAt);
  }
  if (dbData.updatedAt) {
    dbData.updatedAt = new Date(dbData.updatedAt);
  }

  return dbData;
}

export async function createSubscriptionAction(sub: Omit<Subscription, "createdAt" | "updatedAt"> & { id?: string }) {
  try {
    const dbData = mapFrontendToDb(sub);

    const newSub = await subscriptionService.createSubscription(sub.userId, dbData);

    return { success: true, data: newSub };
  } catch (error: any) {
    console.error("❌ Error en createSubscriptionAction:", error);
    return { success: false, error: error.message };
  }
}

export async function updateSubscriptionAction(
  userId: string,
  subId: string,
  data: Partial<Subscription>
) {
  try {
    const dbData = mapFrontendToDb(data);

    // Evitamos enviar el id dentro del data de update
    delete dbData.id;

    const updatedSub = await subscriptionService.updateSubscription(
      userId,
      subId,
      dbData
    );

    return { success: true, data: updatedSub };
  } catch (error: any) {
    console.error("❌ Error en updateSubscriptionAction:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteSubscriptionAction(userId: string, subId: string) {
  try {
    await subscriptionService.deleteSubscription(userId, subId);
    return { success: true };
  } catch (error: any) {
    console.error("❌ Error en deleteSubscriptionAction:", error);
    return { success: false, error: error.message };
  }
}
