import { prisma } from "@/lib/prisma";

export default async function AdminPaymentsPage() {
  const rows = await prisma.payment.findMany({
    orderBy: { date: "desc" },
    include: { user: { select: { name: true, email: true } } },
    take: 200,
  });

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Пардохтҳо</h1>
        <p className="mt-1 text-sm text-foreground-secondary">
          Сабти дастӣ — ҳангоми фаъол кардани обуна аз ҷониби админ сабт мешавад (150 сомонӣ)
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-theme-medium bg-surface/80 shadow-sm dark:bg-surface/60">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-theme-medium bg-[var(--bg-glass-mid)]">
              <th className="px-4 py-3 font-semibold text-foreground">Корбар</th>
              <th className="px-4 py-3 font-semibold text-foreground">Email</th>
              <th className="px-4 py-3 font-semibold text-foreground">Маблағ</th>
              <th className="px-4 py-3 font-semibold text-foreground">Сана</th>
              <th className="px-4 py-3 font-semibold text-foreground">Ҳолат</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id} className="border-b border-theme-subtle last:border-0">
                <td className="px-4 py-3 font-medium text-foreground">{p.user.name ?? "—"}</td>
                <td className="max-w-[220px] truncate px-4 py-3 text-foreground-secondary">{p.user.email ?? "—"}</td>
                <td className="px-4 py-3 tabular-nums text-foreground">
                  {p.amount > 0 ? (
                    <>
                      {p.amount} <span className="text-foreground-muted">сомонӣ</span>
                    </>
                  ) : (
                    <span className="text-foreground-muted">—</span>
                  )}
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-foreground-secondary">
                  {p.date.toLocaleString("tg-TJ")}
                </td>
                <td className="px-4 py-3">
                  {p.status === "Active" ? (
                    <span className="inline-flex rounded-full bg-success/15 px-2.5 py-1 text-xs font-semibold text-success">
                      Фаъол
                    </span>
                  ) : (
                    <span className="inline-flex rounded-full bg-[var(--bg-glass-mid)] px-2.5 py-1 text-xs font-semibold text-foreground-muted">
                      Муҳлат гузашта
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-foreground-muted">Ҳанӯз сабт нест.</p>
        ) : null}
      </div>
    </div>
  );
}
