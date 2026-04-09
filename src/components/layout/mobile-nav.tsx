"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useFinFlowStore } from "@/store";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  PieChart,
  Plus,
  BarChart3,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Inicio", icon: LayoutDashboard },
  { href: "/transactions", label: "Movimientos", icon: ArrowLeftRight },
  { href: "/wallets", label: "Wallets", icon: Wallet },
  { href: "/budgets", label: "Budgets", icon: PieChart },
  { href: "/reports", label: "Reportes", icon: BarChart3 },
];

export function MobileNav() {
  const pathname = usePathname();
  const { setActiveModal } = useFinFlowStore();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-card/95 backdrop-blur-xl border-t border-border safe-area-inset-bottom">
      <div className="flex items-center justify-around px-2 h-16 relative">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;

          // Insert FAB in the middle (after 2nd item)
          if (index === 2) {
            return (
              <div key="fab-wrapper" className="flex items-center gap-0">
                {/* FAB Button */}
                <button
                  onClick={() => setActiveModal("transaction-form")}
                  className="relative -top-4 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6aab8e] to-[#6fa8c9] text-white shadow-lg shadow-[#6aab8e]/30 flex items-center justify-center active:scale-95 transition-transform mx-2 cursor-pointer"
                  aria-label="Nueva transacción"
                >
                  <Plus className="w-7 h-7" />
                </button>

                {/* Current nav item */}
                <Link
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center gap-0.5 py-2 px-3 rounded-lg transition-colors min-w-[56px]",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </Link>
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 py-2 px-3 rounded-lg transition-colors min-w-[56px]",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
