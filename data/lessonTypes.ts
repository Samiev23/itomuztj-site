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
    /** Ҳадди ақали тегҳои <a> (масалан барои линкҳои иҷтимоӣ) */
    minAnchorCount?: number;
    /** Ҳадди ақали блокҳои @media (адаптив) */
    minMediaBlocks?: number;
  };
}

export interface LessonModule {
  id: string;
  title: string;
  titleEn: string;
  locked: boolean;
  lessons: Lesson[];
  /** Модулҳои ниҳоӣ — анҷоми охирин дарс гувоҳнома мешавад */
  capstone?: boolean;
}

export type CourseId = "kotlin" | "web";
