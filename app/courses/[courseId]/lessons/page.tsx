import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LessonsModulesClient } from "@/components/LessonsModulesClient";
import { coursesCatalog, isCourseId } from "@/data/lessons";
import { SITE_TITLE } from "@/lib/site";

type Props = { params: { courseId: string } };

export function generateStaticParams() {
  return coursesCatalog.filter((c) => isCourseId(c.id)).map((c) => ({ courseId: c.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const c = coursesCatalog.find((x) => x.id === params.courseId);
  if (!c) return { title: SITE_TITLE };
  return {
    title: SITE_TITLE,
    description: c.description,
  };
}

export default function CourseLessonsPage({ params }: Props) {
  if (!isCourseId(params.courseId)) notFound();
  const course = coursesCatalog.find((c) => c.id === params.courseId)!;
  const isKotlin = course.id === "kotlin";

  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden pb-20">
      <div className="pointer-events-none fixed inset-0 bg-grid-pattern bg-grid opacity-30" aria-hidden />
      <div
        className={`pointer-events-none fixed -left-32 top-32 h-72 w-72 rounded-full blur-[100px] ${isKotlin ? "bg-purple/10" : "bg-emerald-500/10"}`}
        aria-hidden
      />
      <div
        className={`pointer-events-none fixed -right-32 bottom-20 h-72 w-72 rounded-full blur-[100px] ${isKotlin ? "bg-cyan/10" : "bg-[#34d399]/10"}`}
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl px-4 pt-12 sm:px-6 lg:max-w-4xl lg:px-8 lg:pt-16">
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-cyan"
        >
          <span aria-hidden>←</span>
          Ҳамаи курсҳо
        </Link>

        <header className="mt-8 text-center sm:mt-10">
          <p className="text-3xl" aria-hidden>
            {course.emoji}
          </p>
          <p
            className={`mt-3 font-mono text-xs font-medium uppercase tracking-widest ${isKotlin ? "text-cyan" : "text-[#34d399]"}`}
          >
            {isKotlin ? "Kotlin & Android" : "Сайтсозӣ"}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">{course.title}</h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-slate-400 sm:text-lg">{course.description}</p>
        </header>

        <LessonsModulesClient courseId={course.id} accent={course.accent} />
      </div>
    </main>
  );
}
