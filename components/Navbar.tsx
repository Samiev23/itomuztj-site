"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";

const navLinks = [
  { href: "/courses", label: "Курсҳо" },
  { href: "/#features", label: "Имконият" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 transition hover:opacity-90"
          onClick={() => setOpen(false)}
        >
          <BrandLogo className="text-lg" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Навигатсияи асосӣ">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-300 transition hover:text-cyan"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex">
          <Link
            href="/courses"
            className="inline-flex items-center justify-center rounded-full bg-cyan px-5 py-2 text-sm font-semibold text-background shadow-lg shadow-cyan/30 transition hover:bg-cyan/90"
          >
            Оғоз кардан
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-slate-200 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Пӯшидани меню" : "Кушодани меню"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Меню</span>
          {open ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-white/5 bg-surface/95 px-4 py-4 backdrop-blur-xl md:hidden"
        >
          <nav className="flex flex-col gap-3" aria-label="Менюи мобилӣ">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-slate-200 hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/courses"
              className="mt-1 inline-flex items-center justify-center rounded-full bg-cyan px-5 py-3 text-center font-semibold text-background shadow-cyan/30 hover:bg-cyan/90"
              onClick={() => setOpen(false)}
            >
              Оғоз кардан
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
