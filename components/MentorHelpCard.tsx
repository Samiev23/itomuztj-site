"use client";

/** Кӯмаки ментор — танҳо барои дарсҳои пулакӣ; зери қисми редактор */
export function MentorHelpCard({ variant = "default" }: { variant?: "default" | "web" }) {
  const isWeb = variant === "web";
  const border = isWeb
    ? "border-[#34d399]/25 dark:border-[#34d399]/30"
    : "border-theme-medium ring-1 ring-cyan/10 dark:ring-cyan/15";
  const bg = isWeb
    ? "bg-[#34d399]/[0.06] dark:bg-[#34d399]/[0.1]"
    : "bg-[var(--bg-glass-mid)]/90 dark:bg-[var(--bg-glass-mid)]";

  return (
    <aside
      className={`w-full max-w-full shrink-0 rounded-xl border px-4 py-4 shadow-sm transition-colors sm:px-5 ${border} ${bg}`}
      aria-label="Кӯмаки ментор"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
        <span className="text-2xl leading-none sm:text-3xl" aria-hidden>
          💬
        </span>
        <div className="min-w-0 flex-1 space-y-2">
          <h2 className="text-base font-bold leading-snug text-foreground sm:text-lg">🎓 Менторӣ — кӯмаки шахсӣ</h2>
          <p className="text-sm leading-relaxed text-foreground-secondary">
            Шумо ба хидмати менторӣ дастрасӣ доред! Агар саволе доред ё дар вазифа мушкилӣ доред — ба мо нависед.
          </p>
          <a
            href="https://t.me/itomuztj"
            target="_blank"
            rel="noopener noreferrer"
            className={
              isWeb
                ? "inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#34d399] to-[#34d399]/85 px-4 py-2.5 text-sm font-bold text-white shadow-md transition-opacity hover:opacity-90 sm:w-auto"
                : "inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan to-cyan/80 px-4 py-2.5 text-sm font-bold text-white shadow-md transition-opacity hover:opacity-90 sm:w-auto"
            }
            style={
              isWeb
                ? { boxShadow: "0 4px 14px rgba(52, 211, 153, 0.25)" }
                : { boxShadow: "0 4px 14px var(--shadow-cyan)" }
            }
          >
            📩 Навиштан ба Telegram
          </a>
          <p className="text-xs leading-relaxed text-foreground-muted">Менторҳои мо дар 24 соат ҷавоб медиҳанд</p>
        </div>
      </div>
    </aside>
  );
}
