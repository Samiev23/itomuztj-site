"use client";

import { KOTLIN_CAPSTONE_LESSON_ID } from "@/data/lessons";

type Props = {
  completedIds: string[];
};

export function KotlinCourseCertificateBanner({ completedIds }: Props) {
  if (!completedIds.includes(KOTLIN_CAPSTONE_LESSON_ID)) return null;

  return (
    <div
      className="mx-auto mt-10 max-w-xl rounded-2xl border border-success/40 bg-success/10 px-6 py-5 text-center transition-colors duration-300"
      role="status"
    >
      <p className="text-2xl" aria-hidden>
        🎓
      </p>
      <p className="mt-2 text-lg font-bold text-foreground">Табрик! Шумо курси Kotlin & Android-ро ба анҷом расонед!</p>
      <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
        Бо анҷоми модули «Тайёрӣ ба кор» шумо{" "}
        <strong className="text-foreground">гувоҳномаи Kotlin & Android (ITomuz TJ)</strong>-ро гирифтед — Compose, Room, шабака,
        архитектура ва лоиҳаҳои амалиро аз сар гузарондед.
      </p>
    </div>
  );
}
