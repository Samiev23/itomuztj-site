"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { Lesson, LessonModule } from "@/data/lessons";
import { fetchCompletedLessonIds, isLessonUnlockedByProgress } from "@/lib/lessonProgress";
import { LessonWorkspace } from "@/components/LessonWorkspace";
import { WebLessonWorkspace } from "@/components/WebLessonWorkspace";

type Props = {
  courseId: string;
  lesson: Lesson;
  module: LessonModule;
};

export function LessonAccessGate({ courseId, lesson, module }: Props) {
  const [ready, setReady] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const syncUnlock = useCallback(
    (ids: string[]) => {
      setUnlocked(isLessonUnlockedByProgress(lesson.id, module, ids, courseId));
    },
    [courseId, lesson.id, module],
  );

  useEffect(() => {
    let cancelled = false;
    fetchCompletedLessonIds(courseId).then((ids) => {
      if (cancelled) return;
      syncUnlock(ids);
      setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [courseId, lesson.id, module, syncUnlock]);

  useEffect(() => {
    const onProgress = () => {
      fetchCompletedLessonIds(courseId).then(syncUnlock);
    };
    window.addEventListener("itomuz-progress", onProgress);
    return () => window.removeEventListener("itomuz-progress", onProgress);
  }, [courseId, syncUnlock]);

  const listHref = `/courses/${courseId}/lessons`;

  if (!ready) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center text-foreground-secondary">
        <p className="font-mono text-sm">Боргирӣ…</p>
      </div>
    );
  }

  if (!unlocked) {
    return (
      <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden transition-colors duration-300">
        <div className="pointer-events-none fixed inset-0 bg-grid-pattern bg-grid opacity-30" aria-hidden />
        <div className="relative mx-auto max-w-lg px-4 py-20 text-center sm:px-6">
          <span className="text-4xl" aria-hidden>
            🔒
          </span>
          <h1 className="mt-6 text-2xl font-bold text-foreground">Ин дарс ҳанӯз кушода нест</h1>
          <p className="mt-4 text-foreground-secondary">
            Дарси қаблӣро бо муваффақият анҷом диҳед, то ин дарс дастрас шавад.
          </p>
          <Link
            href={listHref}
            className="mt-8 inline-flex rounded-full border border-cyan/40 bg-cyan-dim px-6 py-3 font-semibold text-cyan transition-colors duration-300 hover:bg-cyan/20"
          >
            Бозгашт ба рӯйхати дарсҳо
          </Link>
        </div>
      </main>
    );
  }

  if (lesson.runtime === "web") {
    return <WebLessonWorkspace lesson={lesson} moduleTitle={module.title} courseId={courseId} />;
  }

  return <LessonWorkspace lesson={lesson} moduleTitle={module.title} courseId={courseId} />;
}
