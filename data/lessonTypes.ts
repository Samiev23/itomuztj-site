export type LessonOutputValidation = "exact" | "nonempty" | "contains";

export type LessonRuntime = "kotlin" | "web";

export interface Lesson {
  id: string;
  number: number;
  title: string;
  description: string;
  theory: string;
  starterCode: string;
  task: string;
  expectedOutput: string;
  hint: string;
  outputValidation?: LessonOutputValidation;
  /** Пешфарз: kotlin */
  runtime?: LessonRuntime;
  /** Барои дарсҳои веб — санҷиши матни код */
  webChecks?: {
    contains?: string[];
    /** Санҷиши ҳамон сатр (бе тағйири регистр) */
    containsLiteral?: string[];
    minLiCount?: number;
  };
}

export interface LessonModule {
  id: string;
  title: string;
  titleEn: string;
  locked: boolean;
  lessons: Lesson[];
}

export type CourseId = "kotlin" | "web";
