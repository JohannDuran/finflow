"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm";
}

export function ThemeToggle({ className, size = "icon" }: ThemeToggleProps) {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;

  const toggle = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  // We always render the button to avoid layout shift, but make it visually correct
  return (
    <Button
      variant="ghost"
      size={size}
      onClick={toggle}
      className={cn("text-muted-foreground", className)}
      aria-label="Cambiar tema"
    >
      <Sun className="w-4 h-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute w-4 h-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
