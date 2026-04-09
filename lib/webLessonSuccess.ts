import type { Lesson } from "@/data/lessonTypes";

export function evaluateWebLessonSuccess(lesson: Lesson, code: string): boolean {
  const t = code.trim();
  if (t.length === 0) return false;
  const lower = t.toLowerCase();
  if (lesson.webChecks?.contains?.length) {
    if (!lesson.webChecks.contains.every((s) => lower.includes(s.toLowerCase()))) return false;
  }
  if (lesson.webChecks?.containsLiteral?.length) {
    if (!lesson.webChecks.containsLiteral.every((s) => t.includes(s))) return false;
  }
  if (lesson.webChecks?.minLiCount != null) {
    const n = (t.match(/<li\b/gi) ?? []).length;
    if (n < lesson.webChecks.minLiCount) return false;
  }
  return true;
}
