"use client";

import { useFinFlowStore } from "@/store";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { IconRenderer } from "@/components/shared/icon-renderer";
import { currencies } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Sun, Moon, Monitor, Download, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Currency } from "@/types";

export default function SettingsPage() {
  const { user, updateUser, categories, tags } = useFinFlowStore();
  const { theme, setTheme } = useTheme();

  const themeOptions = [
    { value: "light", label: "Claro", icon: Sun },
    { value: "dark", label: "Oscuro", icon: Moon },
    { value: "system", label: "Sistema", icon: Monitor },
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-display">Configuración</h2>
        <p className="text-sm text-muted-foreground">Personaliza tu experiencia en FinFlow</p>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Perfil</CardTitle>
          <CardDescription>Tu información personal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="text-xl">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={user.name}
                onChange={(e) => updateUser({ name: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={user.email} disabled className="mt-1" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Preferencias</CardTitle>
          <CardDescription>Moneda, idioma y apariencia</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label>Moneda principal</Label>
            <Select
              value={user.defaultCurrency}
              onValueChange={(v) => updateUser({ defaultCurrency: v as Currency })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((c) => (
                  <SelectItem key={c.code} value={c.code}>
                    {c.flag} {c.code} — {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Tema</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {themeOptions.map((opt) => {
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setTheme(opt.value)}
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer",
                      theme === opt.value
                        ? "border-primary bg-primary/10"
                        : "border-transparent bg-muted hover:border-border"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Categorías</CardTitle>
          <CardDescription>{categories.length} categorías configuradas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {categories.slice(0, 12).map((cat) => (
              <div key={cat.id} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${cat.color}20` }}
                >
                  <IconRenderer name={cat.icon} size={14} />
                </div>
                <span className="text-xs font-medium truncate">{cat.name}</span>
              </div>
            ))}
          </div>
          {categories.length > 12 && (
            <p className="text-xs text-muted-foreground mt-2 text-center">
              +{categories.length - 12} más
            </p>
          )}
        </CardContent>
      </Card>

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tags</CardTitle>
          <CardDescription>Etiquetas para organizar transacciones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag.id} variant="secondary" className="gap-1">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tag.color }} />
                #{tag.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Datos</CardTitle>
          <CardDescription>Exportar o eliminar tus datos</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" className="gap-2" onClick={() => toast.success("Datos exportados (demo)")}>
            <Download className="w-4 h-4" />
            Exportar CSV
          </Button>
          <Button variant="outline" className="gap-2 text-destructive border-destructive/30 hover:bg-destructive/10">
            <Trash2 className="w-4 h-4" />
            Eliminar cuenta
          </Button>
        </CardContent>
      </Card>

      {/* About */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Acerca de FinFlow</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>Versión 0.1.0 (MVP)</p>
          <p>Hecho con ❤️ por Johann</p>
          <div className="flex gap-4 mt-2">
            <button className="text-primary hover:underline cursor-pointer text-sm">Privacidad</button>
            <button className="text-primary hover:underline cursor-pointer text-sm">Términos</button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
