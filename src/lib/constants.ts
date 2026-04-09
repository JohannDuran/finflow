import type { Category, Wallet, Transaction, Budget, User, Tag } from "@/types";

// ──────────────────────────────────────────────
// DEFAULT CATEGORIES
// ──────────────────────────────────────────────

export const defaultExpenseCategories: Category[] = [
  { id: "cat-alimentacion", name: "Alimentación", icon: "UtensilsCrossed", color: "#F97316", type: "expense", isDefault: true },
  { id: "cat-transporte", name: "Transporte", icon: "Car", color: "#3B82F6", type: "expense", isDefault: true },
  { id: "cat-vivienda", name: "Vivienda", icon: "Home", color: "#8B5CF6", type: "expense", isDefault: true },
  { id: "cat-entretenimiento", name: "Entretenimiento", icon: "Gamepad2", color: "#EC4899", type: "expense", isDefault: true },
  { id: "cat-salud", name: "Salud", icon: "Heart", color: "#EF4444", type: "expense", isDefault: true },
  { id: "cat-educacion", name: "Educación", icon: "GraduationCap", color: "#06B6D4", type: "expense", isDefault: true },
  { id: "cat-ropa", name: "Ropa", icon: "Shirt", color: "#F472B6", type: "expense", isDefault: true },
  { id: "cat-tecnologia", name: "Tecnología", icon: "Smartphone", color: "#6366F1", type: "expense", isDefault: true },
  { id: "cat-suscripciones", name: "Suscripciones", icon: "CreditCard", color: "#A855F7", type: "expense", isDefault: true },
  { id: "cat-restaurantes", name: "Restaurantes", icon: "Coffee", color: "#D97706", type: "expense", isDefault: true },
  { id: "cat-supermercado", name: "Supermercado", icon: "ShoppingCart", color: "#22C55E", type: "expense", isDefault: true },
  { id: "cat-servicios", name: "Servicios", icon: "Zap", color: "#EAB308", type: "expense", isDefault: true },
  { id: "cat-mascotas", name: "Mascotas", icon: "PawPrint", color: "#92400E", type: "expense", isDefault: true },
  { id: "cat-regalos", name: "Regalos", icon: "Gift", color: "#E11D48", type: "expense", isDefault: true },
  { id: "cat-otros-gastos", name: "Otros gastos", icon: "MoreHorizontal", color: "#64748B", type: "expense", isDefault: true },
];

export const defaultIncomeCategories: Category[] = [
  { id: "cat-salario", name: "Salario", icon: "Banknote", color: "#22C55E", type: "income", isDefault: true },
  { id: "cat-freelance", name: "Freelance", icon: "Laptop", color: "#10B981", type: "income", isDefault: true },
  { id: "cat-inversiones", name: "Inversiones", icon: "TrendingUp", color: "#06B6D4", type: "income", isDefault: true },
  { id: "cat-ventas", name: "Ventas", icon: "Store", color: "#F59E0B", type: "income", isDefault: true },
  { id: "cat-reembolso", name: "Reembolso", icon: "RotateCcw", color: "#8B5CF6", type: "income", isDefault: true },
  { id: "cat-otros-ingresos", name: "Otros ingresos", icon: "Plus", color: "#64748B", type: "income", isDefault: true },
];

export const defaultCategories: Category[] = [
  ...defaultExpenseCategories,
  ...defaultIncomeCategories,
];

// Transfer "category" for display purposes
export const transferCategory: Category = {
  id: "cat-transfer",
  name: "Transferencia",
  icon: "ArrowLeftRight",
  color: "#3B82F6",
  type: "expense",
  isDefault: true,
};

// ──────────────────────────────────────────────
// MOCK USER
// ──────────────────────────────────────────────

export const mockUser: User = {
  id: "u1",
  email: "johann@finflow.app",
  name: "Johann",
  avatarUrl: undefined,
  defaultCurrency: "MXN",
  preferredLocale: "es-MX",
  theme: "dark",
  createdAt: new Date("2025-01-15"),
};

// ──────────────────────────────────────────────
// MOCK TAGS
// ──────────────────────────────────────────────

export const mockTags: Tag[] = [
  { id: "tag-1", userId: "u1", name: "trabajo", color: "#3B82F6" },
  { id: "tag-2", userId: "u1", name: "personal", color: "#22C55E" },
  { id: "tag-3", userId: "u1", name: "urgente", color: "#EF4444" },
  { id: "tag-4", userId: "u1", name: "hormiga", color: "#F59E0B" },
  { id: "tag-5", userId: "u1", name: "fijo", color: "#8B5CF6" },
];

// ──────────────────────────────────────────────
// MOCK WALLETS
// ──────────────────────────────────────────────

export const mockWallets: Wallet[] = [
  {
    id: "w1",
    userId: "u1",
    name: "Efectivo",
    type: "cash",
    currency: "MXN",
    balance: 3_450.0,
    icon: "Banknote",
    color: "#22C55E",
    isArchived: false,
    sortOrder: 0,
    createdAt: new Date("2025-01-15"),
  },
  {
    id: "w2",
    userId: "u1",
    name: "BBVA Débito",
    type: "bank",
    currency: "MXN",
    balance: 28_730.5,
    icon: "Building2",
    color: "#3B82F6",
    isArchived: false,
    sortOrder: 1,
    createdAt: new Date("2025-01-15"),
  },
  {
    id: "w3",
    userId: "u1",
    name: "Nu Crédito",
    type: "credit",
    currency: "MXN",
    balance: -4_280.0,
    creditLimit: 15_000,
    icon: "CreditCard",
    color: "#A855F7",
    isArchived: false,
    sortOrder: 2,
    createdAt: new Date("2025-02-01"),
  },
];

// ──────────────────────────────────────────────
// MOCK TRANSACTIONS (30 transactions, last 30 days)
// ──────────────────────────────────────────────

export const mockTransactions: Transaction[] = [
  {
    id: "t1", walletId: "w2", userId: "u1", type: "income", amount: 18_000, currency: "MXN",
    categoryId: "cat-salario", description: "Nómina quincenal", date: "2026-04-01",
    isRecurring: true, recurringRule: { frequency: "monthly", interval: 1 },
    tags: ["trabajo", "fijo"], createdAt: new Date("2026-04-01"), updatedAt: new Date("2026-04-01"),
  },
  {
    id: "t2", walletId: "w2", userId: "u1", type: "income", amount: 18_000, currency: "MXN",
    categoryId: "cat-salario", description: "Nómina quincenal", date: "2026-03-15",
    isRecurring: true, recurringRule: { frequency: "monthly", interval: 1 },
    tags: ["trabajo", "fijo"], createdAt: new Date("2026-03-15"), updatedAt: new Date("2026-03-15"),
  },
  {
    id: "t3", walletId: "w2", userId: "u1", type: "income", amount: 8_500, currency: "MXN",
    categoryId: "cat-freelance", description: "Proyecto landing page cliente", date: "2026-03-20",
    isRecurring: false, tags: ["trabajo"], createdAt: new Date("2026-03-20"), updatedAt: new Date("2026-03-20"),
  },
  {
    id: "t4", walletId: "w1", userId: "u1", type: "income", amount: 2_000, currency: "MXN",
    categoryId: "cat-freelance", description: "Diseño logo pequeño", date: "2026-04-03",
    isRecurring: false, tags: ["trabajo"], createdAt: new Date("2026-04-03"), updatedAt: new Date("2026-04-03"),
  },
  {
    id: "t5", walletId: "w2", userId: "u1", type: "income", amount: 1_200, currency: "MXN",
    categoryId: "cat-reembolso", description: "Reembolso seguro médico", date: "2026-03-25",
    isRecurring: false, tags: [], createdAt: new Date("2026-03-25"), updatedAt: new Date("2026-03-25"),
  },
  {
    id: "t6", walletId: "w2", userId: "u1", type: "expense", amount: 1_850, currency: "MXN",
    categoryId: "cat-supermercado", description: "Despensa semanal Walmart", date: "2026-04-06",
    isRecurring: false, tags: ["personal"], createdAt: new Date("2026-04-06"), updatedAt: new Date("2026-04-06"),
  },
  {
    id: "t7", walletId: "w3", userId: "u1", type: "expense", amount: 189, currency: "MXN",
    categoryId: "cat-transporte", description: "Uber al centro", date: "2026-04-06",
    isRecurring: false, tags: ["personal"], createdAt: new Date("2026-04-06"), updatedAt: new Date("2026-04-06"),
  },
  {
    id: "t8", walletId: "w2", userId: "u1", type: "expense", amount: 299, currency: "MXN",
    categoryId: "cat-suscripciones", description: "Netflix mensual", date: "2026-04-01",
    isRecurring: true, recurringRule: { frequency: "monthly", interval: 1 },
    tags: ["fijo"], createdAt: new Date("2026-04-01"), updatedAt: new Date("2026-04-01"),
  },
  {
    id: "t9", walletId: "w2", userId: "u1", type: "expense", amount: 179, currency: "MXN",
    categoryId: "cat-suscripciones", description: "Spotify Premium", date: "2026-04-01",
    isRecurring: true, recurringRule: { frequency: "monthly", interval: 1 },
    tags: ["fijo"], createdAt: new Date("2026-04-01"), updatedAt: new Date("2026-04-01"),
  },
  {
    id: "t10", walletId: "w3", userId: "u1", type: "expense", amount: 450, currency: "MXN",
    categoryId: "cat-restaurantes", description: "Cena con amigos - Tacos Don Juan", date: "2026-04-05",
    isRecurring: false, tags: ["personal"], createdAt: new Date("2026-04-05"), updatedAt: new Date("2026-04-05"),
  },
  {
    id: "t11", walletId: "w1", userId: "u1", type: "expense", amount: 85, currency: "MXN",
    categoryId: "cat-restaurantes", description: "Café y pan en Oxxo", date: "2026-04-07",
    isRecurring: false, tags: ["hormiga"], createdAt: new Date("2026-04-07"), updatedAt: new Date("2026-04-07"),
  },
  {
    id: "t12", walletId: "w3", userId: "u1", type: "expense", amount: 750, currency: "MXN",
    categoryId: "cat-entretenimiento", description: "Boletos cine + palomitas", date: "2026-04-03",
    isRecurring: false, tags: ["personal"], createdAt: new Date("2026-04-03"), updatedAt: new Date("2026-04-03"),
  },
  {
    id: "t13", walletId: "w2", userId: "u1", type: "expense", amount: 1_200, currency: "MXN",
    categoryId: "cat-salud", description: "Consulta dentista", date: "2026-03-28",
    isRecurring: false, tags: ["personal"], createdAt: new Date("2026-03-28"), updatedAt: new Date("2026-03-28"),
  },
  {
    id: "t14", walletId: "w2", userId: "u1", type: "expense", amount: 600, currency: "MXN",
    categoryId: "cat-transporte", description: "Gasolina", date: "2026-03-30",
    isRecurring: false, tags: ["personal"], createdAt: new Date("2026-03-30"), updatedAt: new Date("2026-03-30"),
  },
  {
    id: "t15", walletId: "w2", userId: "u1", type: "expense", amount: 3_500, currency: "MXN",
    categoryId: "cat-servicios", description: "Renta internet Telmex + luz CFE", date: "2026-04-02",
    isRecurring: true, recurringRule: { frequency: "monthly", interval: 1 },
    tags: ["fijo"], createdAt: new Date("2026-04-02"), updatedAt: new Date("2026-04-02"),
  },
  {
    id: "t16", walletId: "w1", userId: "u1", type: "expense", amount: 220, currency: "MXN",
    categoryId: "cat-alimentacion", description: "Verduras en mercado", date: "2026-04-04",
    isRecurring: false, tags: ["personal"], createdAt: new Date("2026-04-04"), updatedAt: new Date("2026-04-04"),
  },
  {
    id: "t17", walletId: "w3", userId: "u1", type: "expense", amount: 1_399, currency: "MXN",
    categoryId: "cat-tecnologia", description: "Audífonos Amazon", date: "2026-03-25",
    isRecurring: false, tags: ["personal"], createdAt: new Date("2026-03-25"), updatedAt: new Date("2026-03-25"),
  },
  {
    id: "t18", walletId: "w3", userId: "u1", type: "expense", amount: 350, currency: "MXN",
    categoryId: "cat-ropa", description: "Playera Zara", date: "2026-03-22",
    isRecurring: false, tags: ["personal"], createdAt: new Date("2026-03-22"), updatedAt: new Date("2026-03-22"),
  },
  {
    id: "t19", walletId: "w2", userId: "u1", type: "expense", amount: 950, currency: "MXN",
    categoryId: "cat-supermercado", description: "Despensa Costco", date: "2026-03-29",
    isRecurring: false, tags: ["personal"], createdAt: new Date("2026-03-29"), updatedAt: new Date("2026-03-29"),
  },
  {
    id: "t20", walletId: "w1", userId: "u1", type: "expense", amount: 150, currency: "MXN",
    categoryId: "cat-transporte", description: "Uber Eats comida", date: "2026-04-02",
    isRecurring: false, tags: ["hormiga"], createdAt: new Date("2026-04-02"), updatedAt: new Date("2026-04-02"),
  },
  {
    id: "t21", walletId: "w2", userId: "u1", type: "expense", amount: 2_800, currency: "MXN",
    categoryId: "cat-educacion", description: "Curso Udemy - React Avanzado", date: "2026-03-18",
    isRecurring: false, tags: ["trabajo"], createdAt: new Date("2026-03-18"), updatedAt: new Date("2026-03-18"),
  },
  {
    id: "t22", walletId: "w1", userId: "u1", type: "expense", amount: 320, currency: "MXN",
    categoryId: "cat-mascotas", description: "Croquetas para Luna", date: "2026-04-01",
    isRecurring: false, tags: ["personal"], createdAt: new Date("2026-04-01"), updatedAt: new Date("2026-04-01"),
  },
  {
    id: "t23", walletId: "w3", userId: "u1", type: "expense", amount: 680, currency: "MXN",
    categoryId: "cat-entretenimiento", description: "Videojuego Steam", date: "2026-03-27",
    isRecurring: false, tags: ["personal"], createdAt: new Date("2026-03-27"), updatedAt: new Date("2026-03-27"),
  },
  {
    id: "t24", walletId: "w2", userId: "u1", type: "expense", amount: 1_650, currency: "MXN",
    categoryId: "cat-alimentacion", description: "Despensa Soriana", date: "2026-03-22",
    isRecurring: false, tags: ["personal"], createdAt: new Date("2026-03-22"), updatedAt: new Date("2026-03-22"),
  },
  {
    id: "t25", walletId: "w1", userId: "u1", type: "expense", amount: 75, currency: "MXN",
    categoryId: "cat-restaurantes", description: "Tacos de la esquina", date: "2026-04-08",
    isRecurring: false, tags: ["hormiga"], createdAt: new Date("2026-04-08"), updatedAt: new Date("2026-04-08"),
  },
  {
    id: "t26", walletId: "w2", userId: "u1", type: "expense", amount: 450, currency: "MXN",
    categoryId: "cat-regalos", description: "Regalo cumpleaños mamá", date: "2026-03-30",
    isRecurring: false, tags: ["personal"], createdAt: new Date("2026-03-30"), updatedAt: new Date("2026-03-30"),
  },
  {
    id: "t27", walletId: "w3", userId: "u1", type: "expense", amount: 199, currency: "MXN",
    categoryId: "cat-suscripciones", description: "ChatGPT Plus", date: "2026-04-01",
    isRecurring: true, recurringRule: { frequency: "monthly", interval: 1 },
    tags: ["trabajo", "fijo"], createdAt: new Date("2026-04-01"), updatedAt: new Date("2026-04-01"),
  },
  {
    id: "t28", walletId: "w2", userId: "u1", type: "expense", amount: 380, currency: "MXN",
    categoryId: "cat-transporte", description: "Gasolina semana", date: "2026-04-05",
    isRecurring: false, tags: [], createdAt: new Date("2026-04-05"), updatedAt: new Date("2026-04-05"),
  },
  {
    id: "t29", walletId: "w2", userId: "u1", type: "transfer", amount: 5_000, currency: "MXN",
    categoryId: "cat-transfer", description: "Retiro cajero", date: "2026-03-28",
    isRecurring: false, tags: [], transferToWalletId: "w1",
    createdAt: new Date("2026-03-28"), updatedAt: new Date("2026-03-28"),
  },
  {
    id: "t30", walletId: "w2", userId: "u1", type: "expense", amount: 1_250, currency: "MXN",
    categoryId: "cat-alimentacion", description: "Mercado semanal frutas y carne", date: "2026-04-08",
    isRecurring: false, tags: ["personal"], createdAt: new Date("2026-04-08"), updatedAt: new Date("2026-04-08"),
  },
];

// ──────────────────────────────────────────────
// MOCK BUDGETS
// ──────────────────────────────────────────────

export const mockBudgets: Budget[] = [
  {
    id: "b1", userId: "u1", name: "Alimentación", amount: 5_000, spent: 3_720,
    period: "monthly", categoryId: "cat-alimentacion", startDate: "2026-04-01",
    rollover: false, isActive: true, createdAt: new Date(),
  },
  {
    id: "b2", userId: "u1", name: "Transporte", amount: 2_000, spent: 789,
    period: "monthly", categoryId: "cat-transporte", startDate: "2026-04-01",
    rollover: false, isActive: true, createdAt: new Date(),
  },
  {
    id: "b3", userId: "u1", name: "Entretenimiento", amount: 1_500, spent: 1_420,
    period: "monthly", categoryId: "cat-entretenimiento", startDate: "2026-04-01",
    rollover: false, isActive: true, createdAt: new Date(),
  },
  {
    id: "b4", userId: "u1", name: "Suscripciones", amount: 800, spent: 478,
    period: "monthly", categoryId: "cat-suscripciones", startDate: "2026-04-01",
    rollover: true, isActive: true, createdAt: new Date(),
  },
];

// ──────────────────────────────────────────────
// WALLET TYPE LABELS
// ──────────────────────────────────────────────

export const walletTypeLabels: Record<string, string> = {
  cash: "Efectivo",
  bank: "Banco",
  credit: "Crédito",
  ewallet: "E-wallet",
  crypto: "Crypto",
};

export const walletTypeIcons: Record<string, string> = {
  cash: "Banknote",
  bank: "Building2",
  credit: "CreditCard",
  ewallet: "Smartphone",
  crypto: "Bitcoin",
};

// ──────────────────────────────────────────────
// CURRENCIES
// ──────────────────────────────────────────────

export const currencies = [
  { code: "MXN" as const, name: "Peso Mexicano", flag: "🇲🇽" },
  { code: "USD" as const, name: "Dólar Americano", flag: "🇺🇸" },
  { code: "EUR" as const, name: "Euro", flag: "🇪🇺" },
  { code: "COP" as const, name: "Peso Colombiano", flag: "🇨🇴" },
  { code: "ARS" as const, name: "Peso Argentino", flag: "🇦🇷" },
  { code: "BRL" as const, name: "Real Brasileño", flag: "🇧🇷" },
  { code: "PEN" as const, name: "Sol Peruano", flag: "🇵🇪" },
  { code: "CLP" as const, name: "Peso Chileno", flag: "🇨🇱" },
];

// ──────────────────────────────────────────────
// BUDGET PERIOD LABELS
// ──────────────────────────────────────────────

export const budgetPeriodLabels: Record<string, string> = {
  weekly: "Semanal",
  biweekly: "Quincenal",
  monthly: "Mensual",
  yearly: "Anual",
};

// ──────────────────────────────────────────────
// MOCK GOALS
// ──────────────────────────────────────────────

import type { Goal, Subscription } from "@/types";

export const mockGoals: Goal[] = [
  {
    id: "g1", userId: "u1", name: "Fondo de emergencia", type: "emergency",
    targetAmount: 50_000, currentAmount: 18_500, deadline: "2026-12-31",
    icon: "Shield", color: "#3B82F6", isCompleted: false, createdAt: new Date("2026-01-15"),
  },
  {
    id: "g2", userId: "u1", name: "Viaje a Japón", type: "savings",
    targetAmount: 80_000, currentAmount: 32_000, deadline: "2027-04-01",
    icon: "Plane", color: "#EC4899", isCompleted: false, createdAt: new Date("2026-02-01"),
  },
  {
    id: "g3", userId: "u1", name: "MacBook Pro M4", type: "savings",
    targetAmount: 45_000, currentAmount: 28_000, deadline: "2026-08-15",
    icon: "Laptop", color: "#8B5CF6", isCompleted: false, createdAt: new Date("2026-01-20"),
  },
  {
    id: "g4", userId: "u1", name: "Pagar tarjeta Nu", type: "debt_payoff",
    targetAmount: 4_280, currentAmount: 1_200, deadline: "2026-06-30",
    icon: "CreditCard", color: "#F43F5E", isCompleted: false, createdAt: new Date("2026-03-01"),
  },
  {
    id: "g5", userId: "u1", name: "Curso diseño UX", type: "custom",
    targetAmount: 12_000, currentAmount: 12_000,
    icon: "GraduationCap", color: "#06B6D4", isCompleted: true, createdAt: new Date("2025-11-01"),
  },
];

// ──────────────────────────────────────────────
// MOCK SUBSCRIPTIONS
// ──────────────────────────────────────────────

export const mockSubscriptions: Subscription[] = [
  {
    id: "s1", userId: "u1", name: "Netflix", amount: 299, currency: "MXN",
    billingCycle: "monthly", categoryId: "cat-suscripciones", nextBillDate: "2026-05-01",
    icon: "Play", color: "#E50914", isActive: true, createdAt: new Date("2024-06-01"),
  },
  {
    id: "s2", userId: "u1", name: "Spotify Premium", amount: 179, currency: "MXN",
    billingCycle: "monthly", categoryId: "cat-suscripciones", nextBillDate: "2026-05-01",
    icon: "Music", color: "#1DB954", isActive: true, createdAt: new Date("2023-09-15"),
  },
  {
    id: "s3", userId: "u1", name: "ChatGPT Plus", amount: 199, currency: "MXN",
    billingCycle: "monthly", categoryId: "cat-suscripciones", nextBillDate: "2026-05-01",
    icon: "Bot", color: "#10A37F", isActive: true, createdAt: new Date("2025-01-10"),
  },
  {
    id: "s4", userId: "u1", name: "GitHub Copilot", amount: 200, currency: "MXN",
    billingCycle: "monthly", categoryId: "cat-suscripciones", nextBillDate: "2026-05-05",
    icon: "Code", color: "#6E40C9", isActive: true, createdAt: new Date("2025-03-01"),
  },
  {
    id: "s5", userId: "u1", name: "iCloud 200GB", amount: 49, currency: "MXN",
    billingCycle: "monthly", categoryId: "cat-suscripciones", nextBillDate: "2026-05-12",
    icon: "Cloud", color: "#007AFF", isActive: true, createdAt: new Date("2024-01-01"),
  },
  {
    id: "s6", userId: "u1", name: "Amazon Prime", amount: 99, currency: "MXN",
    billingCycle: "monthly", categoryId: "cat-suscripciones", nextBillDate: "2026-05-08",
    icon: "Package", color: "#FF9900", isActive: true, createdAt: new Date("2024-11-01"),
  },
  {
    id: "s7", userId: "u1", name: "Gym Smart Fit", amount: 599, currency: "MXN",
    billingCycle: "monthly", categoryId: "cat-salud", nextBillDate: "2026-05-01",
    icon: "Dumbbell", color: "#FF6B35", isActive: true, createdAt: new Date("2025-08-01"),
  },
  {
    id: "s8", userId: "u1", name: "Dominio finflow.app", amount: 250, currency: "MXN",
    billingCycle: "yearly", categoryId: "cat-tecnologia", nextBillDate: "2027-01-15",
    icon: "Globe", color: "#059669", isActive: true, createdAt: new Date("2026-01-15"),
  },
];

