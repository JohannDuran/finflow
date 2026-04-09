"use client";

import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

interface IconRendererProps {
  name: string;
  className?: string;
  size?: number;
}

const iconMap: Record<string, Icons.LucideIcon> = {
  LayoutDashboard: Icons.LayoutDashboard,
  ArrowLeftRight: Icons.ArrowLeftRight,
  Wallet: Icons.Wallet,
  PieChart: Icons.PieChart,
  Settings: Icons.Settings,
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
  Banknote: Icons.Banknote,
  Laptop: Icons.Laptop,
  TrendingUp: Icons.TrendingUp,
  TrendingDown: Icons.TrendingDown,
  Store: Icons.Store,
  RotateCcw: Icons.RotateCcw,
  Plus: Icons.Plus,
  Building2: Icons.Building2,
  Bitcoin: Icons.Bitcoin,
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
  Menu: Icons.Menu,
  PanelLeftClose: Icons.PanelLeftClose,
  PanelLeft: Icons.PanelLeft,
};

export function IconRenderer({ name, className, size = 20 }: IconRendererProps) {
  const Icon = iconMap[name];
  if (!Icon) {
    return <Icons.CircleDot className={cn("text-muted-foreground", className)} size={size} />;
  }
  return <Icon className={className} size={size} />;
}
