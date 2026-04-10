"use server";

import { transactionService } from "@/lib/services/transaction.service";
import { revalidatePath } from "next/cache";

/**
 * Mapea los datos del Frontend al esquema de Prisma
 */
function mapFrontendToDb(data: any) {
  return {
    id: data.id,
    type: data.type,
    amount: data.amount,
    currency: data.currency,
    walletId: data.walletId,
    categoryId: data.categoryId,
    description: data.description,
    note: data.note,
    date: new Date(data.date),
    isRecurring: data.isRecurring || false,
    recurringFrequency: data.recurringRule?.frequency || null,
    recurringInterval: data.recurringRule?.interval || null,
    transferToWalletId: data.transferToWalletId || null,
  };
}

export async function createTransactionAction(data: any) {
  try {
    // 1. Usar el usuario por defecto de desarrollo (Johann)
    const userId = "u1"; 

    // 2. Mapear datos
    const dbData = mapFrontendToDb(data);

    // 3. Persistir en Supabase
    const tx = await transactionService.createTransaction(userId, dbData);

    // 4. Limpiar caché de Next.js para que las demás páginas vean los datos frescos
    revalidatePath("/");

    return { success: true, data: tx };
  } catch (error: any) {
    console.error("Error creating transaction in Supabase:", error);
    return { success: false, error: error.message };
  }
}

export async function updateTransactionAction(transactionId: string, data: any) {
  try {
    const userId = "u1";
    const dbData = mapFrontendToDb(data);

    const tx = await transactionService.updateTransaction(userId, transactionId, dbData);
    revalidatePath("/");

    return { success: true, data: tx };
  } catch (error: any) {
    console.error("Error updating transaction in Supabase:", error);
    return { success: false, error: error.message };
  }
}
