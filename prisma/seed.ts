import { PrismaClient } from '@prisma/client'
import { 
  defaultCategories, 
  transferCategory,
  currencies
} from '../src/lib/constants'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed process...')

  // 1. Seed Currencies
  for (const currency of currencies) {
    await prisma.currency.upsert({
      where: { code: currency.code },
      create: {
        code: currency.code,
        name: currency.name,
        flag: currency.flag,
      },
      update: {
        name: currency.name,
        flag: currency.flag,
      },
    })
  }
  console.log(`✅ Seeded ${currencies.length} Currencies.`)

  // 2. Seed Default Categories
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
      update: {
        name: cat.name,
        icon: cat.icon,
        color: cat.color,
      },
    })
  }
  console.log(`✅ Seeded ${allCategories.length} Categories.`)

  console.log('🎉 Global Database Seed finished successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
