import { prisma } from '../prisma';

export const goalService = {
  async getGoals(userId: string) {
    return prisma.goal.findMany({
      where: { userId },
      orderBy: { deadline: 'asc' },
    });
  },

  async createGoal(userId: string, data: any) {
    return prisma.goal.create({
      data: {
        ...data,
        userId,
      },
    });
  },

  async updateGoal(userId: string, goalId: string, data: any) {
    return prisma.goal.update({
      where: { id: goalId, userId },
      data,
    });
  },

  async deleteGoal(userId: string, goalId: string) {
    return prisma.goal.delete({
      where: { id: goalId, userId },
    });
  }
};
