import { getProgressionLessonIdsForCourse, type LessonModule } from "@/data/lessons";
import type { CourseId } from "@/data/lessonTypes";

const STORAGE_KEY = "itomuz-progress";
const LEGACY_STORAGE_KEY = "codetj-progress";

export type ProgressByCourse = { kotlin: string[]; web: string[] };

function readStored(): ProgressByCourse {
  if (typeof window === "undefined") return { kotlin: [], web: [] };
  try {
    let raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      raw = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (raw) {
        localStorage.setItem(STORAGE_KEY, raw);
        localStorage.removeItem(LEGACY_STORAGE_KEY);
      }
    }
    if (!raw) return { kotlin: [], web: [] };
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return { kotlin: [], web: [] };
    const o = parsed as Record<string, unknown>;
    const kotlin = Array.isArray(o.kotlin)
      ? o.kotlin.filter((x): x is string => typeof x === "string")
      : [];
    const web = Array.isArray(o.web) ? o.web.filter((x): x is string => typeof x === "string") : [];
    return { kotlin, web };
  } catch {
    return { kotlin: [], web: [] };
  }
}

function writeStored(data: ProgressByCourse): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function isLessonUnlockedByProgress(
  lessonId: string,
  module: LessonModule,
  completedIds: string[],
  courseId: string,
): boolean {
  if (module.locked) return false;
  if (module.id === "m0") return true;
  const chain = getProgressionLessonIdsForCourse(courseId);
  const idx = chain.indexOf(lessonId);
  if (idx <= 0) return true;
  const prev = chain[idx - 1];
  return prev ? completedIds.includes(prev) : true;
}

export function isLessonCompleted(lessonId: string, completedIds: string[]): boolean {
  return completedIds.includes(lessonId);
}

export function notifyProgressUpdated() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("itomuz-progress"));
}

export function getCompletedLessonIdsSync(courseId: CourseId): string[] {
  return readStored()[courseId];
}

export function getAllProgressSync(): ProgressByCourse {
  return readStored();
}

export async function fetchCompletedLessonIds(courseId: string): Promise<string[]> {
  if (courseId !== "kotlin" && courseId !== "web") return [];
  return Promise.resolve(readStored()[courseId]);
}

export async function fetchAllCoursesProgress(): Promise<ProgressByCourse> {
  return Promise.resolve(readStored());
}

export async function saveLessonCompletion(courseId: string, lessonId: string): Promise<boolean> {
  if (typeof window === "undefined") return false;
  if (courseId !== "kotlin" && courseId !== "web") return false;
  const data = readStored();
  const set = new Set(data[courseId]);
  set.add(lessonId);
  data[courseId] = Array.from(set);
  writeStored(data);
  return true;
}
