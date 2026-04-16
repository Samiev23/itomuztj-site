"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app/error]", error);
  }, [error]);

  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-bold text-foreground">Хато</h1>
      <p className="mt-3 max-w-md text-sm text-foreground-secondary">
        Саҳифа бор карда нашуд. Лутфан дубора кӯшиш кунед ё ба саҳифаи асосӣ баргардед.
      </p>
      {error?.message ? (
        <p className="mt-4 max-w-lg break-words font-mono text-xs text-foreground-muted">{error.message}</p>
      ) : null}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-full bg-cyan px-5 py-2.5 text-sm font-semibold text-white hover:bg-cyan-hover"
        >
          Дубора кӯшиш
        </button>
        <Link href="/" className="rounded-full border border-theme-medium px-5 py-2.5 text-sm font-semibold text-foreground-secondary hover:bg-[var(--bg-glass-mid)]">
          Саҳифаи асосӣ
        </Link>
      </div>
    </main>
  );
}
