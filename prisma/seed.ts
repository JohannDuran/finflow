import { PrismaClient } from '@prisma/client'
import { 
  mockUser, 
  mockWallets, 
  defaultCategories, 
  transferCategory,
  mockTags,
  mockTransactions,
  mockBudgets,
  mockGoals,
  mockSubscriptions
} from '../src/lib/constants'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed process...')

  // 1. Seed Mock User (Upsert)
  await prisma.user.upsert({
    where: { id: mockUser.id },
    create: {
      id: mockUser.id,
      email: mockUser.email,
      name: mockUser.name,
      defaultCurrency: mockUser.defaultCurrency,
      preferredLocale: mockUser.preferredLocale,
      theme: mockUser.theme,
    },
    update: {}, // Do nothing if it exists
  })
  console.log(`✅ Seeded Mock User: ${mockUser.name} (${mockUser.id})`)

  // 2. Seed Mock Wallets (Solo 2 de ejemplo inicial)
  const initialWallets = mockWallets.slice(0, 2)
  for (const wallet of initialWallets) {
    await prisma.wallet.upsert({
      where: { id: wallet.id },
      create: {
        id: wallet.id,
        userId: wallet.userId,
        name: wallet.name,
        type: wallet.type,
        currency: wallet.currency,
        balance: wallet.balance,
        creditLimit: wallet.creditLimit,
        icon: wallet.icon,
        color: wallet.color,
        isArchived: wallet.isArchived,
        sortOrder: wallet.sortOrder,
      },
      update: {},
    })
  }
  console.log(`✅ Seeded ${mockWallets.length} Mock Wallets.`)

  // 3. Seed Default Categories (With strict IDs)
  const allCategories = [...defaultCategories, transferCategory]
  for (const cat of allCategories) {
    await prisma.category.upsert({
      where: { id: cat.id },
      create: {
        id: cat.id,
        name: cat.name,
        icon: cat.icon,
        color: cat.color,
        type: cat.type,
        isDefault: cat.isDefault,
      },
      update: { // Updatable fields if they changed in constants
        name: cat.name,
        icon: cat.icon,
        color: cat.color,
      },
    })
  }
  console.log(`✅ Seeded ${allCategories.length} Categories.`)

  // 4. Seed Tags (característica inicial)
  for (const tag of mockTags) {
    await prisma.tag.upsert({
      where: { id: tag.id },
      create: {
        id: tag.id,
        userId: mockUser.id,
        name: tag.name,
        color: tag.color,
      },
      update: {},
    })
  }
  console.log(`✅ Seeded ${mockTags.length} Tags.`)

  // 5. Seed Transactions (Solo 2 de ejemplo)
  const initialTransactions = mockTransactions.slice(0, 2)
  for (const tx of initialTransactions) {
    const connectedTags = tx.tags?.map(tagName => {
      const tag = mockTags.find(t => t.name === tagName)
      return tag ? { id: tag.id } : null
    }).filter(Boolean) as { id: string }[] || []

    await prisma.transaction.upsert({
      where: { id: tx.id },
      create: {
        id: tx.id,
        walletId: tx.walletId,
        userId: tx.userId,
        type: tx.type,
        amount: tx.amount,
        currency: tx.currency,
        categoryId: tx.categoryId,
        description: tx.description,
        note: tx.note || null,
        date: new Date(tx.date),
        isRecurring: tx.isRecurring,
        recurringFrequency: tx.recurringRule?.frequency || null,
        recurringInterval: tx.recurringRule?.interval || null,
        transferToWalletId: tx.transferToWalletId || null,
        tags: {
          connect: connectedTags,
        }
      },
      update: {},
    })
  }
  console.log(`✅ Seeded 2 Transactions (Ejemplos iniciales).`)

  console.log('🎉 Seed finished successfully. Base de datos lista en blanco pero funcional!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
