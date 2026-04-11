// ──────────────────────────────────────────────
// SUBSCRIPTION PLATFORM ICONS
// ──────────────────────────────────────────────
// Cada plataforma tiene un `id` que corresponde al
// archivo PNG en /public/logos/subscriptions/{id}.png
// descargado por el script download-logos.sh.
// Si el logo no existe, el componente cae al icono Lucide.

export interface SubscriptionIconOption {
  id: string;
  label: string;
  /** Icono Lucide (fallback si no hay logo PNG) */
  icon: string;
  defaultColor: string;
  group: SubscriptionIconGroup;
}

export type SubscriptionIconGroup =
  | "streaming"
  | "music"
  | "gaming"
  | "productivity"
  | "cloud"
  | "communication"
  | "education"
  | "fitness"
  | "news"
  | "finance"
  | "food"
  | "shopping"
  | "transport"
  | "other";

export const subscriptionIconGroups: Record<SubscriptionIconGroup, string> = {
  streaming: "Streaming & Video",
  music: "Música & Audio",
  gaming: "Gaming",
  productivity: "Productividad",
  cloud: "Cloud & Almacenamiento",
  communication: "Comunicación",
  education: "Educación",
  fitness: "Fitness & Salud",
  news: "Noticias & Lectura",
  finance: "Finanzas",
  food: "Comida & Delivery",
  shopping: "Compras & Membresías",
  transport: "Transporte",
  other: "Otros",
};

/**
 * Retorna la ruta al logo estático de una plataforma.
 * Los PNGs viven en /public/logos/subscriptions/{id}.png
 */
export function getSubscriptionLogoPath(id: string): string {
  return `/logos/subscriptions/${id}.png`;
}

export const subscriptionIcons: SubscriptionIconOption[] = [
  // ── Streaming & Video ──────────────────────
  { id: "netflix",          label: "Netflix",           icon: "Tv",            defaultColor: "#E50914", group: "streaming" },
  { id: "disney-plus",      label: "Disney+",           icon: "Clapperboard",  defaultColor: "#113CCF", group: "streaming" },
  { id: "hbo-max",          label: "Max (HBO)",         icon: "Film",          defaultColor: "#B535F6", group: "streaming" },
  { id: "prime-video",      label: "Prime Video",       icon: "Play",          defaultColor: "#00A8E1", group: "streaming" },
  { id: "apple-tv",         label: "Apple TV+",         icon: "MonitorPlay",   defaultColor: "#555555", group: "streaming" },
  { id: "crunchyroll",      label: "Crunchyroll",       icon: "Drama",         defaultColor: "#F47521", group: "streaming" },
  { id: "paramount",        label: "Paramount+",        icon: "Mountain",      defaultColor: "#0064FF", group: "streaming" },
  { id: "youtube-premium",  label: "YouTube Premium",   icon: "Youtube",       defaultColor: "#FF0000", group: "streaming" },
  { id: "twitch",           label: "Twitch",            icon: "Twitch",        defaultColor: "#9146FF", group: "streaming" },
  { id: "vix",              label: "ViX Premium",       icon: "Tv2",           defaultColor: "#E91E63", group: "streaming" },
  { id: "star-plus",        label: "Star+",             icon: "Star",          defaultColor: "#FF0051", group: "streaming" },
  { id: "mubi",             label: "MUBI",              icon: "Projector",     defaultColor: "#001EB4", group: "streaming" },
  { id: "plex",             label: "Plex Pass",         icon: "MonitorPlay",   defaultColor: "#E5A00D", group: "streaming" },
  { id: "curiosity-stream", label: "CuriosityStream",   icon: "Telescope",     defaultColor: "#1A5276", group: "streaming" },

  // ── Música & Audio ─────────────────────────
  { id: "spotify",          label: "Spotify",           icon: "Music",         defaultColor: "#1DB954", group: "music" },
  { id: "apple-music",      label: "Apple Music",       icon: "Music2",        defaultColor: "#FC3C44", group: "music" },
  { id: "youtube-music",    label: "YouTube Music",     icon: "Disc3",         defaultColor: "#FF0000", group: "music" },
  { id: "tidal",            label: "Tidal",             icon: "Waves",         defaultColor: "#000000", group: "music" },
  { id: "deezer",           label: "Deezer",            icon: "Headphones",    defaultColor: "#A238FF", group: "music" },
  { id: "amazon-music",     label: "Amazon Music",      icon: "Music4",        defaultColor: "#25D1DA", group: "music" },
  { id: "audible",          label: "Audible",           icon: "AudioLines",    defaultColor: "#F8991D", group: "music" },
  { id: "soundcloud-go",    label: "SoundCloud Go",     icon: "Podcast",       defaultColor: "#FF5500", group: "music" },

  // ── Gaming ─────────────────────────────────
  { id: "xbox-gamepass",    label: "Xbox Game Pass",    icon: "Gamepad2",      defaultColor: "#107C10", group: "gaming" },
  { id: "ps-plus",          label: "PlayStation Plus",   icon: "Joystick",      defaultColor: "#003087", group: "gaming" },
  { id: "nintendo-online",  label: "Nintendo Online",    icon: "Gamepad",       defaultColor: "#E60012", group: "gaming" },
  { id: "ea-play",          label: "EA Play",           icon: "Swords",        defaultColor: "#1A1A2E", group: "gaming" },
  { id: "steam",            label: "Steam",             icon: "Flame",         defaultColor: "#1B2838", group: "gaming" },
  { id: "geforce-now",      label: "GeForce NOW",       icon: "Monitor",       defaultColor: "#76B900", group: "gaming" },
  { id: "epic-games",       label: "Epic Games",        icon: "Gamepad2",      defaultColor: "#313131", group: "gaming" },

  // ── Productividad ──────────────────────────
  { id: "microsoft-365",    label: "Microsoft 365",     icon: "LayoutGrid",    defaultColor: "#D83B01", group: "productivity" },
  { id: "google-one",       label: "Google One",        icon: "Cloud",         defaultColor: "#4285F4", group: "productivity" },
  { id: "notion",           label: "Notion",            icon: "StickyNote",    defaultColor: "#000000", group: "productivity" },
  { id: "canva-pro",        label: "Canva Pro",         icon: "Palette",       defaultColor: "#00C4CC", group: "productivity" },
  { id: "figma",            label: "Figma",             icon: "Figma",         defaultColor: "#F24E1E", group: "productivity" },
  { id: "adobe-cc",         label: "Adobe CC",          icon: "PenTool",       defaultColor: "#FF0000", group: "productivity" },
  { id: "github",           label: "GitHub",            icon: "Github",        defaultColor: "#333333", group: "productivity" },
  { id: "chatgpt-plus",     label: "ChatGPT Plus",      icon: "Bot",           defaultColor: "#10A37F", group: "productivity" },
  { id: "claude-pro",       label: "Claude Pro",        icon: "Sparkles",      defaultColor: "#D97706", group: "productivity" },
  { id: "grammarly",        label: "Grammarly",         icon: "SpellCheck",    defaultColor: "#15C39A", group: "productivity" },
  { id: "1password",        label: "1Password",         icon: "KeyRound",      defaultColor: "#0572EC", group: "productivity" },
  { id: "lastpass",         label: "LastPass",          icon: "Lock",          defaultColor: "#D32D27", group: "productivity" },
  { id: "todoist",          label: "Todoist",           icon: "CheckSquare",   defaultColor: "#E44332", group: "productivity" },
  { id: "linear",           label: "Linear",            icon: "Layers",        defaultColor: "#5E6AD2", group: "productivity" },
  { id: "vercel",           label: "Vercel",            icon: "Triangle",      defaultColor: "#000000", group: "productivity" },
  { id: "railway",          label: "Railway",           icon: "TrainFront",    defaultColor: "#0B0D0E", group: "productivity" },
  { id: "netlify",          label: "Netlify",           icon: "Globe",         defaultColor: "#00C7B7", group: "productivity" },
  { id: "supabase",         label: "Supabase",          icon: "Database",      defaultColor: "#3ECF8E", group: "productivity" },
  { id: "planetscale",      label: "PlanetScale",       icon: "Database",      defaultColor: "#000000", group: "productivity" },
  { id: "miro",             label: "Miro",              icon: "PenTool",       defaultColor: "#FFD02F", group: "productivity" },
  { id: "trello",           label: "Trello",            icon: "LayoutGrid",    defaultColor: "#0052CC", group: "productivity" },
  { id: "asana",            label: "Asana",             icon: "CheckSquare",   defaultColor: "#F06A6A", group: "productivity" },

  // ── Cloud & Almacenamiento ─────────────────
  { id: "icloud",           label: "iCloud+",           icon: "CloudCog",      defaultColor: "#3693F3", group: "cloud" },
  { id: "dropbox",          label: "Dropbox",           icon: "Inbox",         defaultColor: "#0061FF", group: "cloud" },
  { id: "onedrive",         label: "OneDrive",          icon: "HardDrive",     defaultColor: "#0078D4", group: "cloud" },
  { id: "mega",             label: "MEGA",              icon: "Database",      defaultColor: "#CC0000", group: "cloud" },
  { id: "google-drive",     label: "Google Drive",      icon: "HardDrive",     defaultColor: "#4285F4", group: "cloud" },

  // ── Comunicación ───────────────────────────
  { id: "zoom",             label: "Zoom",              icon: "Video",         defaultColor: "#2D8CFF", group: "communication" },
  { id: "slack",            label: "Slack",             icon: "Hash",          defaultColor: "#4A154B", group: "communication" },
  { id: "discord-nitro",    label: "Discord Nitro",     icon: "MessageCircle", defaultColor: "#5865F2", group: "communication" },
  { id: "whatsapp-biz",     label: "WhatsApp Business", icon: "MessageSquare", defaultColor: "#25D366", group: "communication" },
  { id: "telegram-premium", label: "Telegram Premium",  icon: "Send",          defaultColor: "#0088CC", group: "communication" },
  { id: "teams",            label: "Microsoft Teams",   icon: "Users",         defaultColor: "#6264A7", group: "communication" },

  // ── Educación ──────────────────────────────
  { id: "coursera",         label: "Coursera Plus",     icon: "GraduationCap", defaultColor: "#0056D2", group: "education" },
  { id: "platzi",           label: "Platzi",            icon: "BookOpen",      defaultColor: "#98CA3F", group: "education" },
  { id: "udemy",            label: "Udemy",             icon: "BookMarked",    defaultColor: "#A435F0", group: "education" },
  { id: "domestika",        label: "Domestika",         icon: "PencilRuler",   defaultColor: "#FF6B00", group: "education" },
  { id: "skillshare",       label: "Skillshare",        icon: "Lightbulb",     defaultColor: "#00FF84", group: "education" },
  { id: "duolingo",         label: "Duolingo Plus",     icon: "Languages",     defaultColor: "#58CC02", group: "education" },
  { id: "masterclass",      label: "MasterClass",       icon: "Award",         defaultColor: "#1A1A1A", group: "education" },
  { id: "linkedin-learning",label: "LinkedIn Learning",  icon: "GraduationCap", defaultColor: "#0A66C2", group: "education" },
  { id: "codecademy",       label: "Codecademy",        icon: "Code",          defaultColor: "#1F4056", group: "education" },
  { id: "edx",              label: "edX",               icon: "BookOpen",      defaultColor: "#02262B", group: "education" },

  // ── Fitness & Salud ────────────────────────
  { id: "apple-fitness",    label: "Apple Fitness+",    icon: "Dumbbell",      defaultColor: "#FA2D55", group: "fitness" },
  { id: "peloton",          label: "Peloton",           icon: "Bike",          defaultColor: "#D4232A", group: "fitness" },
  { id: "strava",           label: "Strava",            icon: "Activity",      defaultColor: "#FC4C02", group: "fitness" },
  { id: "headspace",        label: "Headspace",         icon: "Brain",         defaultColor: "#F47D31", group: "fitness" },
  { id: "calm",             label: "Calm",              icon: "Moon",          defaultColor: "#4B8BF5", group: "fitness" },
  { id: "fitbit",           label: "Fitbit Premium",    icon: "Heart",         defaultColor: "#00B0B9", group: "fitness" },
  { id: "nike-training",    label: "Nike Training",     icon: "Dumbbell",      defaultColor: "#111111", group: "fitness" },

  // ── Noticias & Lectura ─────────────────────
  { id: "kindle-unlimited", label: "Kindle Unlimited",  icon: "BookOpenCheck", defaultColor: "#FF9900", group: "news" },
  { id: "medium",           label: "Medium",            icon: "FileText",      defaultColor: "#000000", group: "news" },
  { id: "nyt",              label: "New York Times",    icon: "Newspaper",     defaultColor: "#1A1A1A", group: "news" },
  { id: "scribd",           label: "Scribd",            icon: "Library",       defaultColor: "#1E7B85", group: "news" },
  { id: "substack",         label: "Substack",          icon: "Mail",          defaultColor: "#FF6719", group: "news" },
  { id: "economist",        label: "The Economist",     icon: "Newspaper",     defaultColor: "#E3120B", group: "news" },
  { id: "wsj",              label: "Wall Street Journal",icon: "Newspaper",    defaultColor: "#0080C3", group: "news" },

  // ── Finanzas ───────────────────────────────
  { id: "nu",               label: "Nu (Nubank)",       icon: "CreditCard",    defaultColor: "#820AD1", group: "finance" },
  { id: "rappi-prime",      label: "RappiPay / Prime",  icon: "Zap",           defaultColor: "#FF441F", group: "finance" },
  { id: "mercado-pago",     label: "Mercado Pago",      icon: "Handshake",     defaultColor: "#009EE3", group: "finance" },
  { id: "revolut",          label: "Revolut",           icon: "ArrowRightLeft",defaultColor: "#0075EB", group: "finance" },
  { id: "wise",             label: "Wise",              icon: "ArrowRightLeft",defaultColor: "#9FE870", group: "finance" },
  { id: "paypal",           label: "PayPal",            icon: "DollarSign",    defaultColor: "#003087", group: "finance" },

  // ── Comida & Delivery ──────────────────────
  { id: "uber-eats-pass",   label: "Uber Eats Pass",    icon: "UtensilsCrossed",defaultColor: "#06C167", group: "food" },
  { id: "didi-food",        label: "DiDi Food",         icon: "ChefHat",       defaultColor: "#FF7A00", group: "food" },
  { id: "rappi",            label: "Rappi",             icon: "ShoppingBag",   defaultColor: "#FF441F", group: "food" },
  { id: "hellofresh",       label: "HelloFresh",        icon: "Carrot",        defaultColor: "#90C548", group: "food" },
  { id: "doordash",         label: "DoorDash",          icon: "ShoppingBag",   defaultColor: "#FF3008", group: "food" },

  // ── Compras & Membresías ───────────────────
  { id: "amazon-prime",     label: "Amazon Prime",      icon: "Package",       defaultColor: "#FF9900", group: "shopping" },
  { id: "costco",           label: "Costco",            icon: "Store",         defaultColor: "#005DAA", group: "shopping" },
  { id: "sams-club",        label: "Sam's Club",        icon: "ShoppingCart",  defaultColor: "#0067A0", group: "shopping" },
  { id: "ml-nivel-6",       label: "Mercado Libre Lvl6",icon: "BadgeCheck",    defaultColor: "#FFE600", group: "shopping" },
  { id: "walmart-plus",     label: "Walmart+",          icon: "ShoppingCart",  defaultColor: "#0071CE", group: "shopping" },

  // ── Transporte ─────────────────────────────
  { id: "uber-pass",        label: "Uber Pass / One",   icon: "Car",           defaultColor: "#000000", group: "transport" },
  { id: "didi",             label: "DiDi",              icon: "Navigation",    defaultColor: "#FF7A00", group: "transport" },
  { id: "lyft",             label: "Lyft",              icon: "Car",           defaultColor: "#FF00BF", group: "transport" },

  // ── Otros / Genéricos (sin logo, solo Lucide) ─
  { id: "vpn-nord",         label: "NordVPN",           icon: "Shield",        defaultColor: "#4687FF", group: "other" },
  { id: "vpn-express",      label: "ExpressVPN",        icon: "Shield",        defaultColor: "#DA3940", group: "other" },
  { id: "vpn-surfshark",    label: "Surfshark",         icon: "Shield",        defaultColor: "#178BF1", group: "other" },
  { id: "bitwarden",        label: "Bitwarden",         icon: "KeyRound",      defaultColor: "#175DDC", group: "other" },
  { id: "antivirus-norton", label: "Norton",             icon: "ShieldCheck",   defaultColor: "#FFC200", group: "other" },
  { id: "antivirus-kaspersky",label: "Kaspersky",        icon: "ShieldCheck",   defaultColor: "#006D5C", group: "other" },
  { id: "domain",           label: "Dominio Web",       icon: "Globe",         defaultColor: "#06B6D4", group: "other" },
  { id: "hosting",          label: "Hosting",           icon: "Server",        defaultColor: "#8B5CF6", group: "other" },
  { id: "email-service",    label: "Email Marketing",   icon: "MailCheck",     defaultColor: "#F59E0B", group: "other" },
  { id: "analytics",        label: "Analytics",         icon: "BarChart3",     defaultColor: "#10B981", group: "other" },
  { id: "insurance",        label: "Seguro",            icon: "ShieldPlus",    defaultColor: "#0EA5E9", group: "other" },
  { id: "gym",              label: "Gimnasio",          icon: "Dumbbell",      defaultColor: "#DC2626", group: "other" },
  { id: "generic",          label: "Otro servicio",     icon: "CreditCard",    defaultColor: "#64748B", group: "other" },
];

// ── IDs que tienen logo descargado (el script genera PNG para estos) ──
// Los genéricos (domain, hosting, gym, etc.) NO tienen logo — usan Lucide.
export const platformsWithLogo = new Set(
  subscriptionIcons
    .filter((i) => !["domain", "hosting", "email-service", "analytics", "insurance", "gym", "generic"].includes(i.id))
    .map((i) => i.id)
);

export function hasStaticLogo(id: string): boolean {
  return platformsWithLogo.has(id);
}

export function getSubscriptionIconById(id: string): SubscriptionIconOption | undefined {
  return subscriptionIcons.find((i) => i.id === id);
}

export function getSubscriptionIconsByLucideIcon(iconName: string): SubscriptionIconOption[] {
  return subscriptionIcons.filter((i) => i.icon === iconName);
}

export function getGroupedSubscriptionIcons() {
  const grouped = new Map<SubscriptionIconGroup, SubscriptionIconOption[]>();
  for (const item of subscriptionIcons) {
    const existing = grouped.get(item.group) || [];
    existing.push(item);
    grouped.set(item.group, existing);
  }
  return Array.from(grouped.entries()).map(([group, items]) => ({
    group,
    label: subscriptionIconGroups[group],
    items,
  }));
}