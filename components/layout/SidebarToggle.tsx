"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

export default function SidebarToggle() {
  const pathname = usePathname();
  // hide sidebar on the login route (and any nested routes under /login)
  if (pathname?.startsWith("/login")) return null;
  return <Sidebar />;
}
