export type LessonOutputValidation = "exact" | "nonempty" | "contains";

export type LessonRuntime = "kotlin" | "web";

/** Пешнамоиш: HTML мустақим ё React+JSX дар iframe (Babel) */
export type WebPreviewMode = "html" | "react";

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
  /** Пешфарз: html — барои React JSX пешнамоиш */
  webPreviewMode?: WebPreviewMode;
  /** Барои webPreviewMode=react: китобхаҳои CDN (масалан react-router-dom) */
  webReactRouter?: boolean;
  /** Дарси пулакӣ — кӯмаки ментор ва нишонаи «Пулакӣ» дар рӯйхат */
  isPremium: boolean;
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
