"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectToLogin() {
  const router = useRouter();

  useEffect(() => {
    // Always redirect to login page (don't check localStorage)
    router.replace("/login");
  }, [router]);

  return null;
}
