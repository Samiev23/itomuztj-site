"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { BrandLogo } from "@/components/BrandLogo";
import { ThemeToggle } from "@/components/ThemeToggle";

const navLinks = [
  { href: "/courses", label: "Курсҳо" },
  { href: "/#features", label: "Имконият" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const authDesktop =
    status === "loading" ? (
      <span className="h-8 w-20 animate-pulse rounded-full bg-[var(--bg-glass-mid)]" aria-hidden />
    ) : session?.user ? (
      <div className="flex items-center gap-2">
        {session.user.image ? (
          <Image
            src={session.user.image}
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 rounded-full border border-theme-medium object-cover"
            unoptimized
          />
        ) : (
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full border border-theme-medium bg-[var(--bg-glass-mid)] text-xs font-semibold text-foreground-secondary"
            aria-hidden
          >
            {(session.user.name ?? session.user.email ?? "?").slice(0, 1).toUpperCase()}
          </span>
        )}
        <button
          type="button"
          onClick={() => void signOut({ callbackUrl: "/" })}
          className="text-sm font-medium text-foreground-secondary transition-colors duration-300 hover:text-cyan"
        >
          Баромадан
        </button>
      </div>
    ) : (
      <Link
        href="/login"
        className="text-sm font-semibold text-cyan transition-colors duration-300 hover:text-cyan-hover"
      >
        Ворид шудан
      </Link>
    );

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-xl transition-[background-color,border-color] duration-300"
      style={{
        backgroundColor: "var(--navbar-bg)",
        borderColor: "var(--navbar-border)",
      }}
    >
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
              className="text-sm font-medium text-foreground-secondary transition-colors duration-300 hover:text-cyan"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          {authDesktop}
          <Link
            href="/courses"
            className="inline-flex items-center justify-center rounded-full bg-cyan px-5 py-2 text-sm font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-cyan-hover"
            style={{ boxShadow: "0 10px 15px -3px var(--shadow-cyan), 0 4px 6px -4px var(--shadow-cyan)" }}
          >
            Оғоз кардан
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-theme-medium text-foreground-secondary"
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
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-theme-subtle bg-[var(--navbar-bg)] px-4 py-4 backdrop-blur-xl md:hidden"
        >
          <nav className="flex flex-col gap-3" aria-label="Менюи мобилӣ">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-foreground-secondary transition-colors duration-300 hover:bg-[var(--bg-glass-mid)]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {status !== "loading" && session?.user ? (
              <div className="flex flex-col gap-3 border-t border-theme-subtle pt-3">
                <div className="flex items-center gap-3 px-3">
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt=""
                      width={36}
                      height={36}
                      className="h-9 w-9 rounded-full border border-theme-medium object-cover"
                      unoptimized
                    />
                  ) : null}
                  <span className="truncate text-sm text-foreground-secondary">{session.user.name ?? session.user.email}</span>
                </div>
                <button
                  type="button"
                  className="rounded-lg px-3 py-2 text-left text-sm font-semibold text-cyan"
                  onClick={() => {
                    setOpen(false);
                    void signOut({ callbackUrl: "/" });
                  }}
                >
                  Баромадан
                </button>
              </div>
            ) : status !== "loading" ? (
              <Link
                href="/login"
                className="rounded-lg px-3 py-2 text-sm font-semibold text-cyan"
                onClick={() => setOpen(false)}
              >
                Ворид шудан
              </Link>
            ) : null}
            <Link
              href="/courses"
              className="mt-1 inline-flex items-center justify-center rounded-full bg-cyan px-5 py-3 text-center font-semibold text-white transition-colors duration-300 hover:bg-cyan-hover"
              style={{ boxShadow: "0 4px 14px var(--shadow-cyan)" }}
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
