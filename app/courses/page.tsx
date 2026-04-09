import type { Metadata } from "next";
import Link from "next/link";
import { CoursesGridClient } from "@/components/CoursesGridClient";
import { SITE_TITLE } from "@/lib/site";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: "Kotlin ва Android, сайтсозӣ бо HTML, CSS ва JavaScript — бо забони тоҷикӣ дар ITomuz.",
};

export default function CoursesPage() {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden pb-20 transition-colors duration-300">
      <div className="pointer-events-none fixed inset-0 bg-grid-pattern bg-grid opacity-30" aria-hidden />
      <div className="pointer-events-none fixed -left-32 top-32 h-72 w-72 rounded-full bg-purple/10 blur-[100px]" aria-hidden />
      <div className="pointer-events-none fixed -right-32 bottom-20 h-72 w-72 rounded-full bg-cyan/10 blur-[100px]" aria-hidden />

      <div className="relative mx-auto max-w-4xl px-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-foreground-secondary transition-colors duration-300 hover:text-cyan"
        >
          <span aria-hidden>←</span>
          Саҳифаи асосӣ
        </Link>

        <header className="mt-8 text-center sm:mt-10">
          <p className="font-mono text-xs font-medium uppercase tracking-widest text-foreground-muted">Омӯзиш</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">Курсҳо</h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-foreground-secondary sm:text-lg">
            Як курс интихоб кунед ва аз дарси якум оғоз намоед
          </p>
        </header>

        <CoursesGridClient />
      </div>
    </main>
  );
}
