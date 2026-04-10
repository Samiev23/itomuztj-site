"use client";

import { WEB_CAPSTONE_LESSON_ID } from "@/data/lessons";

type Props = {
  completedIds: string[];
};

export function WebCourseCertificateBanner({ completedIds }: Props) {
  if (!completedIds.includes(WEB_CAPSTONE_LESSON_ID)) return null;

  return (
    <div
      className="mx-auto mt-10 max-w-xl rounded-2xl border border-success/40 bg-success/10 px-6 py-5 text-center transition-colors duration-300"
      role="status"
    >
      <p className="text-2xl" aria-hidden>
        🎓
      </p>
      <p className="mt-2 text-lg font-bold text-foreground">Табрик! Шумо курсро ба анҷом расонед!</p>
      <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
        Бо анҷоми лоиҳаи «Саҳифаи фурӯш» шумо <strong className="text-foreground">гувоҳномаи Сайтсозӣ (ITomuz TJ)</strong>-ро гирифтед —
        HTML, CSS ва JavaScript-ро дар лоиҳаҳои воқеӣ истифода бурдед.
      </p>
    </div>
  );
}
