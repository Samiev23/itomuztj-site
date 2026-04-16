import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LessonAccessGate } from "@/components/LessonAccessGate";
import {
  courseLessonModules,
  getLessonByCourseAndId,
  getModuleForLessonInCourse,
  isCourseId,
  isLessonAccessibleInCourse,
  type CourseId,
} from "@/data/lessons";
import { SITE_TITLE } from "@/lib/site";

type Props = { params: { courseId: string; lessonId: string } };

export function generateStaticParams() {
  return (["kotlin", "web"] as const).flatMap((courseId) =>
    courseLessonModules[courseId].flatMap((m) => m.lessons.map((l) => ({ courseId, lessonId: l.id }))),
  );
}

export function generateMetadata({ params }: Props): Metadata {
  const courseId = (params.courseId ?? "").trim().toLowerCase();
  const found = getLessonByCourseAndId(courseId, params.lessonId);
  if (!found) return { title: SITE_TITLE };
  return {
    title: SITE_TITLE,
    description: found.lesson.description,
  };
}

export default function CourseLessonPage({ params }: Props) {
  const { lessonId } = params;
  const courseId = (params.courseId ?? "").trim().toLowerCase() as CourseId;
  if (!isCourseId(courseId)) notFound();

  const found = getLessonByCourseAndId(courseId, lessonId);
  if (!found) notFound();
  const { lesson } = found;

  const accessible = isLessonAccessibleInCourse(courseId, lesson);

  if (!accessible) {
    return (
      <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden transition-colors duration-300">
        <div className="pointer-events-none fixed inset-0 bg-grid-pattern bg-grid opacity-30" aria-hidden />
        <div className="relative mx-auto max-w-lg px-4 py-20 text-center sm:px-6">
          <span className="text-4xl" aria-hidden>
            🔒
          </span>
          <h1 className="mt-6 text-2xl font-bold text-foreground">Ин дарс ҳанӯз дастрас нест</h1>
          <p className="mt-4 text-foreground-secondary">
            Дарси «{lesson.title}» ба зудӣ кушода мешавад ё пеш аз он дарсҳои қаблӣро ба анҷом расонед.
          </p>
          <Link
            href={`/courses/${courseId}/lessons`}
            className="mt-8 inline-flex rounded-full border border-cyan/40 bg-cyan-dim px-6 py-3 font-semibold text-cyan transition-colors duration-300 hover:bg-cyan/20"
          >
            Бозгашт ба рӯйхати дарсҳо
          </Link>
        </div>
      </main>
    );
  }

  const mod = getModuleForLessonInCourse(courseId, lesson.id);
  if (!mod) notFound();

  return (
    <main className="relative overflow-hidden transition-colors duration-300">
      <div className="pointer-events-none fixed inset-0 bg-grid-pattern bg-grid opacity-30" aria-hidden />
      <div className="relative">
        <LessonAccessGate courseId={courseId} lesson={lesson} module={mod} />
      </div>
    </main>
  );
}
