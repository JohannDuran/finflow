import { prisma } from '../prisma';

export const subscriptionService = {
  async getSubscriptions(userId: string) {
    return prisma.subscription.findMany({
      where: { userId },
      include: { category: true },
      orderBy: { nextBillDate: 'asc' },
    });
  },

  async createSubscription(userId: string, data: any) {
    return prisma.subscription.create({
      data: {
        ...data,
        userId,
      },
    });
  },

  async updateSubscription(userId: string, subscriptionId: string, data: any) {
    return prisma.subscription.update({
      where: { id: subscriptionId, userId },
      data,
    });
  },

  async deleteSubscription(userId: string, subscriptionId: string) {
    return prisma.subscription.delete({
      where: { id: subscriptionId, userId },
    });
  }
};
