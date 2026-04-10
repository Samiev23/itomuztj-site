"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  countCompletedLessonsForCourse,
  countLessonsInCourse,
  coursesCatalog,
  type CourseId,
} from "@/data/lessons";
import { fetchAllCoursesProgress } from "@/lib/lessonProgress";

const accentBar: Record<string, string> = {
  cyan: "from-cyan to-cyan/70",
  emerald: "from-[#34d399] to-emerald-600",
  violet: "from-violet-400 to-violet-600",
  amber: "from-amber-400 to-amber-600",
  rose: "from-rose-400 to-rose-600",
  sky: "from-sky-400 to-sky-600",
};

const accentLabel: Record<string, string> = {
  cyan: "text-cyan",
  emerald: "text-[#34d399]",
  violet: "text-violet-400",
  amber: "text-amber-400",
  rose: "text-rose-400",
  sky: "text-sky-400",
};

const accentBorder: Record<string, string> = {
  cyan: "border-cyan/30 hover:border-cyan/50",
  emerald: "border-[#34d399]/30 hover:border-[#34d399]/50",
  violet: "border-violet-500/30 hover:border-violet-500/50",
  amber: "border-amber-500/30 hover:border-amber-500/50",
  rose: "border-rose-500/30 hover:border-rose-500/50",
  sky: "border-sky-500/30 hover:border-sky-500/50",
};

const accentGlow: Record<string, string> = {
  cyan: "shadow-cyan/10",
  emerald: "shadow-[#34d399]/10",
  violet: "shadow-violet-500/10",
  amber: "shadow-amber-500/10",
  rose: "shadow-rose-500/10",
  sky: "shadow-sky-500/10",
};

export function CoursesGridClient() {
  const [byCourse, setByCourse] = useState<{ kotlin: string[]; web: string[] } | null>(null);

  const refresh = useCallback(() => {
    fetchAllCoursesProgress().then(setByCourse);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    window.addEventListener("itomuz-progress", refresh);
    return () => window.removeEventListener("itomuz-progress", refresh);
  }, [refresh]);

  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:gap-8">
      {coursesCatalog.map((course) => {
        const border = accentBorder[course.accent] ?? accentBorder.cyan;
        const glow = accentGlow[course.accent] ?? accentGlow.cyan;
        const bar = accentBar[course.accent] ?? accentBar.cyan;
        const label = accentLabel[course.accent] ?? accentLabel.cyan;

        if (course.comingSoon) {
          return (
            <div
              key={course.id}
              className={`relative flex flex-col rounded-2xl border border-dashed border-theme-strong bg-surface/40 p-6 opacity-90 shadow-lg transition-colors duration-300 sm:p-8 ${glow}`}
            >
              <span className="absolute right-4 top-4 rounded-full border border-theme-medium bg-[var(--bg-glass-mid)] px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-foreground-muted">
                Ба зудӣ
              </span>
              <span className="text-4xl" aria-hidden>
                {course.emoji}
              </span>
              <h2 className="mt-4 text-xl font-bold text-foreground sm:text-2xl">{course.title}</h2>
              <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-foreground-muted sm:text-base">
                {course.description}
              </p>
              <p className={`mt-6 font-mono text-sm ${label}`}>Интизори мундариҷа…</p>
            </div>
          );
        }

        const cid = course.id as CourseId;
        const total = countLessonsInCourse(cid);
        const done = countCompletedLessonsForCourse(cid, byCourse?.[cid] ?? []);
        const percent = total > 0 ? Math.round((done / total) * 100) : 0;

        return (
          <Link
            key={course.id}
            href={`/courses/${course.id}/lessons`}
            className={`group relative flex flex-col rounded-2xl border bg-surface/80 p-6 shadow-lg transition-[border-color,box-shadow,background-color] duration-300 sm:p-8 ${border} ${glow} hover:bg-card-hover`}
          >
            <span className="absolute right-4 top-4 rounded-full border border-cyan/25 bg-cyan/10 px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-cyan">
              Бепул
            </span>
            <span className="text-4xl" aria-hidden>
              {course.emoji}
            </span>
            <h2 className="mt-4 text-xl font-bold text-foreground sm:text-2xl">{course.title}</h2>
            <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-foreground-secondary sm:text-base">
              {course.description}
            </p>
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className={`font-mono ${label}`}>
                  {done} / {total} дарс
                </span>
                <span className="text-foreground-muted">{percent}%</span>
              </div>
              <div
                className="h-2 overflow-hidden rounded-full transition-colors duration-300"
                style={{
                  backgroundColor: "var(--progress-track)",
                  boxShadow: "inset 0 0 0 1px var(--progress-ring)",
                }}
                role="progressbar"
                aria-valuenow={percent}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className={`h-full rounded-full bg-gradient-to-r transition-all duration-500 ${bar}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
            <span className={`mt-4 inline-flex items-center gap-1 text-sm font-semibold ${label}`}>
              Оғоз кардан
              <span className="transition group-hover:translate-x-0.5" aria-hidden>
                →
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
