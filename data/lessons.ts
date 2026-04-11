export type {
  CourseId,
  Lesson,
  LessonModule,
  LessonOutputValidation,
  LessonRuntime,
} from "./lessonTypes";

export {
  coursesCatalog,
  courseLessonModules,
  countCompletedLessonsForCourse,
  countLessonsInCourse,
  getAllLessonIdsForCourse,
  getLessonByCourseAndId,
  getLessonModulesForCourse,
  getModuleForLessonInCourse,
  getNextLessonIdForCourse,
  getNextLessonInfo,
  getProgressionLessonIdsForCourse,
  isCourseId,
  isLessonAccessibleInCourse,
  type CatalogEntryId,
  type CourseAccent,
  type CourseCatalogEntry,
} from "./courses";

export {
  kotlinLessonModules,
  KOTLIN_CAPSTONE_LESSON_ID,
  getAllKotlinLessons,
  getKotlinLessonById,
  getKotlinTotalLessonCount,
  getKotlinProgressionLessonIds,
  getKotlinModuleForLessonId,
  isKotlinLessonAccessible,
  getNextKotlinLessonId,
} from "./kotlinCourse";

export { webLessonModules, WEB_CAPSTONE_LESSON_ID } from "./webCourse";
