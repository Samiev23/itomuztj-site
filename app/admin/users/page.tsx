import Image from "next/image";
import Link from "next/link";
import type { Prisma } from "@prisma/client";
import { activateSubscription, deactivateSubscription } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";

type SearchParams = { q?: string; filter?: string };

export default async function AdminUsersPage({ searchParams }: { searchParams: SearchParams }) {
  const q = (searchParams.q ?? "").trim();
  const filter = searchParams.filter ?? "all";

  const parts: Prisma.UserWhereInput[] = [];
  if (filter === "subscribers") parts.push({ subscriptionActive: true });
  if (filter === "free") parts.push({ subscriptionActive: false });
  if (q) parts.push({ OR: [{ email: { contains: q } }, { name: { contains: q } }] });
  const where: Prisma.UserWhereInput = parts.length ? { AND: parts } : {};

  const users = await prisma.user.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { lessonProgress: true } } },
  });

  const tab = (value: string, label: string) => {
    const active = filter === value || (value === "all" && filter !== "subscribers" && filter !== "free");
    const href =
      value === "all"
        ? `/admin/users${q ? `?q=${encodeURIComponent(q)}` : ""}`
        : `/admin/users?filter=${value}${q ? `&q=${encodeURIComponent(q)}` : ""}`;
    return (
      <Link
        key={value}
        href={href}
        className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
          active
            ? "bg-cyan text-white shadow-md"
            : "border border-theme-medium text-foreground-secondary hover:border-cyan/40 hover:text-foreground"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Корбарон</h1>
        <p className="mt-1 text-sm text-foreground-secondary">Идоракунӣ ва обуна</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {tab("all", "Ҳама")}
        {tab("subscribers", "Обунашудагон")}
        {tab("free", "Бепул")}
      </div>

      <form className="flex flex-col gap-3 sm:flex-row sm:items-center" action="/admin/users" method="get">
        {filter !== "all" ? <input type="hidden" name="filter" value={filter} /> : null}
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Ҷустуҷӯ бо ном ё email…"
          className="w-full max-w-md rounded-xl border border-theme-medium bg-[rgb(var(--rgb-input-bg))] px-4 py-2.5 text-sm text-foreground placeholder:text-foreground-muted focus:border-cyan/50 focus:outline-none focus:ring-2 focus:ring-cyan/20"
        />
        <button
          type="submit"
          className="rounded-xl bg-cyan px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cyan-hover"
        >
          Ҷустуҷӯ
        </button>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-theme-medium bg-surface/80 shadow-sm dark:bg-surface/60">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-theme-medium bg-[var(--bg-glass-mid)]">
              <th className="px-4 py-3 font-semibold text-foreground">Ном</th>
              <th className="px-4 py-3 font-semibold text-foreground">Email</th>
              <th className="px-4 py-3 font-semibold text-foreground">Акс</th>
              <th className="px-4 py-3 font-semibold text-foreground">Санаи сабт</th>
              <th className="px-4 py-3 font-semibold text-foreground">Обуна</th>
              <th className="px-4 py-3 font-semibold text-foreground">Анҷоми обуна</th>
              <th className="px-4 py-3 font-semibold text-foreground">Дарсҳо</th>
              <th className="px-4 py-3 font-semibold text-foreground">Амалҳо</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-theme-subtle last:border-0">
                <td className="px-4 py-3">
                  <Link href={`/admin/users/${u.id}`} className="font-medium text-cyan hover:underline">
                    {u.name ?? "—"}
                  </Link>
                </td>
                <td className="max-w-[200px] truncate px-4 py-3 text-foreground-secondary">{u.email ?? "—"}</td>
                <td className="px-4 py-3">
                  {u.image ? (
                    <Image
                      src={u.image}
                      alt=""
                      width={36}
                      height={36}
                      className="h-9 w-9 rounded-full border border-theme-medium object-cover"
                      unoptimized
                    />
                  ) : (
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-theme-medium bg-[var(--bg-glass-mid)] text-xs text-foreground-muted">
                      ?
                    </span>
                  )}
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-foreground-secondary">
                  {u.createdAt.toLocaleDateString("tg-TJ")}
                </td>
                <td className="px-4 py-3">
                  {u.subscriptionActive ? (
                    <span className="inline-flex rounded-full bg-success/15 px-2.5 py-1 text-xs font-semibold text-success">
                      Фаъол
                    </span>
                  ) : (
                    <span className="inline-flex rounded-full bg-[var(--bg-glass-mid)] px-2.5 py-1 text-xs font-semibold text-foreground-muted">
                      Ғайрифаъол
                    </span>
                  )}
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-foreground-secondary">
                  {u.subscriptionEnd ? u.subscriptionEnd.toLocaleDateString("tg-TJ") : "—"}
                </td>
                <td className="px-4 py-3 tabular-nums text-foreground-secondary">{u._count.lessonProgress}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                    <form action={activateSubscription}>
                      <input type="hidden" name="userId" value={u.id} />
                      <button
                        type="submit"
                        className="w-full whitespace-nowrap rounded-lg border border-success/40 bg-success/10 px-2 py-1.5 text-xs font-semibold text-success hover:bg-success/20 sm:w-auto"
                      >
                        ✅ Обуна фаъол
                      </button>
                    </form>
                    <form action={deactivateSubscription}>
                      <input type="hidden" name="userId" value={u.id} />
                      <button
                        type="submit"
                        className="w-full whitespace-nowrap rounded-lg border border-theme-medium px-2 py-1.5 text-xs font-semibold text-foreground-secondary hover:bg-[var(--bg-glass-mid)] sm:w-auto"
                      >
                        ❌ Обуна ғайрифаъол
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-foreground-muted">Корбар ёфт нашуд.</p>
        ) : null}
      </div>
    </div>
  );
}
