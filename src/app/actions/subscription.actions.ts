"use server";

import { subscriptionService } from "@/lib/services/subscription.service";
import type { Subscription } from "@/types";
import { createClient } from "@/lib/supabase/server";
import { sanitizeError } from "@/lib/utils";
import logger from "@/lib/logger";

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
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const dbData = mapFrontendToDb(sub);

    const newSub = await subscriptionService.createSubscription(sub.userId, dbData);

    return { success: true, data: newSub };
  } catch (error: any) {
    logger.error({ err: error }, "createSubscriptionAction failed");
    return { success: false, error: error.message };
  }
}

export async function updateSubscriptionAction(
  userId: string,
  subId: string,
  data: Partial<Subscription>
) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const dbData = mapFrontendToDb(data);

    // Evitamos enviar campos que Prisma no acepta en update
    delete dbData.id;
    delete dbData.userId;
    delete dbData.category;
    delete dbData.createdAt;

    const updatedSub = await subscriptionService.updateSubscription(
      userId,
      subId,
      dbData
    );

    return { success: true, data: updatedSub };
  } catch (error: any) {
    logger.error({ err: error }, "updateSubscriptionAction failed");
    return { success: false, error: error.message };
  }
}

export async function deleteSubscriptionAction(userId: string, subId: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    await subscriptionService.deleteSubscription(user.id, subId);
    return { success: true };
  } catch (error: any) {
    logger.error({ err: error }, "deleteSubscriptionAction failed");
    return { success: false, error: error.message };
  }
}
