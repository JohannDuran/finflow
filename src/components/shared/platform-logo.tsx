"use client";

import { useState } from "react";
import { IconRenderer } from "./icon-renderer";
import { Subscription } from "@/types";
import { hasStaticLogo } from "@/lib/constants/subscription-icons";

interface PlatformLogoProps {
  sub: Partial<Subscription> & { name: string; icon: string; color: string };
  size?: number;
}

export function PlatformLogo({ sub, size = 18 }: PlatformLogoProps) {
  const [hasError, setHasError] = useState(false);

  const platformId = sub.platformId;
  const showLogo = platformId && hasStaticLogo(platformId) && !hasError;

  if (!showLogo) {
    return (
      <div className="flex items-center justify-center w-full h-full" style={{ color: sub.color }}>
        <IconRenderer name={sub.icon} size={size} />
      </div>
    );
  }

  return (
    <img
      src={`/logos/subscriptions/${platformId}.png`}
      alt={sub.name}
      className="w-full h-auto object-contain p-1"
      onError={() => setHasError(true)}
    />
  );
}
