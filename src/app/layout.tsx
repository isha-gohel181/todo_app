'use client';

import { ReactNode } from 'react';
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="bg-black dark:bg-slate-950 text-white antialiased">
        {/* Animated background gradient */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {/* Primary gradient blob */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />

          {/* Secondary gradient blob */}
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

          {/* Tertiary gradient blob */}
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-size-[40px_40px] opacity-30" />
        </div>

        {/* Content */}
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
