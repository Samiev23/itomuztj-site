/**
 * Мувофиқати хуруҷи дарс: ҳарфҳои махсуси тоҷикӣ → нусхаҳои одии кириллӣ,
 * қайд накардани фарқи регистр, trim. Танҳо барои санҷиш — намоиш тағйир намекунад.
 */

const TAJIK_TO_COMMON_CYRILLIC: readonly [string, string][] = [
  ["Ҷ", "Ч"],
  ["ҷ", "ч"],
  ["Ӯ", "У"],
  ["ӯ", "у"],
  ["Ғ", "Г"],
  ["ғ", "г"],
  ["Ҳ", "Х"],
  ["ҳ", "х"],
  ["Ӣ", "И"],
  ["ӣ", "и"],
  ["Қ", "К"],
  ["қ", "к"],
];

export function normalizeTajikKeyboardVariants(s: string): string {
  let out = s;
  for (const [from, to] of TAJIK_TO_COMMON_CYRILLIC) {
    out = out.split(from).join(to);
  }
  return out;
}

/** Барои муқоиса: trim, newline-ҳои охиринро гирифтан, ҷойгузинии ҳарфҳо, toLowerCase */
export function normalizeLessonOutputForMatch(s: string): string {
  let t = s.replace(/\r\n/g, "\n").replace(/^\uFEFF/, "");
  t = t.trim();
  t = t.replace(/\n+$/g, "");
  t = normalizeTajikKeyboardVariants(t);
  return t.toLowerCase();
}

export function lessonConsoleOutputsEqual(actual: string, expected: string): boolean {
  const e = normalizeLessonOutputForMatch(expected);
  if (e.length === 0) return false;
  return normalizeLessonOutputForMatch(actual) === e;
}

export function lessonConsoleOutputContains(haystack: string, needle: string): boolean {
  const n = normalizeLessonOutputForMatch(needle);
  if (n.length === 0) return false;
  return normalizeLessonOutputForMatch(haystack).includes(n);
}
