"use client";

import Link from "next/link";

const INCLUDED_LESSON_COUNT = 134;

type Props = {
  courseId: string;
};

/** Экрани обуна — ҷои мундариҷаи дарси пулакӣ */
export function PremiumLessonPaywall({ courseId }: Props) {
  const isWeb = courseId === "web";
  const listHref = `/courses/${courseId}/lessons`;

  const ctaClass = isWeb
    ? "inline-flex w-full max-w-md items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#34d399] to-[#34d399]/85 px-5 py-3.5 text-center text-sm font-bold text-white shadow-lg transition-opacity hover:opacity-90"
    : "inline-flex w-full max-w-md items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan to-cyan/80 px-5 py-3.5 text-center text-sm font-bold text-white shadow-lg transition-opacity hover:opacity-90";

  const ctaShadow = isWeb ? { boxShadow: "0 8px 24px rgba(52, 211, 153, 0.28)" } : { boxShadow: "0 8px 24px var(--shadow-cyan)" };

  const priceRing = isWeb
    ? "border-[#34d399]/35 bg-[#34d399]/[0.08] dark:border-[#34d399]/40 dark:bg-[#34d399]/[0.12]"
    : "border-cyan/30 bg-cyan/5 dark:border-cyan/35 dark:bg-cyan/10";

  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full transition-colors duration-300">
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-10 sm:px-6 sm:py-14">
        <span className="text-5xl leading-none sm:text-6xl" aria-hidden>
          🔒
        </span>

        <h1 className="mt-8 text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Ин дарс пулакӣ аст
        </h1>
        <p className="mt-4 max-w-md text-center text-base leading-relaxed text-foreground-secondary">
          Барои дастрасӣ ба ҳамаи дарсҳои пулакӣ, обуна шавед
        </p>

        <div
          className={`mt-10 w-full max-w-sm rounded-2xl border px-6 py-5 text-center shadow-sm transition-colors ${priceRing}`}
        >
          <p className="font-mono text-sm font-medium uppercase tracking-wider text-foreground-muted">Нарх</p>
          <p className="mt-2 text-3xl font-bold tabular-nums text-foreground sm:text-4xl">150 сомонӣ</p>
          <p className="mt-1 text-sm font-medium text-foreground-secondary">/ моҳ</p>
        </div>

        <div className="mt-10 w-full max-w-md rounded-2xl border border-theme-medium bg-surface/80 px-5 py-5 shadow-inner dark:bg-surface/60 sm:px-6">
          <p className="text-center text-sm font-semibold text-foreground">Дар обуна шумо мегиред:</p>
          <ul className="mt-4 space-y-3 text-left text-sm leading-relaxed text-foreground-secondary">
            <li className="flex gap-2">
              <span className="shrink-0 text-success" aria-hidden>
                ✅
              </span>
              <span>
                Дастрасӣ ба ҳамаи <strong className="text-foreground">{INCLUDED_LESSON_COUNT}</strong> дарс
              </span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-success" aria-hidden>
                ✅
              </span>
              <span>Менторӣ дар Telegram</span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-success" aria-hidden>
                ✅
              </span>
              <span>Сертификат пас аз хатм</span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-success" aria-hidden>
                ✅
              </span>
              <span>Лоиҳаҳои амалӣ</span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-success" aria-hidden>
                ✅
              </span>
              <span>Навсозиҳои ройгон</span>
            </li>
          </ul>
        </div>

        <a
          href="https://t.me/itomuztj"
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-10 ${ctaClass}`}
          style={ctaShadow}
        >
          📩 Барои обуна ба Telegram нависед
        </a>
        <p className="mt-3 max-w-md text-center text-xs leading-relaxed text-foreground-muted">
          Пас аз пардохт дар 24 соат дастрасӣ мегиред
        </p>

        <Link
          href={listHref}
          className={
            isWeb
              ? "mt-10 inline-flex items-center gap-2 text-sm font-semibold text-[#34d399] transition-colors hover:text-[#34d399]/85"
              : "mt-10 inline-flex items-center gap-2 text-sm font-semibold text-cyan transition-colors hover:text-cyan/80 dark:text-cyan dark:hover:text-cyan/90"
          }
        >
          <span aria-hidden>←</span>
          Ба дарсҳои бепул баргардед
        </Link>
      </div>
    </div>
  );
}
