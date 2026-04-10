import { prisma } from '../prisma';

export const transactionService = {
  async getTransactions(userId: string, options?: { limit?: number; skip?: number; walletId?: string }) {
    const whereClause: any = { userId };
    if (options?.walletId) whereClause.walletId = options.walletId;

    return prisma.transaction.findMany({
      where: whereClause,
      include: {
        category: true,
        wallet: true,
        tags: true,
      },
      orderBy: { date: 'desc' },
      take: options?.limit,
      skip: options?.skip,
    });
  },

  async createTransaction(userId: string, data: any) {
    return prisma.$transaction(async (tx) => {
      // 1. Create the transaction
      // Usamos (tx as any) temporalmente para evitar un bug de tipado en Prisma 
      // donde omite 'transaction' dentro del bloque interactivo de tx.
      const transaction = await (tx as any).transaction.create({
        data: {
          ...data,
          userId,
        },
      });

      // 2. Adjust wallet balance
      // Logic for adjustment would depend on income/expense/transfer
      // ... placeholder logic omitted for architecture ...

      return transaction;
    });
  },

  async updateTransaction(userId: string, transactionId: string, data: any) {
    return prisma.$transaction(async (tx) => {
      const transaction = await (tx as any).transaction.update({
        where: { id: transactionId, userId },
        data,
      });

      // Placeholder for wallet logic adjustment when auth is fully tied
      return transaction;
    });
  },

  async deleteTransaction(userId: string, transactionId: string) {
    return prisma.transaction.delete({
      where: { id: transactionId, userId },
    });
  }
};
