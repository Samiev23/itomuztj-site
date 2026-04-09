"use client";

import { THEME_STORAGE_KEY } from "@/lib/theme";
import { useTheme } from "@/lib/useTheme";

export function ThemeToggle() {
  const theme = useTheme();
  const isDark = theme === "dark";

  function toggle() {
    const next = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-theme-medium bg-[var(--bg-glass-low)] text-lg transition hover:bg-[var(--bg-glass-mid)]"
      aria-label={isDark ? "Гузариш ба мавзӯи рӯшно" : "Гузариш ба мавзӯи торик"}
      title={isDark ? "Рӯшноӣ" : "Торикӣ"}
    >
      <span aria-hidden>{isDark ? "☀️" : "🌙"}</span>
    </button>
  );
}
