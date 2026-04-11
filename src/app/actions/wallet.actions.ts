"use server";

import { walletService } from "@/lib/services/wallet.service";
import type { Wallet } from "@/types";
import { createClient } from "@/lib/supabase/server";
import { sanitizeError } from "@/lib/utils";
import logger from "@/lib/logger";

/**
 * Normaliza las llaves de la capa frontend hacia la estructura de Prisma
 */
function mapFrontendToDb(frontendWallet: Partial<Wallet>) {
  const dbData: any = { ...frontendWallet };
  
  if (dbData.createdAt) {
    dbData.createdAt = new Date(dbData.createdAt);
  }
  if (dbData.updatedAt) {
    dbData.updatedAt = new Date(dbData.updatedAt);
  }

  return dbData;
}

export async function createWalletAction(wallet: Omit<Wallet, "createdAt"> & { id?: string }) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const dbData = mapFrontendToDb(wallet);

    // Si pasamos ID por optimistic UI, lo inyectamos al DB
    const newWallet = await walletService.createWallet(user.id, dbData);

    return { success: true, data: newWallet };
  } catch (error: any) {
    logger.error({ err: error }, "createWalletAction failed");
    return { success: false, error: error.message };
  }
}

export async function updateWalletAction(
  userId: string, // Kept for signature compatibility 
  walletId: string,
  data: Partial<Wallet>
) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const dbData = mapFrontendToDb(data);

    // Evitamos enviar el id dentro del data de update
    delete dbData.id;

    const updatedWallet = await walletService.updateWallet(
      user.id,
      walletId,
      dbData
    );

    return { success: true, data: updatedWallet };
  } catch (error: any) {
    logger.error({ err: error }, "updateWalletAction failed");
    return { success: false, error: error.message };
  }
}

export async function deleteWalletAction(userId: string, walletId: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    await walletService.deleteWallet(user.id, walletId);
    return { success: true };
  } catch (error: any) {
    logger.error({ err: error }, "deleteWalletAction failed");
    return { success: false, error: error.message };
  }
}
