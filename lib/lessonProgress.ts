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

async function fetchRemoteLessonIds(courseId: string): Promise<string[] | null> {
  try {
    const res = await fetch(`/api/lesson-progress?courseId=${encodeURIComponent(courseId)}`, {
      credentials: "same-origin",
    });
    if (res.status === 401) return null;
    if (!res.ok) return null;
    const data = (await res.json()) as { lessonIds?: unknown };
    if (!Array.isArray(data.lessonIds)) return null;
    return data.lessonIds.filter((x): x is string => typeof x === "string");
  } catch {
    return null;
  }
}

async function fetchRemoteAllProgress(): Promise<ProgressByCourse | null> {
  try {
    const res = await fetch("/api/lesson-progress", { credentials: "same-origin" });
    if (res.status === 401) return null;
    if (!res.ok) return null;
    const data = (await res.json()) as { kotlin?: unknown; web?: unknown };
    const kotlin = Array.isArray(data.kotlin)
      ? data.kotlin.filter((x): x is string => typeof x === "string")
      : [];
    const web = Array.isArray(data.web) ? data.web.filter((x): x is string => typeof x === "string") : [];
    return { kotlin, web };
  } catch {
    return null;
  }
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
  try {
    const remote = await fetchRemoteLessonIds(courseId);
    if (remote !== null) return remote;
    return readStored()[courseId];
  } catch {
    return readStored()[courseId];
  }
}

export async function fetchAllCoursesProgress(): Promise<ProgressByCourse> {
  try {
    const remote = await fetchRemoteAllProgress();
    if (remote !== null) return remote;
    return readStored();
  } catch {
    return readStored();
  }
}

export async function saveLessonCompletion(courseId: string, lessonId: string): Promise<boolean> {
  if (typeof window === "undefined") return false;
  if (courseId !== "kotlin" && courseId !== "web") return false;

  try {
    const res = await fetch("/api/lesson-progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ courseId, lessonId }),
    });
    if (res.ok) return true;
    if (res.status !== 401) return false;
  } catch {
    /* fall through to localStorage */
  }

  const data = readStored();
  const set = new Set(data[courseId]);
  set.add(lessonId);
  data[courseId] = Array.from(set);
  writeStored(data);
  return true;
}
