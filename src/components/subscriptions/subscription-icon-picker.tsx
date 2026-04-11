"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { IconRenderer } from "@/components/shared/icon-renderer";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  subscriptionIcons,
  getGroupedSubscriptionIcons,
  getSubscriptionLogoPath,
  hasStaticLogo,
  type SubscriptionIconOption,
  type SubscriptionIconGroup,
} from "@/lib/constants/subscription-icons";
import { Search, X } from "lucide-react";
import Image from "next/image";

// ──────────────────────────────────────────────
// PlatformLogo – Muestra logo PNG estático o fallback Lucide
// ──────────────────────────────────────────────

export function PlatformLogo({
  option,
  size = 24,
  className,
}: {
  option: SubscriptionIconOption;
  size?: number;
  className?: string;
}) {
  const [imgError, setImgError] = useState(false);
  const showLogo = hasStaticLogo(option.id) && !imgError;

  if (!showLogo) {
    return (
      <IconRenderer
        name={option.icon}
        size={size}
        style={{ color: option.defaultColor }}
        className={className}
      />
    );
  }

  return (
    <Image
      src={getSubscriptionLogoPath(option.id)}
      alt={option.label}
      width={size}
      height={size}
      className={cn("object-contain rounded-sm", className)}
      onError={() => setImgError(true)}
      unoptimized
    />
  );
}

// ──────────────────────────────────────────────
// SubscriptionIconPicker
// ──────────────────────────────────────────────

interface SubscriptionIconPickerProps {
  selectedIcon: string;
  selectedColor: string;
  /** ID de la plataforma seleccionada (para mostrar logo correcto) */
  selectedPlatformId?: string;
  onSelect: (option: SubscriptionIconOption) => void;
}

export function SubscriptionIconPicker({
  selectedIcon,
  selectedColor,
  selectedPlatformId,
  onSelect,
}: SubscriptionIconPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState<SubscriptionIconGroup | "all">("all");

  const grouped = useMemo(() => getGroupedSubscriptionIcons(), []);

  const filteredGroups = useMemo(() => {
    const q = search.toLowerCase().trim();
    return grouped
      .map((g) => ({
        ...g,
        items: g.items.filter((item) => {
          const matchesSearch =
            !q || item.label.toLowerCase().includes(q) || item.id.includes(q);
          const matchesGroup = activeGroup === "all" || item.group === activeGroup;
          return matchesSearch && matchesGroup;
        }),
      }))
      .filter((g) => g.items.length > 0);
  }, [grouped, search, activeGroup]);

  const totalResults = filteredGroups.reduce((sum, g) => sum + g.items.length, 0);

  const currentOption = selectedPlatformId
    ? subscriptionIcons.find((i) => i.id === selectedPlatformId)
    : subscriptionIcons.find((i) => i.icon === selectedIcon);

  function handleSelect(option: SubscriptionIconOption) {
    onSelect(option);
    setOpen(false);
    setSearch("");
    setActiveGroup("all");
  }

  return (
    <>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "flex items-center gap-2.5 w-full px-3 py-2 rounded-lg border border-border",
          "bg-background hover:bg-muted/50 transition-colors cursor-pointer text-left",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        )}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 overflow-hidden"
          style={{ backgroundColor: `${selectedColor}18` }}
        >
          {currentOption ? (
            <PlatformLogo option={currentOption} size={20} />
          ) : (
            <IconRenderer name={selectedIcon} size={16} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">
            {currentOption?.label || "Seleccionar plataforma"}
          </p>
          <p className="text-[10px] text-muted-foreground">Toca para cambiar</p>
        </div>
        <IconRenderer name="ChevronRight" size={14} className="text-muted-foreground shrink-0" />
      </button>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[520px] max-h-[85vh] flex flex-col p-0 gap-0">
          <DialogHeader className="px-5 pt-5 pb-3">
            <DialogTitle className="text-base">Elige una plataforma</DialogTitle>
            <DialogDescription className="text-xs">
              Selecciona el servicio de tu suscripción
            </DialogDescription>
          </DialogHeader>

          {/* Search */}
          <div className="px-5 pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar servicio..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-9 h-9"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Group Filters */}
          <div className="px-5 pb-3 flex gap-1.5 flex-wrap">
            <Badge
              variant={activeGroup === "all" ? "default" : "secondary"}
              className="cursor-pointer text-[10px] px-2 py-0.5"
              onClick={() => setActiveGroup("all")}
            >
              Todos ({subscriptionIcons.length})
            </Badge>
            {grouped.map((g) => (
              <Badge
                key={g.group}
                variant={activeGroup === g.group ? "default" : "secondary"}
                className="cursor-pointer text-[10px] px-2 py-0.5"
                onClick={() =>
                  setActiveGroup(activeGroup === g.group ? "all" : g.group)
                }
              >
                {g.label}
              </Badge>
            ))}
          </div>

          {/* Grid */}
          <div className="flex-1 overflow-y-auto px-5 pb-5 min-h-0">
            {totalResults === 0 ? (
              <div className="text-center py-10">
                <p className="text-sm text-muted-foreground">
                  No se encontraron servicios para &ldquo;{search}&rdquo;
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredGroups.map((group) => (
                  <div key={group.group}>
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      {group.label}
                    </p>
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5">
                      {group.items.map((item) => {
                        const isSelected =
                          selectedPlatformId === item.id ||
                          (!selectedPlatformId && item.icon === selectedIcon);
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleSelect(item)}
                            className={cn(
                              "flex flex-col items-center gap-1 p-2.5 rounded-xl transition-all cursor-pointer",
                              "hover:bg-muted/70 active:scale-95",
                              isSelected && "bg-primary/10 ring-1 ring-primary/30"
                            )}
                          >
                            <div
                              className="w-9 h-9 rounded-lg flex items-center justify-center overflow-hidden"
                              style={{ backgroundColor: `${item.defaultColor}15` }}
                            >
                              <PlatformLogo option={item} size={22} />
                            </div>
                            <span className="text-[10px] leading-tight text-center truncate w-full">
                              {item.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}