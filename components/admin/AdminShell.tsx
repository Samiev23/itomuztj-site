"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";

const links = [
  { href: "/admin", label: "Асосӣ", icon: "📊" },
  { href: "/admin/users", label: "Корбарон", icon: "👥" },
  { href: "/admin/payments", label: "Пардохтҳо", icon: "💰" },
] as const;

function NavLinks({
  onNavigate,
  pathname,
  variant,
}: {
  onNavigate?: () => void;
  pathname: string;
  variant: "sidebar" | "mobile";
}) {
  return (
    <>
      {links.map((item) => {
        const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
        const base =
          variant === "sidebar"
            ? `flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`
            : `flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition-colors sm:text-sm ${
                active ? "bg-white/15 text-white" : "bg-white/5 text-slate-200 hover:bg-white/10"
              }`;
        return (
          <Link key={item.href} href={item.href} onClick={onNavigate} className={base}>
            <span aria-hidden>{item.icon}</span>
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col md:flex-row">
      {/* Mobile top */}
      <div className="border-b border-white/10 bg-[#0f172a] md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/admin" className="transition hover:opacity-90">
            <BrandLogo className="text-base text-white" />
          </Link>
          <Link href="/" className="text-sm font-medium text-cyan-300 hover:text-cyan-200">
            ← Ба сайт
          </Link>
        </div>
        <nav
          className="flex gap-2 overflow-x-auto px-3 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Админ — мобилӣ"
        >
          <NavLinks pathname={pathname} variant="mobile" />
        </nav>
      </div>

      {/* Desktop sidebar */}
      <aside
        className="hidden w-56 shrink-0 flex-col border-r border-white/10 bg-[#0f172a] py-6 text-slate-200 md:flex"
        aria-label="Админ — меню"
      >
        <div className="px-4">
          <Link href="/admin" className="block transition hover:opacity-90">
            <BrandLogo className="text-lg text-white" />
          </Link>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-slate-500">Admin</p>
        </div>
        <nav className="mt-8 flex flex-col gap-0.5 px-2">
          <NavLinks pathname={pathname} variant="sidebar" />
        </nav>
        <div className="mt-auto px-4 pt-8">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <span aria-hidden>←</span>
            Ба сайт
          </Link>
        </div>
      </aside>

      <main className="min-w-0 flex-1 bg-[rgb(var(--rgb-background))] px-4 py-6 text-foreground sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
