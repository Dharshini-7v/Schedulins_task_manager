import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SidebarToggle from "@/components/layout/SidebarToggle";
import ThemeManager from "@/components/layout/ThemeManager";
import UserBadge from "@/components/layout/UserBadge";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Schedulins",
  description: "Aesthetic planner with motivation rewards",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-foreground flex">
          <SidebarToggle />
          <ThemeManager />
          <UserBadge />
          <div className="flex-1 min-w-0">
            <header className="sticky top-0 z-10 border-b bg-white/80 dark:bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-black/30 md:hidden">
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center shadow-sm">
                    <span className="text-white font-bold text-sm">S</span>
                  </div>
                  <a href="/dashboard" className="font-semibold">Schedulins</a>
                </div>
                <span className="text-sm opacity-70">Aesthetic Planner</span>
              </div>
            </header>
            <main className="p-4 md:p-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
