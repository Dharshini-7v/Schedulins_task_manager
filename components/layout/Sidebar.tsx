"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ListTodo, Timer, Gift, Settings } from "lucide-react";

const items = [
  { href: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/plan", label: "Plan", Icon: ListTodo },
  { href: "/execute", label: "Execute", Icon: Timer },
  { href: "/reward", label: "Reward", Icon: Gift },
  { href: "/settings", label: "Settings", Icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname() || "/dashboard";
  return (
    <aside className="hidden md:flex md:w-64 border-r bg-white/80 dark:bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-black/30">
      <nav className="w-full p-6 space-y-1">
        <div className="mb-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-green-500 flex items-center justify-center shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-300">
            <span className="text-white font-black text-xl italic transform -rotate-12 hover:rotate-0 transition-transform duration-300" style={{fontFamily: 'Georgia, serif'}}>S</span>
          </div>
          <Link href="/dashboard" className="text-xl font-semibold">Schedulins</Link>
        </div>
        {items.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                active ? "bg-zinc-100 dark:bg-zinc-900 font-medium" : "hover:bg-zinc-100 dark:hover:bg-zinc-900"
              }`}
            >
              <Icon size={16} className="opacity-80" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
