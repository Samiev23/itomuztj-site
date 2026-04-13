import Link from "next/link";
import type { CourseAccent, Lesson } from "@/data/lessons";

type CardStatus = "completed" | "available" | "locked";

function StatusIcon({ status, accent }: { status: CardStatus; accent: CourseAccent }) {
  if (status === "completed") {
    return (
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-success/15 text-lg text-success ring-1 ring-success/30"
        aria-hidden
      >
        ✓
      </span>
    );
  }
  if (status === "available") {
    const ring =
      accent === "emerald"
        ? "ring-[#34d399]/35 bg-[#34d399]/10 text-[#34d399]"
        : "ring-cyan/35 bg-cyan-dim text-cyan";
    return (
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg ${ring}`} aria-hidden>
        ▶
      </span>
    );
  }
  return (
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--bg-glass-mid)] text-base text-foreground-muted ring-1 ring-[color:var(--border-medium)]"
      aria-hidden
    >
      🔒
    </span>
  );
}

export function LessonCard({
  courseId,
  accent,
  lesson,
  moduleLocked,
  unlocked,
  completed,
}: {
  courseId: string;
  accent: CourseAccent;
  lesson: Lesson;
  moduleLocked: boolean;
  unlocked: boolean;
  completed: boolean;
}) {
  const effectiveLocked = moduleLocked || !unlocked;
  const cardStatus: CardStatus = completed ? "completed" : effectiveLocked ? "locked" : "available";
  const canOpen = unlocked && !moduleLocked;

  const inner = (
    <>
      <StatusIcon status={cardStatus} accent={accent} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs font-medium uppercase tracking-wider text-foreground-muted">
            Дарс {lesson.number}
          </span>
          {lesson.isPremium ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/35 bg-amber-500/10 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-amber-800 dark:text-amber-200">
              <span aria-hidden>🔒</span>
              Пулакӣ
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-emerald-800 dark:text-emerald-200">
              <span aria-hidden>🆓</span>
              Бепул
            </span>
          )}
        </div>
        <h3 className="mt-1 text-lg font-semibold text-foreground">{lesson.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-foreground-secondary">{lesson.description}</p>
      </div>
    </>
  );

  const openClasses =
    accent === "emerald"
      ? "border-[#34d399]/25 hover:border-[#34d399]/45 hover:shadow-[#34d399]/10"
      : "border-cyan/25 hover:border-cyan/45 hover:shadow-cyan/5";

  const cardClass =
    "flex gap-4 rounded-2xl border p-5 transition-[border-color,box-shadow,background-color,opacity] duration-300 sm:p-6 " +
    (canOpen
      ? `bg-surface/80 hover:bg-card-hover hover:shadow-lg ${openClasses}`
      : "border-theme-medium bg-surface/40 lesson-card-locked");

  const href = `/courses/${courseId}/lessons/${lesson.id}`;

  if (canOpen) {
    return (
      <Link href={href} className={`${cardClass} group block focus-visible:outline-none`}>
        {inner}
        <span className="sr-only">Кушодани дарс</span>
      </Link>
    );
  }

  return (
    <div className={cardClass} aria-disabled={effectiveLocked}>
      {inner}
    </div>
  );
}
