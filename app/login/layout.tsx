import React from "react";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center p-6">
      <div className="w-full">
        <div className="flex min-h-[calc(100vh-2rem)] items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
