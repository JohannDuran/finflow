"use client";

import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Bell } from "lucide-react";
import { useFinFlowStore } from "@/store";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/transactions": "Transacciones",
  "/wallets": "Wallets",
  "/budgets": "Presupuestos",
  "/settings": "Configuración",
};

export function Topbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { user } = useFinFlowStore();

  const title = pageTitles[pathname] || "FinFlow";

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-6 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-lg sm:text-xl font-bold font-display tracking-tight">{title}</h1>
          <p className="text-xs text-muted-foreground hidden sm:block">
            Hola, {user.name} 👋
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground"
          aria-label="Notificaciones"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-muted-foreground"
          aria-label="Cambiar tema"
        >
          <Sun className="w-5 h-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute w-5 h-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </div>
    </header>
  );
}
