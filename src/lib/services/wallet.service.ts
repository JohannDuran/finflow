import { prisma } from '../prisma';

export const walletService = {
  async getWallets(userId: string) {
    return prisma.wallet.findMany({
      where: { userId },
      orderBy: { sortOrder: 'asc' },
    });
  },

  async getWalletById(userId: string, walletId: string) {
    return prisma.wallet.findUnique({
      where: { id: walletId, userId },
    });
  },

  async createWallet(userId: string, data: any) {
    return prisma.wallet.create({
      data: {
        ...data,
        userId,
      },
    });
  },

  async updateWallet(userId: string, walletId: string, data: any) {
    return prisma.wallet.update({
      where: { id: walletId, userId },
      data,
    });
  },

  async deleteWallet(userId: string, walletId: string) {
    return prisma.wallet.delete({
      where: { id: walletId, userId },
    });
  }
};
