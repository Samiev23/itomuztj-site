"use client";

import { useCallback, useEffect, useState } from "react";
import { LessonCard } from "@/components/LessonCard";
import { WebCourseCertificateBanner } from "@/components/WebCourseCertificateBanner";
import { getLessonModulesForCourse, type CourseAccent } from "@/data/lessons";
import {
  fetchCompletedLessonIds,
  isLessonCompleted,
  isLessonUnlockedByProgress,
} from "@/lib/lessonProgress";

type Props = {
  courseId: string;
  accent: CourseAccent;
};

export function LessonsModulesClient({ courseId, accent }: Props) {
  const modules = getLessonModulesForCourse(courseId);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    fetchCompletedLessonIds(courseId).then((ids) => {
      setCompletedIds(ids);
      setLoading(false);
    });
  }, [courseId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    window.addEventListener("itomuz-progress", refresh);
    return () => window.removeEventListener("itomuz-progress", refresh);
  }, [refresh]);

  const total = modules?.reduce((n, m) => n + m.lessons.length, 0) ?? 0;
  const completed = completedIds.length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  const barClass =
    accent === "emerald"
      ? "bg-gradient-to-r from-[#34d399] to-emerald-600"
      : "bg-gradient-to-r from-cyan to-purple";

  if (!modules?.length) {
    return (
      <p className="mx-auto mt-10 max-w-xl text-center text-sm text-foreground-muted">Курс ёфт нашуд.</p>
    );
  }

  if (loading) {
    return (
      <p className="mx-auto mt-10 max-w-xl text-center text-sm text-foreground-muted">Боргирӣи пешрафт…</p>
    );
  }

  return (
    <>
      <section className="mx-auto mt-10 max-w-xl" aria-labelledby="progress-label">
        <div className="flex items-center justify-between gap-4 text-sm">
          <span id="progress-label" className="text-foreground-secondary">
            Пешрафт
          </span>
          <span className="font-mono text-foreground-secondary">
            {completed} / {total} дарс · {percent}%
          </span>
        </div>
        <div
          className="mt-3 h-2.5 overflow-hidden rounded-full transition-colors duration-300"
          style={{
            backgroundColor: "var(--progress-track)",
            boxShadow: "inset 0 0 0 1px var(--progress-ring)",
          }}
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-labelledby="progress-label"
        >
          <div className={`h-full rounded-full transition-all duration-500 ${barClass}`} style={{ width: `${percent}%` }} />
        </div>
      </section>

      {courseId === "web" ? <WebCourseCertificateBanner completedIds={completedIds} /> : null}

      <div className="mt-14 space-y-14">
        {modules.map((mod) => (
          <section key={mod.id} aria-labelledby={`module-${mod.id}-title`}>
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 id={`module-${mod.id}-title`} className="text-xl font-bold text-foreground sm:text-2xl">
                  {mod.title}
                </h2>
                <p className="mt-1 font-mono text-sm text-foreground-muted">{mod.titleEn}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {mod.capstone ? (
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-success/35 bg-success/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-success">
                    <span aria-hidden>🏆</span>
                    Лоиҳаи ниҳоӣ · гувоҳнома
                  </span>
                ) : null}
              {mod.locked && (
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-purple/30 bg-purple-dim px-3 py-1 text-xs font-semibold uppercase tracking-wide text-purple">
                  <span aria-hidden>🔒</span>
                  Ба зудӣ
                </span>
              )}
              </div>
            </div>
            <ul className="space-y-4">
              {mod.lessons.map((lesson) => (
                <li key={lesson.id}>
                  <LessonCard
                    courseId={courseId}
                    accent={accent}
                    lesson={lesson}
                    moduleLocked={mod.locked}
                    unlocked={isLessonUnlockedByProgress(lesson.id, mod, completedIds, courseId)}
                    completed={isLessonCompleted(lesson.id, completedIds)}
                  />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
