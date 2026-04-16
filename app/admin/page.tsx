import { prisma } from "@/lib/prisma";

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

function startOfWeekMonday(d: Date) {
  const x = startOfDay(d);
  const dow = x.getDay();
  const diff = dow === 0 ? 6 : dow - 1;
  x.setDate(x.getDate() - diff);
  return x;
}

function startOfMonth(d: Date) {
  const x = new Date(d.getFullYear(), d.getMonth(), 1);
  x.setHours(0, 0, 0, 0);
  return x;
}

function formatDayLabel(d: Date) {
  return d.toLocaleDateString("tg-TJ", { weekday: "short", day: "numeric", month: "short" });
}

export default async function AdminDashboardPage() {
  const now = new Date();
  const todayStart = startOfDay(now);
  const weekStart = startOfWeekMonday(now);
  const monthStart = startOfMonth(now);

  const [
    totalUsers,
    activeSubscribers,
    newToday,
    newThisWeek,
    newThisMonth,
    totalLessonsCompleted,
    last7DaysCounts,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { subscriptionActive: true } }),
    prisma.user.count({ where: { createdAt: { gte: todayStart } } }),
    prisma.user.count({ where: { createdAt: { gte: weekStart } } }),
    prisma.user.count({ where: { createdAt: { gte: monthStart } } }),
    prisma.lessonProgress.count(),
    Promise.all(
      Array.from({ length: 7 }, (_, i) => {
        const dayStart = addDays(todayStart, -(6 - i));
        const dayEnd = addDays(dayStart, 1);
        return prisma.user.count({
          where: { createdAt: { gte: dayStart, lt: dayEnd } },
        }).then((count) => ({ dayStart, count }));
      }),
    ),
  ]);

  const freeUsers = totalUsers - activeSubscribers;
  const maxBar = Math.max(1, ...last7DaysCounts.map((d) => d.count));

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Асосӣ</h1>
        <p className="mt-1 text-sm text-foreground-secondary">Хулосаи платформа</p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: "Ҳамаи корбарон", value: totalUsers },
          { label: "Обунашудагон (фаъол)", value: activeSubscribers },
          { label: "Бепул", value: freeUsers },
          { label: "Нав имрӯз", value: newToday },
          { label: "Нав ин ҳафта", value: newThisWeek },
          { label: "Нав ин моҳ", value: newThisMonth },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-theme-medium bg-surface/80 p-5 shadow-sm transition-colors dark:bg-surface/60"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-foreground-muted">{card.label}</p>
            <p className="mt-2 text-3xl font-bold tabular-nums text-foreground">{card.value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-theme-medium bg-surface/80 p-6 shadow-sm dark:bg-surface/60">
        <h2 className="text-lg font-semibold text-foreground">Бақидамонии 7 рӯз</h2>
        <p className="mt-1 text-sm text-foreground-secondary">Шумораи сабтномаҳо ба рӯз</p>
        <div className="mt-8 flex h-44 items-end justify-between gap-2 sm:gap-3">
          {last7DaysCounts.map(({ dayStart, count }) => (
            <div key={dayStart.toISOString()} className="flex min-w-0 flex-1 flex-col items-center gap-2">
              <div
                className="w-full max-w-[3rem] rounded-t-md bg-gradient-to-t from-cyan/90 to-cyan/50 sm:max-w-none"
                style={{ height: `${Math.max(8, (count / maxBar) * 100)}%` }}
                title={`${count}`}
              />
              <span className="max-w-full truncate text-center text-[10px] font-medium text-foreground-muted sm:text-xs">
                {formatDayLabel(dayStart)}
              </span>
              <span className="font-mono text-xs tabular-nums text-foreground-secondary">{count}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-theme-medium bg-surface/80 p-6 shadow-sm dark:bg-surface/60">
        <h2 className="text-lg font-semibold text-foreground">Дарсҳои анҷомшуда</h2>
        <p className="mt-1 text-sm text-foreground-secondary">Ҳамагӣ аз ҳамаи корбарон</p>
        <p className="mt-4 text-4xl font-bold tabular-nums text-cyan">{totalLessonsCompleted}</p>
      </section>
    </div>
  );
}
