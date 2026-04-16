import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { activateSubscription, deactivateSubscription } from "@/app/admin/actions";
import { countLessonsInCourse, getLessonByCourseAndId } from "@/data/lessons";
import type { CourseId } from "@/data/lessonTypes";
import { prisma } from "@/lib/prisma";

function courseLabel(courseId: string) {
  if (courseId === "web") return "Сайтсозӣ";
  if (courseId === "kotlin") return "Kotlin & Android";
  return courseId;
}

export default async function AdminUserDetailPage({ params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      lessonProgress: { orderBy: { completedAt: "desc" } },
    },
  });

  if (!user) notFound();

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <div>
        <Link href="/admin/users" className="text-sm font-medium text-cyan hover:underline">
          ← Ба рӯйхати корбарон
        </Link>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Корбар</h1>
      </div>

      <section className="rounded-2xl border border-theme-medium bg-surface/80 p-6 shadow-sm dark:bg-surface/60">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          {user.image ? (
            <Image
              src={user.image}
              alt=""
              width={96}
              height={96}
              className="h-24 w-24 shrink-0 rounded-2xl border border-theme-medium object-cover"
              unoptimized
            />
          ) : (
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-theme-medium bg-[var(--bg-glass-mid)] text-2xl text-foreground-muted">
              ?
            </div>
          )}
          <div className="min-w-0 flex-1 space-y-2">
            <h2 className="text-xl font-bold text-foreground">{user.name ?? "Бе ном"}</h2>
            <p className="text-foreground-secondary">{user.email ?? "—"}</p>
            <p className="font-mono text-xs text-foreground-muted">
              Сабт: {user.createdAt.toLocaleString("tg-TJ")} · ID: {user.id}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {user.subscriptionActive ? (
                <span className="inline-flex rounded-full bg-success/15 px-3 py-1 text-sm font-semibold text-success">
                  Обуна: фаъол
                </span>
              ) : (
                <span className="inline-flex rounded-full bg-[var(--bg-glass-mid)] px-3 py-1 text-sm font-semibold text-foreground-muted">
                  Обуна: ғайрифаъол
                </span>
              )}
              <span className="text-sm text-foreground-secondary">
                Анҷоми обуна: {user.subscriptionEnd ? user.subscriptionEnd.toLocaleDateString("tg-TJ") : "—"}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 pt-4">
              <form action={activateSubscription}>
                <input type="hidden" name="userId" value={user.id} />
                <button
                  type="submit"
                  className="rounded-xl border border-success/40 bg-success/10 px-4 py-2 text-sm font-semibold text-success hover:bg-success/20"
                >
                  ✅ Обуна фаъол (+30 рӯз)
                </button>
              </form>
              <form action={deactivateSubscription}>
                <input type="hidden" name="userId" value={user.id} />
                <button
                  type="submit"
                  className="rounded-xl border border-theme-medium px-4 py-2 text-sm font-semibold text-foreground-secondary hover:bg-[var(--bg-glass-mid)]"
                >
                  ❌ Обуна ғайрифаъол
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-theme-medium bg-surface/80 p-6 shadow-sm dark:bg-surface/60">
        <h3 className="text-lg font-semibold text-foreground">Пешрафт ба курсҳо</h3>
        <div className="mt-4 space-y-4">
          {(["kotlin", "web"] as CourseId[]).map((cid) => {
            const total = countLessonsInCourse(cid);
            const done = user.lessonProgress.filter((p) => p.courseId === cid).length;
            const pct = total ? Math.round((done / total) * 100) : 0;
            return (
              <div key={cid}>
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-foreground">{courseLabel(cid)}</span>
                  <span className="tabular-nums text-foreground-secondary">
                    {done} / {total} ({pct}%)
                  </span>
                </div>
                <div
                  className="mt-2 h-2.5 overflow-hidden rounded-full"
                  style={{ backgroundColor: "var(--progress-track)", boxShadow: "inset 0 0 0 1px var(--progress-ring)" }}
                >
                  <div className="h-full rounded-full bg-gradient-to-r from-cyan to-purple" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-theme-medium bg-surface/80 p-6 shadow-sm dark:bg-surface/60">
        <h3 className="text-lg font-semibold text-foreground">Дарсҳои анҷомшуда</h3>
        <p className="mt-1 text-sm text-foreground-secondary">Бо санаи анҷом</p>
        {user.lessonProgress.length === 0 ? (
          <p className="mt-6 text-sm text-foreground-muted">Ҳанӯз дарс анҷом дода нашудааст.</p>
        ) : (
          <ul className="mt-6 divide-y divide-theme-subtle border-t border-theme-medium">
            {user.lessonProgress.map((row) => {
              const meta = getLessonByCourseAndId(row.courseId, row.lessonId);
              const title = meta?.lesson.title ?? row.lessonId;
              return (
                <li key={row.id} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-medium text-foreground">{title}</p>
                    <p className="text-xs text-foreground-muted">{courseLabel(row.courseId)}</p>
                  </div>
                  <time className="font-mono text-xs text-foreground-secondary" dateTime={row.completedAt.toISOString()}>
                    {row.completedAt.toLocaleString("tg-TJ")}
                  </time>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
