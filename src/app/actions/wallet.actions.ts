"use server";

import { walletService } from "@/lib/services/wallet.service";
import type { Wallet } from "@/types";

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
    const dbData = mapFrontendToDb(wallet);

    // Si pasamos ID por optimistic UI, lo inyectamos al DB
    const newWallet = await walletService.createWallet(wallet.userId, dbData);

    return { success: true, data: newWallet };
  } catch (error: any) {
    console.error("❌ Error en createWalletAction:", error);
    return { success: false, error: error.message };
  }
}

export async function updateWalletAction(
  userId: string,
  walletId: string,
  data: Partial<Wallet>
) {
  try {
    const dbData = mapFrontendToDb(data);

    // Evitamos enviar el id dentro del data de update
    delete dbData.id;

    const updatedWallet = await walletService.updateWallet(
      userId,
      walletId,
      dbData
    );

    return { success: true, data: updatedWallet };
  } catch (error: any) {
    console.error("❌ Error en updateWalletAction:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteWalletAction(userId: string, walletId: string) {
  try {
    await walletService.deleteWallet(userId, walletId);
    return { success: true };
  } catch (error: any) {
    console.error("❌ Error en deleteWalletAction:", error);
    return { success: false, error: error.message };
  }
}
