import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FinFlow — Todas tus finanzas. Una sola app.",
  description:
    "Controla gastos, maneja presupuestos y alcanza tus metas financieras. Todo en un solo lugar. Cero excusas.",
  keywords: ["finanzas personales", "presupuesto", "gastos", "fintech", "ahorro"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="plus_jakar..." suppressHydrationWarning>
      <body 
        className="min-h-screen bg-background text-foreground antialiased"
        suppressHydrationWarning  // ← Add this line
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}