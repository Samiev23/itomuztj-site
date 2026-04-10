import type { CourseId, Lesson, LessonModule } from "./lessonTypes";
import { kotlinLessonModules } from "./kotlinCourse";
import { webLessonModules } from "./webCourse";

export type { CourseId } from "./lessonTypes";

export const courseLessonModules: Record<CourseId, LessonModule[]> = {
  kotlin: kotlinLessonModules,
  web: webLessonModules,
};

export type CourseAccent = "cyan" | "emerald" | "violet" | "amber" | "rose" | "sky";

export type CatalogEntryId = CourseId | "design" | "python-ai" | "ios" | "backend";

export interface CourseCatalogEntry {
  id: CatalogEntryId;
  emoji: string;
  title: string;
  description: string;
  accentHex: string;
  accent: CourseAccent;
  /** Курсҳои ҳозира — дарсҳо дастрас */
  comingSoon?: boolean;
}

export const coursesCatalog: CourseCatalogEntry[] = [
  {
    id: "web",
    emoji: "🌐",
    title: "Сайтсозӣ",
    description: "HTML, CSS, мини-лоиҳа, CSS пешрафта, JavaScript асосӣ — то лоиҳаҳои воқеӣ ва гувоҳнома",
    accentHex: "#34d399",
    accent: "emerald",
  },
  {
    id: "kotlin",
    emoji: "📱",
    title: "Kotlin & Android",
    description: "Барномаҳои мобилӣ барои Android бо забони тоҷикӣ",
    accentHex: "#22d3ee",
    accent: "cyan",
  },
  {
    id: "design",
    emoji: "🎨",
    title: "UI/UX Дизайн",
    description: "Фигма, принсипҳои UI ва таҷрибаи корбар",
    accentHex: "#a78bfa",
    accent: "violet",
    comingSoon: true,
  },
  {
    id: "python-ai",
    emoji: "🤖",
    title: "Python & AI",
    description: "Python, додаҳо ва асосҳои зеҳни сунъӣ",
    accentHex: "#fbbf24",
    accent: "amber",
    comingSoon: true,
  },
  {
    id: "ios",
    emoji: "🍎",
    title: "iOS & Swift",
    description: "Барномаҳо барои iPhone ва iPad",
    accentHex: "#fb7185",
    accent: "rose",
    comingSoon: true,
  },
  {
    id: "backend",
    emoji: "💾",
    title: "Backend & Database",
    description: "Сервер, API, базаи додаҳо ва амният",
    accentHex: "#38bdf8",
    accent: "sky",
    comingSoon: true,
  },
];

export function isCourseId(id: string): id is CourseId {
  return id === "kotlin" || id === "web";
}

export function getLessonModulesForCourse(courseId: string): LessonModule[] | undefined {
  if (!isCourseId(courseId)) return undefined;
  return courseLessonModules[courseId];
}

export function getLessonByCourseAndId(
  courseId: string,
  lessonId: string,
): { lesson: Lesson; moduleTitle: string } | undefined {
  const mods = getLessonModulesForCourse(courseId);
  if (!mods) return undefined;
  for (const m of mods) {
    const lesson = m.lessons.find((l) => l.id === lessonId);
    if (lesson) return { lesson, moduleTitle: m.title };
  }
  return undefined;
}

export function getNextLessonInfo(
  courseId: string,
  currentLessonId: string,
): { id: string; title: string } | null {
  const mods = getLessonModulesForCourse(courseId);
  if (!mods) return null;
  const all = mods.flatMap((m) => m.lessons);
  const idx = all.findIndex((l) => l.id === currentLessonId);
  if (idx < 0 || idx >= all.length - 1) return null;
  const next = all[idx + 1];
  return { id: next.id, title: next.title };
}

export function getAllLessonIdsForCourse(courseId: string): string[] {
  const mods = getLessonModulesForCourse(courseId);
  return mods?.flatMap((m) => m.lessons.map((l) => l.id)) ?? [];
}

export function countLessonsInCourse(courseId: CourseId): number {
  return courseLessonModules[courseId].reduce((n, m) => n + m.lessons.length, 0);
}

export function getModuleForLessonInCourse(courseId: string, lessonId: string): LessonModule | undefined {
  return getLessonModulesForCourse(courseId)?.find((m) => m.lessons.some((l) => l.id === lessonId));
}

export function isLessonAccessibleInCourse(courseId: string, lesson: Lesson): boolean {
  const mod = getModuleForLessonInCourse(courseId, lesson.id);
  return Boolean(mod && !mod.locked);
}

/** Занҷири кушодан: модулҳои кушода, ба тартиби рақами дарс. */
export function getProgressionLessonIdsForCourse(courseId: string): string[] {
  const mods = getLessonModulesForCourse(courseId);
  if (!mods) return [];
  return mods
    .filter((m) => !m.locked)
    .flatMap((m) => [...m.lessons].sort((a, b) => a.number - b.number))
    .map((l) => l.id);
}

export function getNextLessonIdForCourse(courseId: string, currentId: string): string | null {
  const mods = getLessonModulesForCourse(courseId);
  if (!mods) return null;
  const ordered = [...mods.flatMap((m) => m.lessons)].sort((a, b) => a.number - b.number);
  const i = ordered.findIndex((l) => l.id === currentId);
  if (i === -1 || i >= ordered.length - 1) return null;
  return ordered[i + 1]!.id;
}
