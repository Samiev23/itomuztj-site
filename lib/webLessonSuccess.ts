import type { Lesson } from "@/data/lessonTypes";
import { normalizeLessonOutputForMatch } from "@/lib/lessonOutputMatch";

export function evaluateWebLessonSuccess(lesson: Lesson, code: string): boolean {
  const t = code.trim();
  if (t.length === 0) return false;
  const normCode = normalizeLessonOutputForMatch(t);
  if (lesson.webChecks?.contains?.length) {
    if (!lesson.webChecks.contains.every((s) => normCode.includes(normalizeLessonOutputForMatch(s)))) return false;
  }
  if (lesson.webChecks?.containsLiteral?.length) {
    if (!lesson.webChecks.containsLiteral.every((s) => t.includes(s))) return false;
  }
  if (lesson.webChecks?.minLiCount != null) {
    const n = (t.match(/<li\b/gi) ?? []).length;
    if (n < lesson.webChecks.minLiCount) return false;
  }
  if (lesson.webChecks?.minAnchorCount != null) {
    const n = (t.match(/<a\b/gi) ?? []).length;
    if (n < lesson.webChecks.minAnchorCount) return false;
  }
  if (lesson.webChecks?.minMediaBlocks != null) {
    const n = (t.match(/@media/gi) ?? []).length;
    if (n < lesson.webChecks.minMediaBlocks) return false;
  }
  return true;
}
