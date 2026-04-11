"use client";

import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

interface IconRendererProps {
  name: string;
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

const iconMap: Record<string, Icons.LucideIcon> = {
  // ── App Navigation ─────────────────────────
  LayoutDashboard: Icons.LayoutDashboard,
  ArrowLeftRight: Icons.ArrowLeftRight,
  Wallet: Icons.Wallet,
  PieChart: Icons.PieChart,
  Settings: Icons.Settings,
  Menu: Icons.Menu,
  PanelLeftClose: Icons.PanelLeftClose,
  PanelLeft: Icons.PanelLeft,

  // ── Expense Categories ─────────────────────
  UtensilsCrossed: Icons.UtensilsCrossed,
  Car: Icons.Car,
  Home: Icons.Home,
  Gamepad2: Icons.Gamepad2,
  Heart: Icons.Heart,
  GraduationCap: Icons.GraduationCap,
  Shirt: Icons.Shirt,
  Smartphone: Icons.Smartphone,
  CreditCard: Icons.CreditCard,
  Coffee: Icons.Coffee,
  ShoppingCart: Icons.ShoppingCart,
  Zap: Icons.Zap,
  PawPrint: Icons.PawPrint,
  Gift: Icons.Gift,
  MoreHorizontal: Icons.MoreHorizontal,

  // ── Income Categories ──────────────────────
  Banknote: Icons.Banknote,
  Laptop: Icons.Laptop,
  TrendingUp: Icons.TrendingUp,
  TrendingDown: Icons.TrendingDown,
  Store: Icons.Store,
  RotateCcw: Icons.RotateCcw,
  Plus: Icons.Plus,

  // ── Wallet Types ───────────────────────────
  Building2: Icons.Building2,
  Bitcoin: Icons.Bitcoin,

  // ── General UI ─────────────────────────────
  ArrowUpDown: Icons.ArrowUpDown,
  DollarSign: Icons.DollarSign,
  CircleDollarSign: Icons.CircleDollarSign,
  Receipt: Icons.Receipt,
  Target: Icons.Target,
  Calendar: Icons.Calendar,
  Search: Icons.Search,
  Filter: Icons.Filter,
  ChevronLeft: Icons.ChevronLeft,
  ChevronRight: Icons.ChevronRight,
  Moon: Icons.Moon,
  Sun: Icons.Sun,
  Bell: Icons.Bell,
  LogOut: Icons.LogOut,
  User: Icons.User,
  Mail: Icons.Mail,
  Lock: Icons.Lock,
  Eye: Icons.Eye,
  EyeOff: Icons.EyeOff,
  Trash2: Icons.Trash2,
  Edit: Icons.Edit,
  X: Icons.X,
  Check: Icons.Check,
  AlertTriangle: Icons.AlertTriangle,
  Info: Icons.Info,
  Sparkles: Icons.Sparkles,
  Globe: Icons.Globe,
  Users: Icons.Users,
  Shield: Icons.Shield,
  Repeat: Icons.Repeat,
  Tag: Icons.Tag,
  Download: Icons.Download,
  Upload: Icons.Upload,

  // ── Subscription Icons: Streaming & Video ──
  Tv: Icons.Tv,
  Tv2: Icons.Tv2,
  Clapperboard: Icons.Clapperboard,
  Film: Icons.Film,
  Play: Icons.Play,
  MonitorPlay: Icons.MonitorPlay,
  Drama: Icons.Drama,
  Mountain: Icons.Mountain,
  Youtube: Icons.Youtube,
  Twitch: Icons.Twitch,
  Star: Icons.Star,
  Projector: Icons.Projector,

  // ── Subscription Icons: Música & Audio ─────
  Music: Icons.Music,
  Music2: Icons.Music2,
  Music4: Icons.Music4,
  Disc3: Icons.Disc3,
  Waves: Icons.Waves,
  Headphones: Icons.Headphones,
  AudioLines: Icons.AudioLines,
  Podcast: Icons.Podcast,

  // ── Subscription Icons: Gaming ─────────────
  Joystick: Icons.Joystick,
  Gamepad: Icons.Gamepad,
  Swords: Icons.Swords,
  Flame: Icons.Flame,
  Monitor: Icons.Monitor,

  // ── Subscription Icons: Productividad ──────
  LayoutGrid: Icons.LayoutGrid,
  Cloud: Icons.Cloud,
  StickyNote: Icons.StickyNote,
  Palette: Icons.Palette,
  Figma: Icons.Figma,
  PenTool: Icons.PenTool,
  Github: Icons.Github,
  Bot: Icons.Bot,
  SpellCheck: Icons.SpellCheck,
  KeyRound: Icons.KeyRound,
  CheckSquare: Icons.CheckSquare,
  Layers: Icons.Layers,
  Triangle: Icons.Triangle,
  TrainFront: Icons.TrainFront,

  // ── Subscription Icons: Cloud ──────────────
  CloudCog: Icons.CloudCog,
  Inbox: Icons.Inbox,
  HardDrive: Icons.HardDrive,
  Database: Icons.Database,

  // ── Subscription Icons: Comunicación ───────
  Video: Icons.Video,
  Hash: Icons.Hash,
  MessageCircle: Icons.MessageCircle,
  MessageSquare: Icons.MessageSquare,
  Send: Icons.Send,

  // ── Subscription Icons: Educación ──────────
  BookOpen: Icons.BookOpen,
  BookMarked: Icons.BookMarked,
  BookOpenCheck: Icons.BookOpenCheck,
  PencilRuler: Icons.PencilRuler,
  Lightbulb: Icons.Lightbulb,
  Languages: Icons.Languages,
  Award: Icons.Award,

  // ── Subscription Icons: Fitness & Salud ────
  Dumbbell: Icons.Dumbbell,
  Bike: Icons.Bike,
  Activity: Icons.Activity,
  Brain: Icons.Brain,

  // ── Subscription Icons: Noticias & Lectura ─
  FileText: Icons.FileText,
  Newspaper: Icons.Newspaper,
  Library: Icons.Library,

  // ── Subscription Icons: Finanzas ───────────
  Handshake: Icons.Handshake,
  ArrowRightLeft: Icons.ArrowRightLeft,

  // ── Subscription Icons: Food & Delivery ────
  ChefHat: Icons.ChefHat,
  ShoppingBag: Icons.ShoppingBag,
  Carrot: Icons.Carrot,

  // ── Subscription Icons: Compras ────────────
  Package: Icons.Package,
  BadgeCheck: Icons.BadgeCheck,

  // ── Subscription Icons: Transporte ─────────
  Navigation: Icons.Navigation,

  // ── Subscription Icons: Otros ──────────────
  ShieldCheck: Icons.ShieldCheck,
  ShieldPlus: Icons.ShieldPlus,
  Server: Icons.Server,
  MailCheck: Icons.MailCheck,
  BarChart3: Icons.BarChart3,
};

export function IconRenderer({ name, className, size = 20, style }: IconRendererProps) {
  const Icon = iconMap[name];
  if (!Icon) {
    return <Icons.CircleDot className={cn("text-muted-foreground", className)} size={size} style={style} />;
  }
  return <Icon className={className} size={size} style={style} />;
}