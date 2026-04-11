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
    const { tagIds, ...rest } = data;
    return prisma.transaction.create({
      data: {
        ...rest,
        userId,
        ...(tagIds?.length ? { tags: { connect: tagIds.map((id: string) => ({ id })) } } : {}),
      },
    });
  },

  async updateTransaction(userId: string, transactionId: string, data: any) {
    const { tagIds, ...rest } = data;
    return prisma.transaction.update({
      where: { id: transactionId, userId },
      data: {
        ...rest,
        ...(tagIds !== undefined ? { tags: { set: tagIds.map((id: string) => ({ id })) } } : {}),
      },
    });
  },

  async deleteTransaction(userId: string, transactionId: string) {
    return prisma.transaction.delete({
      where: { id: transactionId, userId },
    });
  }
};
