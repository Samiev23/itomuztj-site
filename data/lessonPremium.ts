import type { Lesson, LessonModule } from "./lessonTypes";

/** Веб: дарси 1–18 бепул (`isPremium: false`), 19+ пулакӣ. Kotlin: 1–22 бепул, 23+ пулакӣ. */
export const WEB_FREE_THROUGH_LESSON_NUMBER = 18;
export const KOTLIN_FREE_THROUGH_LESSON_NUMBER = 22;

/** Модулҳо/дарсҳо бе `isPremium` дар объект — ба `attachLessonPremiumFlags` илова мешавад */
export type LessonWithoutPremium = Omit<Lesson, "isPremium">;

export type LessonModuleInput = Omit<LessonModule, "lessons"> & {
  lessons: LessonWithoutPremium[];
};

/**
 * Дарси ≤ `freeThroughLessonNumber` бепул аст; аз он зиёд — пулакӣ (`isPremium: true`).
 * Веб: 1–18 бепул, 19+ пулакӣ. Kotlin: 1–22 бепул, 23+ пулакӣ.
 */
export function attachLessonPremiumFlags(
  modules: LessonModuleInput[],
  freeThroughLessonNumber: number,
): LessonModule[] {
  return modules.map((module) => ({
    ...module,
    lessons: module.lessons.map((lesson) => ({
      ...lesson,
      isPremium: lesson.number > freeThroughLessonNumber,
    })),
  }));
}
